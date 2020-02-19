import AppConstants from "../../../constants/AppConstants";
import React, {useContext, useState, useEffect} from "react";
import logger from "../../../Utils/logger";
import httpService from "../../../services/http";
import Dropdown from "../../shared/Dropdown/Dropdown";
import Modal from "../../shared/Modal/Modal";
import { citiesContext } from "../../../contexts/citiesContext";
import { userContext } from "../../../contexts/userContext";
import { deliveryDaysValues } from "../../../contexts/interfaces/users.interface";
import './UserForm.scss';

const UserForm = ({showNewUserModal, handleClose, editUserId}) => {
    const cities = useContext(citiesContext); 
    const [userExtendedData, dispatch] = useContext(userContext);
    const [availableDays, setDaySelection] = useState([]);
    const [newUserForm, setNewUserFormField] = useState({});

    useEffect(() => {
        function fetchUser() {
          const user = userExtendedData.users.find(usr => usr.id === editUserId);
          if (!user) {
             logger.error('[UserForm] useEffect user with id ', editUserId,'  not found');
          }
          setNewUserFormField(user);
        }
        fetchUser();
    }, [editUserId]);
    
    const formFields = ['firstName', 'lastName', 'phone', 'email', 'username', 'password', 'deliveryArea', '', 'deliveryDays', 'notes'];
    const days = Object.values(deliveryDaysValues);
    const allWeek = [1, 2, 3, 4, 5, 6];

    const daySelection = (e) => {
        const dayIndex = days.indexOf(e.target.innerHTML);
        const selectedOption = e.target.innerHTML === AppConstants.allWeek ? allWeek : dayIndex;
        let allMyDays;
        if(e.target.classList.contains('selected')){
          allMyDays = [...availableDays].filter( item =>  item !== selectedOption);
          document.getElementsByClassName('fullWeek')[0].classList.remove('selected');
        }
        else {
          allMyDays = [...availableDays, selectedOption].flat();
        }
        setDaySelection(Array.from(new Set(allMyDays)));
        e.target.classList.toggle('selected');
    };

    const toggleAllWeekDays = (e) => {
        if(e.target.classList.contains('selected')){
          Array.from(document.getElementsByClassName('daySelection')).forEach( el => el.classList.remove('selected'));
          setDaySelection([]);
        }
        else {
          Array.from(document.getElementsByClassName('daySelection')).forEach( el => el.classList.add('selected'));
          setDaySelection(allWeek);
        }
    };

    const deliverDaysSection =  <div className='availableDays'>
       {days.map( (day, i) => {
         return (<span key={i} 
                       className={`daySelection ${day === AppConstants.allWeek ? 'fullWeek' : ''}`} 
                       onClick={ e => (day === AppConstants.allWeek) ? toggleAllWeekDays(e) : daySelection(e)}>{day}
                 </span>)
       })}
    </div>;

    const onFieldChange = (e) => {
      setNewUserFormField({...newUserForm, [e.target.name]: e.target.value});
    };

    
    const onSubmit = (e) => {
        e.preventDefault();
        const newUserData = {...newUserForm, deliveryDays: availableDays, password: "123456"};
        const reformattedUser = {...newUserData, deliveryDays: `[${newUserData.deliveryDays}]` }; // TODO remove this after refactoring the DB, currently expects an array as a string ("[]"), The DB should be fixed to only be expecting an array
        if (editUserId) {
            dispatch(httpService.createUser(reformattedUser)); //TODO:  Edit user not create one
        } else {
            dispatch(httpService.createUser(reformattedUser));
        }
        handleClose();
      };

    return (
        <Modal show={showNewUserModal}
               title={AppConstants.addUserUIName}
               handleClose={handleClose}
               handleAction={e => onSubmit(e)}
               actionBtnText={AppConstants.add}
               cancelBtnText={AppConstants.cancel}
        >
            <form className='userForm' onSubmit={onSubmit}>
                {formFields.map( (item, i) => {
                    const notes = <textarea rows={10} onChange={e => onFieldChange(e)} name="notes"/>;
                    const inputClass = (item === '') ? 'input empty' : 'input';
                    const inputType = (item === 'password') ? 'password' : 'text';
                    return (
                        <fieldset key={i} className={`userFormField ${item}`}>
                        <label htmlFor={item} className='label'>{AppConstants[`${item}`]}</label>
                            {item === 'notes' ? notes
                                : (item === 'deliveryDays' 
                                    ? deliverDaysSection 
                                    :( item === 'deliveryArea' 
                                        ? <Dropdown 
                                            onSelection={onFieldChange} 
                                            className="input" 
                                            options={cities} 
                                            name="deliveryArea" 
                                            isDisabled={false} /> 
                                        : <input className={inputClass} type={inputType} value={newUserForm? newUserForm[item] : ''} id={item} name={item} onChange={e => onFieldChange(e)}/>
                                    )
                                )
                            }
                        </fieldset>
                    )
                    })
                }
            </form>
        </Modal>
    )
};

export default UserForm;
