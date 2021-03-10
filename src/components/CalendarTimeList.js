
import { Link } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment'

const CalendarTimeList = ({ date, busy, availability }) => {
    const [timeslot, setTimeslot] = useState()

    const TIME_FORMAT = 'hh:mm A'
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

    const day = weekdays[date.getDay()]
    const dayOfMonth = date.getDate()

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
        timeSlotsList.push(
            <li key={index}>
                <input
                    className="visuallyhidden"
                    type="radio"
                    value={item}
                    id={`timeslot-${index}`}
                    name="timeslot"
                    onChange={(e) => setTimeslot(e.target.value)} />
                <label htmlFor={`timeslot-${index}`}>{item}</label>
                {timeslot === item ?
                    <Link className="o-button" to="/book-meeting/create" style={{ minHeight: 0, height: '37px' }}>Confirm</Link> : ''}
            </li>
        )
    })

    return (
        <>
            <ul className="Calendar__slots">
                {timeSlotsList.map(item => {
                    return item
                })}
            </ul>            
        </>
    )
}

export default CalendarTimeList
