import '../styles/select.scss'

function AvailabilitySelect({ value, data, onHandleChange, day, dayIndex, type }) {  
    return (
        <>
            <select className="o-select" value={value} onChange={(e) => onHandleChange(e.target.value, day, dayIndex, type)}>
                {data.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
        </>
    )
}

export default AvailabilitySelect
