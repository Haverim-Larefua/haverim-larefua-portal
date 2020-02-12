import AppConstants from "../../constants/AppConstants";
import React from "react";

const UserForm = ({onSubmit, formFields, onFieldChange, deliverDaysSection}) => {
    return (
    <form className='userForm' onSubmit={onSubmit}>
        {formFields.map( (item, i) => {
            const notes = <textarea rows={10} onChange={e => onFieldChange(e)} name="notes"/>;
            return (
                <fieldset key={i} className={`userFormField ${item}`}>
                    <label htmlFor={item} className='label'>{AppConstants[`${item}`]}</label>
                    {item === 'notes' ? notes
                        : (item === 'deliveryDays' ? deliverDaysSection : <input className='input' type='text' id={item} name={item} onChange={e => onFieldChange(e)}/>)
                    }
                </fieldset>
            )
        })
        }
    </form>
    )
};
export default UserForm;
