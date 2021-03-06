const AvailabilityAdd = ({ onHandleClick, day }) => {
    return (
        <>
            <button type="button" onClick={() => onHandleClick(day)}>Add hours+</button>
        </>
    )
}

export default AvailabilityAdd
