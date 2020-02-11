import React, { useContext, useState, useEffect } from "react";

import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
// import usePrevious from "../../contexts/userPrevious";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { deliveryDaysValues } from "../../contexts/interfaces/users.interface";
import { citiesContext } from "../../contexts/citiesContext";
import Modal from "../shared/Modal/Modal";
import UsersList from "./UsersList";
import './users.scss';

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);
  // const prevUserExtendedData = usePrevious(UserExtendedData);
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

  const handleClose = () => {
    setNewUserModal(false);
  };

  const onFieldChange = (e) => {
    setNewUserFormField({...newUserForm, [e.target.name]: e.target.value});
  };
  const formFields = ['email', 'password', 'firstName', 'lastName', 'phone', 'deliveryArea', 'userName', 'notes'];

  const daySelection = (e) => {
    const myDays = new Set(availableDays).add(e.target.innerHTML);
    setDaySelection(Array.from(myDays));
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
                        : <input className='input' type='text' id={item} name={item} onChange={e => onFieldChange(e)}/>
                    }
                  </fieldset>
                )
                })
            }
            <div>
              <label>{AppConstants.deliveryDays}</label>
              <div className='availableDays'>
                {days.map( (day, i) => {
                  return <span key={i} className='daySelection' onClick={ e => daySelection(e)}>{day}</span>
                })}
              </div>
            </div>
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
