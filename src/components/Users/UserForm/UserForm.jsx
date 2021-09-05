import AppConstants from "../../../constants/AppConstants";
import React, { useContext, useState, useEffect } from "react";
import logger from "../../../Utils/logger";
import Modal from "../../shared/Modal/Modal";
import { citiesContext } from "../../../contexts/citiesContext";
import { delivaryDaysToInitials as deliveryDaysToInitials } from '../../../constants/AppConstants';
import DayPicker from './DayPicker';
import './UserForm.scss';
import { UserUtil } from "../../../Utils/User/UserUtil";
import * as userActions from "../../../redux/states/user/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AreaSelect from "./AreaSelect/AreaSelect";
import { produce } from 'immer';

const UserForm = ({ handleClose, editUserId, allUsersById, actions,  }) => {
    const districts = useContext(citiesContext);
    const [userAvailableDays, setUserAvailableDays] = useState([]);
    const [userDeliveryAreas, setUserDeliveryAreas] = useState([]);
    const [newUserForm, setNewUserFormField] = useState({});

    useEffect(() => {
        function fetchUser() {
            let user;
            if (editUserId !== '') {
                user = allUsersById[editUserId];
                if (!user) {
                    logger.error('[UserForm] useEffect user with id ', editUserId, '  not found');
                }
            } else {
                setUserAvailableDays([AppConstants.allWeek]);
            }


            if (user) {
                if (user.deliveryDays) {
                    const daysNames = Array.from(deliveryDaysToInitials.keys());
                    const userDeliveryDays = user.deliveryDays.split(',');
                    let convertedDays = [];
                    userDeliveryDays.forEach(day => {
                        const aDay = daysNames.find(key => deliveryDaysToInitials.get(key) === day);
                        convertedDays.push(aDay);
                    })
                    console.log(convertedDays);
                    setUserAvailableDays(convertedDays);
                }

                if (user.cities) {
                    setUserDeliveryAreas(user.cities);
                }

                // password is always phone - and cannot be changed
                if (user.password && user.phone) {
                    user = produce(user, draftUser => {
                        draftUser.password = String(draftUser.phone).replace(/\D/g, ""); // make sure the pass will be only numbers
                    });
                }
            }

            setNewUserFormField(user);
        }
        fetchUser();
    }, [editUserId, allUsersById]);

    const getUserDeliveryAreas = React.useCallback(() => {
        if (editUserId) {
            const user = allUsersById[editUserId];
            return user.cities;
        }
        return [];
    },[editUserId, allUsersById]);

    let formFields = [];
    if (editUserId) {
      formFields = ['firstName', 'lastName', 'phone', 'deliveryAreas', 'deliveryDays', 'notes'];
    } else {
      formFields = ['firstName', 'lastName', 'phone', 'deliveryAreas', 'username', 'password', 'deliveryDays', 'notes'];
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

    const handleCitiesSelection = (cities) => {
        setUserDeliveryAreas(cities);
    };



    // 'haver' + ordinal number
    const createUsername = ()  => {
        const lastNumber = UserUtil.lastUserNumber(Object.values(allUsersById));
        return 'haver'+(lastNumber+1)
    }

    const onFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let phoneVal = newUserForm?.phone ?? '';
        let fnameVal = newUserForm?.firstName ?? '';
        let lnameVal = newUserForm?.lastName ?? '';
        let passwordVal = newUserForm?.password ?? '';
        let userName = newUserForm?.username ?? '';

        if (name === 'phone') {
            phoneVal = value;
            passwordVal = String(phoneVal).replace(/\D/g,''); // make sure the pass will be only numbers
            userName = userName === '' ? createUsername() : userName;
        }

        if (name === 'firstName' ) {
            fnameVal = value;
        }

        if (name === 'lastName') {
            lnameVal = value;
        }

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
        setUserDeliveryAreas([]);
        setNewUserFormField({});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const convertedDays = userAvailableDays ? userAvailableDays.map(val => deliveryDaysToInitials.get(val)) : '';
        const newUserData = { ...newUserForm, deliveryDays: convertedDays.join(','), cities: userDeliveryAreas };
        if (editUserId) {
            logger.log('[[UserForm] onSubmit dispathing editUser');
            actions.editUser(newUserData);
        } else {
            logger.log('[[UserForm] onSubmit dispathing addUser');
            actions.addUser(newUserData);
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
                type={'alert'}
        >
            <form className='ffh-user-form' onSubmit={onSubmit}>
                {formFields.map((item, i) => {
                    const inputClass = (item === '') ? 'ffh-user-form-field__input empty' : 'ffh-user-form-field__input';
                    const readonly = item === 'password' || item === 'username';
                    const inputType = 'text';
                    const getInput = (item) => {
                        switch (item) {
                            case 'notes': return <textarea className="notes" rows={10} onChange={e => onFieldChange(e)} name="notes"  value={newUserForm ? newUserForm[item] : ''}/>;
                            case 'deliveryDays': return <DayPicker selectedDays={userAvailableDays} onChange={handleDaySelection} />;
                            case 'deliveryAreas': return <AreaSelect districts={districts} onSave={handleCitiesSelection} userDeliveryAreas={getUserDeliveryAreas()}/>
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

const mapStateToProps =(appState) => {
    return {
        allUsersById: appState.user.allUsersById,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators(userActions, dispatch) };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

