import React from 'react';
import './DaySelection.scss'; 
import { delivaryDaysToInitials } from "../../../constants/AppConstants";


const DaysSelection = (props) => {
    const days = Array.from(delivaryDaysToInitials.keys());

    return (
        <div className="ffh-day-selection">
            {days.map((day, i) => {
                return(
                    <label className="ffh-day-selection__item" key={i}>
                    <input
                        type="checkbox"
                        name={day}
                        value={day}
                        onChange={props.onChange}
                        checked={props.selectedDays.includes(day)}
                    />
                    <div className="ffh-day-selection__item-title">{day}</div>
                </label>
                )
            })}
        </div>
    )
}

export default DaysSelection;