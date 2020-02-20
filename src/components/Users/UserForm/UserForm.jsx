import AppConstants from "../../../constants/AppConstants";
import React, { useContext, useState, useEffect } from "react";
import logger from "../../../Utils/logger";
import httpService from "../../../services/http";
import Modal from "../../shared/Modal/Modal";
import { citiesContext } from "../../../contexts/citiesContext";
import { userContext } from "../../../contexts/userContext";
import DaysSelection from './DaysSelection';
import './UserForm.scss';

const UserForm = ({ showNewUserModal, handleClose, editUserId }) => {
    const cities = useContext(citiesContext);
    const [userExtendedData, dispatch] = useContext(userContext);
    const [userAvailableDays, setUserAvailableDays] = useState([]);
    const [newUserForm, setNewUserFormField] = useState({});

    useEffect(() => {
        function fetchUser() {
            const user = userExtendedData.users.find(usr => usr.id === editUserId);
            if (!user) {
                logger.error('[UserForm] useEffect user with id ', editUserId, '  not found');
            }
            setNewUserFormField(user);
        }
        fetchUser();
    }, [editUserId]);

    const formFields = ['firstName', 'lastName', 'phone', 'email', 'username', 'password', 'deliveryArea', '', 'deliveryDays', 'notes'];

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

    const citiesDatalist = <datalist id='citiesList'>
                                {cities.map((city, i) => {
                                    return (
                                        <option value={city} key={i}>{city}</option>
                                    )
                                })}
                            </datalist>;

    const onFieldChange = (e) => {
        setNewUserFormField({ ...newUserForm, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newUserData = { ...newUserForm, deliveryDays: userAvailableDays, password: "123456" };
        const reformattedUser = { ...newUserData, deliveryDays: `[${newUserData.userAvailableDays}]` }; // TODO remove this after refactoring the DB, currently expects an array as a string ("[]"), The DB should be fixed to only be expecting an array
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
            <form className='ffh-user-form' onSubmit={onSubmit}>
                {formFields.map((item, i) => {
                    const inputClass = (item === '') ? 'ffh-user-form-field__input empty' : 'ffh-user-form-field__input';
                    const inputType = (item === 'password') ? 'password' : 'text';
                    const getInput = (item) => {
                        switch (item) {
                            case 'notes': return <textarea rows={10} onChange={e => onFieldChange(e)} name="notes"  value={newUserForm ? newUserForm[item] : ''}/>;
                            case 'deliveryDays': return <DaysSelection selectedDays={userAvailableDays} onChange={handleDaySelection} />
                            default: return <input className={inputClass} type={inputType} list={item === 'deliveryArea' ? 'citiesList' : ''} value={newUserForm ? newUserForm[item] : ''} id={item} name={item} onChange={e => onFieldChange(e)} />;
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
                {citiesDatalist}
            </form>
        </Modal>
    )
};

export default UserForm;
