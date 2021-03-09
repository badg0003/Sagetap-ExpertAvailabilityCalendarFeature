import './Availability.scss'

import { useState, useEffect, useCallback } from 'react'
import Firebase from './Firebase'

import AvailabilitySelect from './AvailabilitySelect'
import AvailabilityToggle from './AvailabilityToggle'
import AvailabilityAdd from './AvailabilityAdd'
import AvailabilityDelete from './AvailabilityDelete'

const Availability = ({ uid }) => {
    const [availability, setAvailability] = useState()

    const renderWeekdays = useCallback(() => {

        if (!availability) return

        const weekdays = new Map()
        weekdays
            .set('sun', 'Sunday')
            .set('mon', 'Monday')
            .set('tue', 'Tuesday')
            .set('wed', 'Wednesday')
            .set('thu', 'Thursday')
            .set('fri', 'Friday')
            .set('sat', 'Saturday')

        const hoursInDay = [
            '12:00 AM', '12:30 AM',
            '01:00 AM', '01:30 AM',
            '02:00 AM', '02:30 AM',
            '03:00 AM', '03:30 AM',
            '04:00 AM', '04:30 AM',
            '05:00 AM', '05:30 AM',
            '06:00 AM', '06:30 AM',
            '07:00 AM', '07:30 AM',
            '08:00 AM', '08:30 AM',
            '09:00 AM', '09:30 AM',
            '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM',
            '12:00 PM', '12:30 PM',
            '01:00 PM', '01:30 PM',
            '02:00 PM', '02:30 PM',
            '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM',
            '05:00 PM', '05:30 PM',
            '06:00 PM', '06:30 PM',
            '07:00 PM', '07:30 PM',
            '08:00 PM', '08:30 PM',
            '09:00 PM', '09:30 PM',
            '10:00 PM', '10:30 PM',
            '11:00 PM', '11:30 PM'
        ]

        /**
         * Add a new time component for the given day.
         * @param {event} e 
         * @param {string} day 
         */
        const onAddEvent = (day) => {
            const newRanges = availability[day].ranges
            newRanges.push({ from: '09:00 AM', to: '05:00 PM' })

            const newData = {
                ...availability,
                [day]: {
                    ...availability[day],
                    ranges: newRanges
                }
            }
            setAvailability(newData)
        }

        const onDeleteEvent = (day, dayIndex) => {
            const newData = {
                ...availability,
                [day]: {
                    ...availability[day],
                    ranges: availability[day].ranges.filter((item, index) => index !== dayIndex)
                }
            }
            setAvailability(newData)
        }

        const onToggleEvent = (day, val) => {
            console.log(val);
            const newData = {
                ...availability,
                [day]: {
                    ...availability[day],
                    enabled: val
                }
            }
            setAvailability(newData)
        }

        const onChangeEvent = (val, day, dayIndex, type) => {
            const newData = availability
            newData[day].ranges[dayIndex][type] = val

            setAvailability({...newData})
        }

        const weekdayList = []

        weekdays.forEach((weekday, abbr) => {
            weekdayList.push(
                <div className="well" key={abbr}>
                    <div className="Availability__header">
                        <h2>{weekday}</h2>
                        <AvailabilityToggle onHandleToggle={onToggleEvent} day={abbr} value={availability[abbr].enabled} />
                    </div>

                    {availability[abbr].enabled ?
                        <div className="Availability__body">
                            <ul className="Availability__timeslot">
                                {availability[abbr].ranges.map((range, index) => {
                                    return <li key={index}>
                                        <AvailabilitySelect
                                            value={range.from}
                                            data={hoursInDay}
                                            onHandleChange={onChangeEvent}
                                            day={abbr}
                                            dayIndex={index}
                                            type='from' />

                                        <span>to</span>

                                        <AvailabilitySelect
                                            value={range.to}
                                            data={hoursInDay}
                                            onHandleChange={onChangeEvent}
                                            day={abbr}
                                            dayIndex={index}
                                            type='to' />

                                        <AvailabilityDelete onHandleClick={onDeleteEvent} day={abbr} dayIndex={index} />
                                    </li>
                                })}
                            </ul>
                            <AvailabilityAdd onHandleClick={onAddEvent} day={abbr} />
                        </div> : ''}
                </div>
            )
        })

        console.log('Render weekdays')

        return (
            <>
                {weekdayList}
            </>
        )
    }, [availability])


    useEffect(() => {
        const db = Firebase.firestore()

        db.collection("experts").where("uid", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setAvailability(doc.data().availability)
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [uid])

    return (
        <>
            {console.log('render')}
            <h1>Availability</h1>
            <p>We only allow bookings within your availability that you set below, and at least 16 hours away to give you time to accept new requests.</p>

            <div>
                {renderWeekdays()}
            </div>
        </>
    )
}

export default Availability
