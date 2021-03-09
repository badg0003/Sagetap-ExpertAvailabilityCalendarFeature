const AvailabilityDelete = ({ onHandleClick, day, dayIndex }) => {
    return (
        <>
            <button className="o-buttonicon" type="button" onClick={() => onHandleClick(day, dayIndex)}>
                <span className="visuallyhidden">Delete this entry</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31301 1.33325 1.33301 4.31325 1.33301 7.99992C1.33301 11.6866 4.31301 14.6666 7.99967 14.6666C11.6863 14.6666 14.6663 11.6866 14.6663 7.99992C14.6663 4.31325 11.6863 1.33325 7.99967 1.33325ZM11.333 10.3933L10.393 11.3333L7.99967 8.93992L5.60634 11.3333L4.66634 10.3933L7.05967 7.99992L4.66634 5.60659L5.60634 4.66659L7.99967 7.05992L10.393 4.66659L11.333 5.60659L8.93967 7.99992L11.333 10.3933Z" fill="#D00606"/>
                </svg>
            </button>
        </>
    )
}

export default AvailabilityDelete
