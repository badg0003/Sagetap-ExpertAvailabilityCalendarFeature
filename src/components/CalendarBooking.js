import { useState } from "react"

const CalendarBooking = ({ onHandleSubmit, selDate }) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [phone, setPhone] = useState('')

    return (
        <form onSubmit={(e) => onHandleSubmit(e)}>
            <h2 className="o-text-h2">Provide booking details</h2>
            <p className="o-text-lead" style={{ marginTop: 0 }}>{selDate}</p>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="firstname">First Name</label>
                <input className="o-input" name="firstname" id="firstname" type="text" value={firstname} required onChange={(e) => setFirstname(e.target.value)} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="lastname">Last Name</label>
                <input className="o-input" name="lastname" id="lastname" type="text" value={lastname} required onChange={(e) => setLastname(e.target.value)} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="email">Email address</label>
                <input className="o-input" name="email" id="email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="message">What would you like the call to be about?</label>
                <textarea className="o-input o-input--multiline" name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} style={{ minHeight: '100px' }} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="phone">Phone number to receive notifications (Recommended)</label>
                <input className="o-input" name="phone" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div style={{ marginTop: '24px' }}>
                <input name="terms" id="terms" type="checkbox" />
                <label className="o-text-body2" htmlFor="terms">I agree with Sagetap Terms of Service</label>
            </div>

            <div style={{ marginTop: '24px' }}>
                <button className="o-button" type="submit">Create Booking</button>
            </div>
        </form>
    )
}

export default CalendarBooking
