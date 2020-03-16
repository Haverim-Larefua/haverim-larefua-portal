import AppConstants from "../../../constants/AppConstants";
import React, { useContext, useState, useEffect } from "react";
import logger from "../../../Utils/logger";
import Modal from "../../shared/Modal/Modal";
import { citiesContext } from "../../../contexts/citiesContext";
import { userContext } from "../../../contexts/userContext";
import { addUser, editUser } from "../../../contexts/actions/users.action";
import { delivaryDaysToInitials } from '../../../constants/AppConstants';
import DayPicker from './DayPicker';
import SelectFilter from '../../shared/SelectFilter/SelectFilter';
import './UserForm.scss';

const UserForm = ({ handleClose, editUserId }) => {
    const cities = useContext(citiesContext);
    const [userExtendedData, dispatch] = useContext(userContext);
    const [userAvailableDays, setUserAvailableDays] = useState([]);
    const [userDeliveryArea, setUserDeliveryArea] = useState('');
    const [newUserForm, setNewUserFormField] = useState({});

    useEffect(() => {
        function fetchUser() {
            let user;
            if (editUserId && editUserId !== "") {
                user = userExtendedData.users.find(usr => usr.id === editUserId);
                if (!user) {
                    logger.error('[UserForm] useEffect user with id ', editUserId, '  not found');
                }
            } else {
                setUserAvailableDays([AppConstants.allWeek]);
            }
            setNewUserFormField(user);

            if (user && user.deliveryDays) {
                const daysNames = Array.from(delivaryDaysToInitials.keys());
                const userDeliveryDays = user.deliveryDays.split(',');
                let convertedDays = [];
                userDeliveryDays.forEach(day => {
                    const aDay = daysNames.find(key =>  delivaryDaysToInitials.get(key) === day);
                    convertedDays.push(aDay);
                })
                console.log(convertedDays);
                setUserAvailableDays(convertedDays);
            }

            if (user && user.deliveryArea) {
                setUserDeliveryArea(user.deliveryArea);
            }

            // password is always phone - and cannot be changed
            if (user && user.password && user.phone) {
                user.password = user.phone;
            }
        }
        fetchUser();
    }, [editUserId]);

    
                

    let formFields = [];
    if (editUserId) {
      formFields = ['firstName', 'lastName', 'phone', 'deliveryArea', 'deliveryDays', 'notes'];
    } else {
      formFields = ['firstName', 'lastName', 'phone', 'deliveryArea', 'username', 'password', 'deliveryDays', 'notes'];
    }

    const handleDaySelection = (e) => {
        if (userAvailableDays.indexOf(e.target.value) < 0) {
            if (e.target.value === AppConstants.allWeek) {
                setUserAvailableDays([AppConstants.allWeek]);
                return;
            }
            setUserAvailableDays([...userAvailableDays.filter(item => item !== AppConstants.allWeek), e.target.value]);
        } else {
            setUserAvailableDays(userAvailableDays.filter(item => item !== e.target.value));
        }


    }
    if (userAvailableDays.length === 6) {
        setUserAvailableDays([AppConstants.allWeek]);
    }

    const handleCitySelection = (e) => {
        setUserDeliveryArea(e.target.innerText);
    }

    const hebCharToEng = (char) => {
        return String.fromCharCode((char-1391 > 122) ? 122 : char - 1391); // dif between ascii of א and a;
    }

    const createUsername = (firstName, lastName,  phone, currentUserName)  => {
        const last4chars = phone.substring(phone.length - 4);
        let firstChar = firstName.charCodeAt(0);
        firstChar = firstChar > 1487 ? hebCharToEng(firstChar) : String.fromCharCode(firstChar); 
        if (firstChar === ' ') {
            firstChar = 'a';
        }
        let secondChar = lastName.charCodeAt(0);
        secondChar = secondChar > 1487 ? hebCharToEng(secondChar) : String.fromCharCode(secondChar); 
        if (secondChar === ' ') {
            secondChar = 'z';
        }
        const indx = currentUserName ? currentUserName.indexOf('-') : -1;
        let rnd = Math.floor(Math.random() * 10);
        if (indx >=0) {
            rnd = currentUserName.substring(indx+1);
        } 
        return firstChar + secondChar + last4chars + '-' + rnd;
    }

    const onFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let phoneVal = newUserForm ? newUserForm.phone : '';
        let fnameVal = newUserForm ? newUserForm.firstName : '';
        let lnameVal = newUserForm ? newUserForm.lastName : '';
        let passwordVal = newUserForm ? newUserForm.password : '';
        
        if (name === 'phone') {
            phoneVal = value;
            passwordVal = value;
        }
        
        if (name === 'firstName' ) {
            fnameVal = value;
        }
        
        if (name === 'lastName') {
            lnameVal = value;
        }
        const userName = createUsername(fnameVal, lnameVal, phoneVal, newUserForm ? newUserForm.username : '');
        
        setNewUserFormField({ ...newUserForm, 
            'phone' : phoneVal, 
            'firstName': fnameVal, 
            'lastName': lnameVal, 
            'password': passwordVal, 
            'username': userName, 
            [name]: value });
        
    };

    const cleanForm = () => {
        setUserAvailableDays("");
        setUserDeliveryArea("");
        setNewUserFormField({});
    }
 
    const onSubmit = (e) => {
        e.preventDefault();
        const convertedDays = userAvailableDays ? userAvailableDays.map(val => delivaryDaysToInitials.get(val)) : '';
        const newUserData = { ...newUserForm, deliveryDays: convertedDays.join(','), deliveryArea: userDeliveryArea };
        if (editUserId) {
            logger.log('[[UserForm] onSubmit dispathing editUser');
            dispatch(editUser(newUserData));
        } else {
            logger.log('[[UserForm] onSubmit dispathing addUser');
            dispatch(addUser(newUserData));
        }
        cleanForm();
        handleClose();
    };

    return (
        <Modal  title={ editUserId ? AppConstants.editUserUIName : AppConstants.addUserUIName}
                handleClose={handleClose}
                handleAction={e => onSubmit(e)}
                actionBtnText={editUserId ? AppConstants.edit : AppConstants.add}
                cancelBtnText={AppConstants.cancel}
        >
            <form className='ffh-user-form' onSubmit={onSubmit}>
                {formFields.map((item, i) => {
                    const inputClass = (item === '') ? 'ffh-user-form-field__input empty' : 'ffh-user-form-field__input';
                    const readonly = (item === 'password' || item === 'username') ? true : false;
                    const inputType = 'text';
                    const getInput = (item) => {
                        switch (item) {
                            case 'notes': return <textarea className="notes" rows={10} onChange={e => onFieldChange(e)} name="notes"  value={newUserForm ? newUserForm[item] : ''}/>;
                            case 'deliveryDays': return <DayPicker selectedDays={userAvailableDays} onChange={handleDaySelection} />;
                            case 'deliveryArea': return <SelectFilter onSelect={handleCitySelection} items={cities} selected={userDeliveryArea} height='260px'/>
                            default: return <input className={inputClass} type={inputType} readOnly={readonly} value={newUserForm ? newUserForm[item] : ''} id={item} name={item} onChange={e => onFieldChange(e)} />;
                        }
                    }

                    return (
                        <div key={i} className={`ffh-user-form-field ${item}`}>
                            <label htmlFor={item} className='label'>{AppConstants[`${item}`]}</label>
                            {getInput(item)}
                        </div>
                    )
                })
                }
            </form>
        </Modal>
    )
};

export default UserForm;
