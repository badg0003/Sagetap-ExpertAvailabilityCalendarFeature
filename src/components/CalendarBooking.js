const CalendarBooking = () => {
    return (
        <form>
            <legend>Provide booking details</legend>
            <div>
                <label htmlFor="firstname">First Name</label>
                <input name="firstname" id="firstname" type="text" value="" required />
            </div>

            <div>
                <label htmlFor="lastname">Last Name</label>
                <input name="lastname" id="lastname" type="text" value="" required />
            </div>

            <div>
                <label htmlFor="email">Email address</label>
                <input name="email" id="email" type="email" value="" required />
            </div>

            <div>
                <label htmlFor="message">What would you like the call to be about?</label>
                <textarea name="message" id="message"></textarea>
            </div>

            <div>
                <label htmlFor="phone">Phone number to receive notifications (Recommended)</label>
                <input name="phone" id="phone" type="tel" value="" />
            </div>

            <div>
                <input name="terms" id="terms" type="checkbox" />
                <label htmlFor="terms">I agree with Sagetap <a href="#" target="_blank">Terms of Service</a></label>
            </div>

            <div>
                <button type="submit">Create Booking</button>
            </div>
        </form>
    )
}

export default CalendarBooking
