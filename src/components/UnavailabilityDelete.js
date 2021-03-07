const UnavailabilityDelete = ({ id, onHandleClick }) => {
    return (
        <>
            <button type="button" onClick={() => onHandleClick(id)}>Delete</button>
        </>
    )
}

export default UnavailabilityDelete
