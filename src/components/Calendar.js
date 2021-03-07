import { useState, useEffect, useCallback } from "react";
import Firebase from './Firebase'
import moment from 'moment'
// https://github.com/wojtekmaj/react-calendar
import ReactCalendar from 'react-calendar'

function Calendar({ uid }) {
    const TIME_FORMAT = 'hh:mm A'

    const [gapi, setGapi] = useState(false)
    const [availability, setAvailability] = useState()
    const [unavailability, setUnavailability] = useState()
    const [value, setDate] = useState(new Date())
    const [activeDate, setActiveDate] = useState(new Date().toISOString())
    const [busy, setBusy] = useState([])
    const [inactiveDate, setInactiveDate] = useState([])

    // const [activeStartDate, setActiveStartDate] = useState()

    useEffect(() => {
        const db = Firebase.firestore()

        db.collection("experts").where("uid", "==", uid).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setAvailability(doc.data().availability)
                setUnavailability(doc.data().unavailability)
            })
        })

        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
                scope: "https://www.googleapis.com/auth/calendar"
            }).then(() => {
                setGapi(true)
                loadGCalEvents(value)
            })
        })

    }, [])

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
            console.log('gapi', response)
            setBusy(response.result.calendars.primary.busy)
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
        console.log('handleOnClickDay', date)
        setDate(date)
    }

    const renderTimeslots = (selDate) => {
        const day = weekdays[selDate.getDay()]
        const dayOfMonth = selDate.getDate()

        /**
         * Generate available time slots based *ONLY* on the Availability
         * data defined by expert.
         */
        const timeSlots = new Set()
        const ranges = (availability) ? availability[day].ranges : []

        // https://stackoverflow.com/questions/48105280/moment-javascript-generate-an-array-of-time-slots-with-a-15min-cliff
        const timeStops = (start, end) => {
            let startTime = moment(start, TIME_FORMAT);
            let endTime = moment(end, TIME_FORMAT).subtract(1, 'hour');

            if (endTime.isBefore(startTime)) {
                return
            }

            while (startTime <= endTime) {
                timeSlots.add(new moment(startTime).format(TIME_FORMAT))
                startTime.add(1, 'hour');
            }
        }

        ranges.forEach(range => {
            timeStops(range.from, range.to)
        })


        /**
         * Filter out busy schedule for selected day from GCal data
         */
        let busyDates = busy.filter((date) => {
            return new Date(date.start).getDate() === dayOfMonth
        })

        busyDates.forEach(timeRange => {
            const start = moment(timeRange.start)
            const end = moment(timeRange.end)
            const length = end.diff(start, 'hours')

            timeSlots.forEach(slot => {
                const slotHour = moment(slot, TIME_FORMAT).hours()

                if (start.hours() === slotHour || end.hours() === slotHour || start.hours() + length >= slotHour) {
                    timeSlots.delete(slot)
                }
            })
        })

        /**
         * Render final timeslot list 
         */
        let timeSlotsList = []

        timeSlots.forEach((item, index) => {
            timeSlotsList.push(<li key={index}>{item}</li>)
        })

        return (
            <ul>
                {timeSlotsList}
            </ul>
        )
    }

    return (
        <>
            <ReactCalendar
                calendarType="US"
                minDate={new Date()}
                tileDisabled={handleTileDisabled}
                onClickDay={handleOnClickDay}
                // onChange={handleOnChange}
                onActiveStartDateChange={handleOnActiveStartDateChange}
                value={value} />

            {renderTimeslots(value)}
        </>
    )
}

export default Calendar
