import React from 'react';

const DropdownItem = (props) => {
    return(
        <label className="fhh-dropdown__item">
            <input
                type="radio"
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.handleChange}
            />
            <div className="fhh-dropdown__item-title">{props.value}</div>
        </label>
    )
}

export default DropdownItem;