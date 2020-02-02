import React, { useContext, useState, useEffect } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
// import usePrevious from "../../contexts/userPrevious";
import httpService  from '../../services/http';
import AppConstants from '../../constants/AppConstants';
import { delivaryDaysValues } from "../../contexts/interfaces/users.interface";
import { citiesContext } from "../../contexts/citiesContext";

const Users = () => {
  const [ userExplained, dispatch ] = useContext(userContext);
  // const prevUserExplained = usePrevious(userExplained);
  const [cities] = useContext(citiesContext); // to be used by the add user modal
  
  const  [usersDeliveryAreas, setUsersDeliveryAreas] = useState([]);

  const [dayFilterTerm, setDayFilterTerm] = useState('');
  const [cityFilterTerm, setCityFilterTerm] = useState('');
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers(dayFilterTerm, cityFilterTerm, nameSearchTerm);
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]); 

  
  useEffect(() => {
    function getUsersCitiesDistinct() {
      let areas = [];
      if (userExplained && userExplained.users && userExplained.users.length > 0) {
        userExplained.users.forEach(item => {
          if (!areas.includes(item.deliveryArea)) {
            areas.push(item.deliveryArea);
          }
        })
      }
      setUsersDeliveryAreas(areas);
    }
    getUsersCitiesDistinct();
  }, [userExplained]);

  const days = Object.values(delivaryDaysValues);

  // ToolbarOptions
  const options = [
      {title: AppConstants.deliveryAreaUIName, name: 'cities', values: usersDeliveryAreas, filter: setCityFilterTerm },
      {title: AppConstants.delivaryDaysUIName , name: 'days', values: days, filter: setDayFilterTerm }
  ];


  return (
    <Table 
     data={userExplained.users} 
     tableColumns={tableColumns} 
     subHeaderComponent={
        <Toolbar title= {AppConstants.usersUIName}  actionTitle={AppConstants.addUserUIName} 
         options={options} 
         search={setNameSearchTerm}
        />} 
    />
  );
};

export default Users;
