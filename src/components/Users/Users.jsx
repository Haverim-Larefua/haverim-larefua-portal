import React, { useContext, useState, useEffect } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
// import usePrevious from "../../contexts/userPrevious";
import httpService  from '../../services/http';
import AppConstants from '../../constants/AppConstants';

const Users = () => {
  const [ userExplained, dispatch ] = useContext(userContext);
  // const prevUserExplained = usePrevious(userExplained);

  const [dayFilterTerm, setDayFilterTerm] = useState('');
  const [cityFilterTerm, setCityFilterTerm] = useState('');
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers(dayFilterTerm, cityFilterTerm, nameSearchTerm);
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm]); 

  
  //TODO: query DB for all cities distinct
  const cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  const days = ['א','ב','ג','ד','ה','ו','ש','כל השבוע'];

  // ToolbarOptions
  const options = [
      {title: AppConstants.deliveryAreaUIName, name: 'cities', values: cities, filter: setCityFilterTerm },
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
