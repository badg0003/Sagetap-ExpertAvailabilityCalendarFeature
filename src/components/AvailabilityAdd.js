const AvailabilityAdd = ({ onHandleClick, day }) => {
    return (
        <>
            <button className="o-button" type="button" onClick={() => onHandleClick(day)}>Add hours+</button>
        </>
    )
}

export default AvailabilityAdd
