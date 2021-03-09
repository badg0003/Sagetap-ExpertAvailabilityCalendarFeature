import '../styles/toggle.scss'

const AvailabilityToggle = ({ onHandleToggle, day, value }) => {
    return (
        <div className="o-toggle">
            <input className="visuallyhidden" id={`toggle-${day}`} type="checkbox" onChange={(e) => onHandleToggle(day, e.target.checked)} checked={value} />
            <label htmlFor={`toggle-${day}`}><span className="visuallyhidden">Toggle {day} on/off</span></label>
        </div>
    )
}

export default AvailabilityToggle
