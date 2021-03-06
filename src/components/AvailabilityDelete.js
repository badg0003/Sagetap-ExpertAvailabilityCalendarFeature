const AvailabilityDelete = ({ onHandleClick, day, dayIndex }) => {
    return (
        <>
            <button type="button" onClick={() => onHandleClick(day, dayIndex)}>Delete</button>
        </>
    )
}

export default AvailabilityDelete
