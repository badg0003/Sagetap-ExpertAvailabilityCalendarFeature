import './Calendar.scss'
import '../styles/calendar.scss'

import { useState, useEffect, useCallback } from "react";
import Firebase from './Firebase'
import moment from 'moment'
import ReactCalendar from 'react-calendar'
import CalendarTimeList from "./CalendarTimeList"
import CalendarBooking from './CalendarBooking'

function Calendar({ uid }) {
    const [gapi, setGapi] = useState(false)
    const [profile, setProfile] = useState()
    const [availability, setAvailability] = useState()
    const [unavailability, setUnavailability] = useState()
    const [value, setDate] = useState()
    const [activeDate, setActiveDate] = useState(new Date().toISOString())
    const [busy, setBusy] = useState([])
    const [inactiveDate, setInactiveDate] = useState([])
    const [bookingForm, setBookingForm] = useState(false)
    const [bookingTime, setBookingTime] = useState('')
    const [bookingSuccess, setBookingSuccess] = useState(false)

    useEffect(() => {
        const db = Firebase.firestore()

        db.collection("experts").where("uid", "==", uid).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setAvailability(doc.data().availability)
                setUnavailability(doc.data().unavailability)
                setProfile(doc.data())
            })
        })

    }, [uid])

    useEffect(() => {
        if (!profile || !profile.responseToken) return

        window.gapi.load("client:auth2", () => {
            window.gapi.client.setToken({
                'access_token': profile.responseToken
            })
            window.gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar"
            }).then(() => {
                setGapi(true)
                if (value) {
                    loadGCalEvents(value)
                }
            })
        })
    }, [value, profile])

    /**
     * Filter unavailability date(s) to determine if any belong to the current
     * month view in the calendar.
     */
    useEffect(() => {
        let res = unavailability && unavailability.filter((date) => {
            return moment(activeDate, 'YYYY-MM').isSame(moment(date.from, 'YYYY-MM'))
        })
        setInactiveDate(res)
    }, [activeDate, unavailability])

    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

    const loadGCalEvents = (date) => {
        // https://developers.google.com/calendar/v3/reference/freebusy/query
        window.gapi.client.calendar.freebusy.query({
            "timeMin": new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
            "timeMax": new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
            "items": [{
                "id": "primary"
            }]
        }).then((response) => {
            // console.log('gapi', response)
            setBusy(response.result.calendars.primary.busy)
        }).catch((error) => {
            console.error("Error loading freeBusy state: ", error);
        })
    }

    /**
     * Disable day that falls outside the availability window or within the 
     * list of unavailable date(s) as defined by the expert.
     * @param {object} data 
     */
    const handleTileDisabled = useCallback((data) => {
        const currDay = moment(data.date)
        const dayAbbr = weekdays[data.date.getDay()]
        let dayStatus = false

        if (availability && availability[dayAbbr] && !availability[dayAbbr].enabled) {
            dayStatus = true
        } else {
            inactiveDate && inactiveDate.forEach(inactiveRange => {
                if (currDay.isBetween(moment(inactiveRange.from), moment(inactiveRange.to))) {
                    dayStatus = true
                }
            });
        }

        return dayStatus
    }, [inactiveDate, availability, weekdays])

    /**
     * Google Calendar (gapi) pull for free/busy events listing
     * @param {*} date 
     */
    const handleOnActiveStartDateChange = (date) => {
        if (date.view === "month" && gapi) {
            setActiveDate(date.activeStartDate)
            loadGCalEvents(date.activeStartDate)
        }
    }

    const handleOnClickDay = (date) => {
        // console.log('handleOnClickDay', date)
        setDate(date)
    }

    const handleOnClickTime = (time) => {
        setBookingForm(true)
        setBookingTime(time)
    }

    const handleBookingSubmit = (e) => {
        e.preventDefault()
        const formValues = e.target.elements
        const hours = moment(bookingTime, 'H:mm a').hours()
        const timeStart = moment(value)
        const timeEnd = moment(value)
        timeStart.hours(hours)
        timeEnd.hours(hours + 1)

        // Check for gapi and push new event to API
        if (gapi) {
            // console.log(value, bookingTime, timeStart)
            // https://developers.google.com/calendar/v3/reference/events/insert
            window.gapi.client.calendar.events.insert({
                'calendarId': profile.calendarId,
                'end': {
                    'dateTime': timeEnd
                },
                'start': {
                    'dateTime': timeStart
                },
                'attendees': [{
                    'email': formValues.email.value,
                    'displayName': `${formValues.firstname.value} ${formValues.lastname.value}`,
                    'responseStatus': 'needsAction'
                }],
                'summary': `${formValues.firstname.value} ${formValues.lastname.value} // Sagetap`,
                'description': `Hello Test ${formValues.message.value}`,
            }).then((response) => {
                // Success
                // console.log('GCal response', response)
                setBookingForm(false)
                setBookingSuccess(true)
            }).catch((error) => {
                console.error("Error creating Google Calendar event: ", error);
            })
        }
    }

    return (
        <>
            <h1 className="o-text-h1">Book Meeting</h1>
            <p className="o-text-lead" style={{ marginTop: 0, marginBottom: '60px' }}>Get to know each other.</p>
            <div className="well">
                <div className="Calendar">
                    <div>
                        <h3>Select a date and time</h3>
                        <p className="o-text-body1">Sagetap will schedule a follow-up meeting with Leonard for the date and time you select here. Lorem ipsum dolor justo phasellus.</p>
                        <p className="o-text-h4" style={{ marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '15px' }}>
                                <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="#008CF5" />
                            </svg>
                        60 min
                    </p>
                    </div>

                    <div>
                        <ReactCalendar
                            className="c-calendar"
                            calendarType="US"
                            minDate={new Date()}
                            minDetail="year"
                            tileDisabled={handleTileDisabled}
                            onClickDay={handleOnClickDay}
                            // onChange={handleOnChange}
                            onActiveStartDateChange={handleOnActiveStartDateChange}
                            next2Label={null}
                            prev2Label={null}
                            value={value} />
                    </div>

                    {value ? <div>
                        <h4 className="o-text-h4" style={{ color: '#646465' }}>{moment(value).format('dddd, MMMM D').toString()}</h4>
                        <p className="o-text-body2">Leonard’s available slots</p>
                        <CalendarTimeList date={value} busy={busy} availability={availability} onHandleClick={handleOnClickTime} />
                    </div> : ''}

                    {bookingForm ? <div className="modal">
                        <div className="well">
                            <button className="o-buttonicon" style={{ position: 'absolute', top: '36px', right: '36px' }} onClick={() => setBookingForm(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#92929D" />
                                </svg>
                            </button>
                            <CalendarBooking onHandleSubmit={handleBookingSubmit} selDate={`${moment(value).format('dddd, MMMM Do').toString()} @ ${bookingTime}`} />
                        </div>
                    </div> : ''}

                    {bookingSuccess ? <div className="modal">
                        <div className="well">
                            <h2 className="o-text-h2" style={{ textAlign: 'center' }}>Booking confirmed!</h2>
                            <p className="o-text-lead" style={{marginTop:0,textAlign:'center'}}>{moment(value).format('dddd, MMMM Do').toString()} @ {bookingTime}</p>
                            <p style={{textAlign:'center'}}>
                                <button className="o-button" type="button" onClick={() => setBookingSuccess(false)}>Close</button>
                            </p>
                        </div>
                    </div> : ''}
                </div>
            </div>
        </>
    )
}

export default Calendar
