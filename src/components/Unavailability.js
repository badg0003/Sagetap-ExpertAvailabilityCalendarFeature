import './Unavailability.scss'

import { useEffect, useState } from 'react'
import Firebase from './Firebase'
// import ReactCalendar from 'react-calendar'
import ReactDatePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle'
import UnavailabilityDelete from './UnavailabilityDelete'
import UnavailabilityAdd from './UnavailabilityAdd'

const Unavailability = ({ uid }) => {

    const [unavailability, setUnavailability] = useState()
    const [value, onChange] = useState();

    useEffect(() => {
        if (!uid) return
        
        const db = Firebase.firestore()

        db.collection("experts").doc(uid).get()
            .then((doc) => {
                if (doc.exists) {
                    setUnavailability(doc.data().unavailability)
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [uid])

    const onDeleteEvent = (id) => {
        const newData = unavailability.filter((item, index) => index !== id)

        const db = Firebase.firestore()

        db.collection("experts").doc(uid).get()
            .then((doc) => {
                if (doc.exists) {
                    setUnavailability(newData)

                    doc.ref.update({
                        "unavailability": newData
                    })
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
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
        newData[index]['from'] = new Date(dateRange[0]).toISOString()
        newData[index]['to'] = new Date(dateRange[1]).toISOString()

        const db = Firebase.firestore()

        db.collection("experts").doc(uid).get()
            .then((doc) => {
                if (doc.exists) {
                    setUnavailability([
                        ...newData
                    ])

                    doc.ref.update({
                        "unavailability": newData
                    })
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    return (
        <div className="Unavailability well">
            <h2 className="o-text-h2" style={{ marginBottom: '24px' }}>Unavailable days</h2>

            {unavailability && unavailability.map((range, index) => {
                return (
                    <div className="Unavailability__range" key={index}>
                        <ReactDatePicker
                            minDate={new Date()}
                            minDetail="year"
                            onChange={(dateRange) => onChangeEvent(dateRange, index)}
                            selectRange={true}
                            value={[range.from ? new Date(range.from) : null, range.to ? new Date(range.to) : null]}
                            format="y-M-d"
                            dayPlaceholder=""
                            monthPlaceholder=""
                            yearPlaceholder=""
                            rangeDivider="to"
                            showLeadingZeros={true}
                            next2Label={null}
                            prev2Label={null}
                            clearIcon={null}
                            calendarIcon={null} />
                        <UnavailabilityDelete id={index} onHandleClick={onDeleteEvent} />
                    </div>
                )
            })}

            <div style={{ marginTop: '24px' }}>
                <UnavailabilityAdd onHandleClick={onAddEvent} />
            </div>
        </div>
    )
}

export default Unavailability
