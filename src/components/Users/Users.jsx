import React, {useContext, useState, useEffect} from "react";
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
import './Users.scss';
import UserForm from "./UserForm";

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);
  const cities = useContext(citiesContext); // to be used by the add user modal

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");

  const [showNewUserModal, setShowNewUserModal] = useState(false);
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
  const allWeek = [1, 2, 3, 4, 5, 6];

  const options = [
    {
      title: AppConstants.deliveryArea,
      name: "cities",
      values: [AppConstants.all, ...userExtendedData.deliveryAreas],
      filter: setCityFilterTerm
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
  };

  const handleClose = () => {
    setShowNewUserModal(false);
  };

  const onFieldChange = (e) => {
    setNewUserFormField({...newUserForm, [e.target.name]: e.target.value});
  };
  const formFields = ['email', 'password', 'firstName', 'lastName', 'phone', 'deliveryArea', 'username', 'deliveryDays', 'notes'];

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

  const onSubmit = (e) => {
    e.preventDefault();
    const newUserData = {...newUserForm, deliveryDays: availableDays, password: "123456"};
    console.log(newUserData);
    dispatch(httpService.createUser(newUserData));
    handleClose();
  };

  return (
      <div>
        <Modal show={showNewUserModal}
               title={AppConstants.addUserUIName}
               handleClose={handleClose}
               handleAction={e => onSubmit(e)}
               actionBtnText={AppConstants.add}
               handleCancelAction = {handleClose}
               cancelBtnText={AppConstants.cancel}
        >
          <UserForm
              onFieldChange={onFieldChange}
              formFields={formFields}
              deliverDaysSection={deliverDaysSection}
              setCityFilterTerm={setCityFilterTerm}
              cities={cities}
              onSubmit={onSubmit}
          />
        </Modal>

        <Table
          data={userExtendedData.users}
          tableColumns={tableColumns}
          handleCellButtonClick={cellButtonClicked}
          subHeaderComponent={
            <Toolbar
              title={AppConstants.usersUIName}
              actionTitle={AppConstants.addUserUIName}
              options={options}
              search={setNameSearchTerm}
              action={() => setShowNewUserModal(true)}
            />
          }
        />
      </div>
  );
};

export default Users;
