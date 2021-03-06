import {useEffect, useState} from 'react'
import Firebase from './Firebase'

function AvailabilitySelect({ value, data, onHandleChange }) {
    const [selValue, setSelValue] = useState(value)
    
    return (
        <div>
            {console.log('render')}
            <select value={selValue} onChange={(e) => onHandleChange(e.target.value)}>
                {data.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default AvailabilitySelect
