import AppConstants from "../../constants/AppConstants";
import React from "react";
import Dropdown from "../shared/Dropdown/Dropdown";
import Modal from "../shared/Modal/Modal";

const UserForm = ({onSubmit, formFields, onFieldChange, deliverDaysSection, userExtendedData, setCityFilterTerm}) => {
    return (
    <form className='userForm' onSubmit={onSubmit}>
        {formFields.map( (item, i) => {
            const notes = <textarea rows={10} onChange={e => onFieldChange(e)} name="notes"/>;
            return (
                <fieldset key={i} className={`userFormField ${item}`}>
                    <label htmlFor={item} className='label'>{AppConstants[`${item}`]}</label>
                    {item === 'notes' ? notes
                        : (item === 'deliveryDays' ? deliverDaysSection
                            :( item === 'deliveryArea' ? <Dropdown onSelection={onFieldChange} className="input" options={[AppConstants.all, ...userExtendedData.deliveryAreas]} name="deliveryArea" filter={setCityFilterTerm} isDisabled={false}> </Dropdown>
                                : <input className='input' type='text' id={item} name={item} onChange={e => onFieldChange(e)}/>))
                    }
                </fieldset>
            )
        })
        }
    </form>
    )
};
export default UserForm;
