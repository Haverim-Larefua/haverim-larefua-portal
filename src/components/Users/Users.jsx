import React, { useContext } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";
import { setUsers } from "../../contexts/actions/users.action";
import usePrevious from "../../contexts/userPrevious";

const Users = () => {
  const [ userExplained, dispatch ] = useContext(userContext);
  const prevUserExplained = usePrevious(userExplained);


  const searchByName = (value) => {
    console.log('[Users] searchByName ', value);
    if (!value || value.trim() ==='') {
      dispatch(setUsers(prevUserExplained.users));
    } else {
      const val = value.toLowerCase();
      const filteredUsers = userExplained.users.filter(item => {
          const name = item.firstName + item.lastName;
          return name && name.toLowerCase().indexOf(val) !== -1;
      });
      dispatch(setUsers(filteredUsers));
    }
  }

  const filterByDay = (value) => {
    console.log('[Users] filterByDay ', value);
    if (!value || value ==='') {
       dispatch(setUsers(prevUserExplained.users));
    } else {
       const filteredUsers = userExplained.users.filter(item => item.deliveryDays === value);
       dispatch(setUsers(filteredUsers));
    }
  }

  const filterByCity = (value) => {
    console.log('[Users] filterByCity ', value);
    if (!value || value ==='') {
       dispatch(setUsers(prevUserExplained.users));
    } else {
       const filteredUsers = userExplained.users.filter(item => item.deliveryArea === value);
       dispatch(setUsers(filteredUsers));
    }
  }
  
  const cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  const days = ['א','ב','ג','ד','ה','ו','ש','כל השבוע'];

  // ToolbarOptions
  const options = [
      {title: 'עיר', name: 'cities', values: cities, filter: filterByCity},
      {title: 'ימי חלוקה' , name: 'days', values: days, filter: filterByDay}
  ];

  

  return (
    <Table 
     data={userExplained.users} 
     tableColumns={tableColumns} 
     subHeaderComponent={<Toolbar title= 'שליחים'  actionTitle='הוספת שליח' options={options} search={searchByName}/>} 
    />
  );
};

export default Users;
