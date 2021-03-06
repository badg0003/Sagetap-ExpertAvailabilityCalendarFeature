const AvailabilityToggle = ({ onHandleToggle, day, value }) => {
    return (
        <>
            <input type="checkbox" onChange={(e) => onHandleToggle(day, e.target.checked)} checked={value} />
            {/* <label for="">Toggle</label> */}
        </>
    )
}

export default AvailabilityToggle
