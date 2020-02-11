import React, { useContext, useState, useEffect } from "react";
import logger from "../../Utils/logger";

import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { deliveryDaysValues } from "../../contexts/interfaces/users.interface";
import { citiesContext } from "../../contexts/citiesContext";
import Modal from "../shared/Modal/Modal";
import UsersList from "./UsersList";
import './Users.scss';

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);
  const [cities] = useContext(citiesContext); // to be used by the add user modal

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");

  const [showAddNewUserModal, setNewUserModal] = useState(true); // TODO change to false
  const [newUserForm, setNewUserFormField] = useState({});
  const [availableDays, setDaySelection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers( dayFilterTerm, cityFilterTerm, nameSearchTerm );
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);

  const days = Object.values(deliveryDaysValues);
  console.log(availableDays);

  const allWeek = [1, 2, 3, 4, 5, 6];

  // ToolbarOptions
  const options = [
    {
      title: AppConstants.deliveryArea,
      name: "cities",
      values: [AppConstants.all, ...userExtendedData.deliveryAreas],
      filter: setCityFilterTerm
    },
    {
      title: AppConstants.deliveryDays,
      name: "days",
      values: days,
      filter: setDayFilterTerm
    }
  ];

  const cellButtonClicked = (id,name) => {
    logger.log('[Users] cellButtonClicked ', id, name);
    const user = userExtendedData.users.find(usr => usr.phone === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with phone ', id,'  not found');
    }
    switch (name) {
      case 'notify' : {
        logger.log('[Users] cellButtonClicked send notification to ', id);
        break;
      }
      case 'edit': {
        logger.log('[Users] cellButtonClicked edit ', id);
        break;
      }
      case 'delete': {
        logger.log('[Users] cellButtonClicked delete ', id);
        break;
      }
      default: {
        logger.warn('[Users] cellButtonClicked unkown action for user  ', id);
        break;
      }
    }
  }

  const handleClose = () => {
    setNewUserModal(false);
  };

  const onFieldChange = (e) => {
    setNewUserFormField({...newUserForm, [e.target.name]: e.target.value});
  };
  const formFields = ['email', 'password', 'firstName', 'lastName', 'phone', 'deliveryArea', 'userName', 'deliveryDays', 'notes'];

  const deliverDaysSection =  <div className='availableDays'>
      {days.map( (day, i) => {
        return <span key={i} className={`daySelection ${day === AppConstants.allWeek ? 'fullWeek' : ''}`} onClick={ e => (day === AppConstants.allWeek) ? toggleAllWeekDays(e) : daySelection(e)}>{day}</span>
      })}
    </div>;

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

  return (
      <div>
        <Modal show={showAddNewUserModal} title={AppConstants.addUserUIName} handleClose={handleClose} handleAction={()=>{}}>
          <form className='userForm'>
            {formFields.map( (item, i) => {
              const notes = <textarea rows={10} />;
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
        </Modal>

        <Table
          data={userExtendedData.users}
          tableColumns={tableColumns}
          subHeaderComponent={
            <Toolbar
              title={AppConstants.usersUIName}
              actionTitle={AppConstants.addUserUIName}
              options={options}
              search={setNameSearchTerm}
              action={() => setNewUserModal(true)}
            />
          }
        />
      </div>
  );
};

export default Users;
