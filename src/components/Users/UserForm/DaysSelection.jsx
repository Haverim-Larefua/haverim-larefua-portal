import React from 'react';
import { deliveryDaysValues } from '../../../contexts/interfaces/users.interface';
import './DaySelection.scss';

const days = Object.values(deliveryDaysValues);

const DaysSelection = (props) => {
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