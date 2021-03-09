const CalendarBooking = () => {
    return (
        <form>
            <legend>Provide booking details</legend>
            <div>
                <label className="o-label" htmlFor="firstname">First Name</label>
                <input className="o-input" name="firstname" id="firstname" type="text" value="" required />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="lastname">Last Name</label>
                <input className="o-input" name="lastname" id="lastname" type="text" value="" required />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="email">Email address</label>
                <input className="o-input" name="email" id="email" type="email" value="" required />
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="message">What would you like the call to be about?</label>
                <textarea class="o-input o-input--multiline" name="message" id="message"></textarea>
            </div>

            <div style={{ marginTop: '24px' }}>
                <label className="o-label" htmlFor="phone">Phone number to receive notifications (Recommended)</label>
                <input className="o-input" name="phone" id="phone" type="tel" value="" />
            </div>

            <div style={{ marginTop: '24px' }}>
                <input name="terms" id="terms" type="checkbox" />
                <label className="o-text-body2" htmlFor="terms">I agree with Sagetap <a href="#" target="_blank">Terms of Service</a></label>
            </div>

            <div style={{ marginTop: '24px' }}>
                <button class="o-button" type="submit">Create Booking</button>
            </div>
        </form>
    )
}

export default CalendarBooking
