import './Unavailability.scss'

import { useEffect, useState } from 'react'
import Firebase from './Firebase'
import ReactCalendar from 'react-calendar'
import moment from 'moment'
import UnavailabilityDelete from './UnavailabilityDelete'
import UnavailabilityAdd from './UnavailabilityAdd'

const Unavailability = ({ uid }) => {

    const [unavailability, setUnavailability] = useState()
    const [value, onChange] = useState();
    const [popover, setPopover] = useState(false)

    useEffect(() => {
        const db = Firebase.firestore()

        db.collection("experts").where("uid", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUnavailability(doc.data().unavailability)
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [uid])

    const renderDate = (dateRange) => {
        const { to, from } = dateRange
        const dateFormat = 'ddd, MMM D'

        if (from === '' || to === '') return

        return (
            <>
                <span>{moment(from).format(dateFormat).toString()}</span>
                <span>&#160;-&#160;</span>
                <span>{moment(to).format(dateFormat).toString()}</span>
                <span>&#160;(inclusive)</span>
            </>
        )
    }

    const onDeleteEvent = (id) => {
        setUnavailability(unavailability.filter((item, index) => index !== id))
    }

    const onAddEvent = () => {
        const newObj = {
            from: '',
            to: ''
        }
        setUnavailability([
            ...unavailability,
            newObj
        ])
    }

    const onChangeEvent = (dateRange, index) => {
        onChange(dateRange)

        const newData = unavailability
        newData[index]['from'] = dateRange[0]
        newData[index]['to'] = dateRange[1]

        setUnavailability([
            ...newData
        ])

        setPopover(false)
    }

    return (
        <div className="Unavailability well">
            <h2 className="o-text-h2" style={{ marginBottom: '24px' }}>Unavailable days</h2>

            {unavailability && unavailability.map((range, index) => {
                return (
                    <div key={index}>
                        <div className="Unavailability__range">
                            <div className="o-input" style={{ textAlign: 'center' }} onClick={() => setPopover(true)}>
                                {renderDate(range)}
                            </div>
                            <UnavailabilityDelete id={index} onHandleClick={onDeleteEvent} />
                        </div>

                        <div className={`popover${(popover) ? ' popover--active' : ''}`}>
                            <ReactCalendar
                                calendarType="US"
                                minDate={new Date()}
                                minDetail="year"
                                onChange={(dateRange) => onChangeEvent(dateRange, index)}
                                selectRange={true}
                                defaultValue={[range.from && new Date(moment(range.from).format('YYYY-MM-DD').toString()), range.to && new Date(moment(range.to).format('YYYY-MM-DD').toString())]}
                                returnValue="range"
                                next2Label={null}
                                prev2Label={null} />
                        </div>
                    </div>
                )
            })}

            <div style={{marginTop:'24px'}}>
                <UnavailabilityAdd onHandleClick={onAddEvent} />
            </div>
        </div>
    )
}

export default Unavailability
