import React, { useContext } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
import usePrevious from "../../contexts/userPrevious";

const Users = () => {
  const [ users, dispatch ] = useContext(userContext);
  const prevUsers = usePrevious(users);

  const filterByDay = (value) => {
    console.log('[Users] filterByDay ', value);
    if (!value || value ==='') {
        dispatch(loadUsers(prevUsers));
    } else {
       dispatch(loadUsers(users.filter(item => item.deliveryDays === value)));
    }
  }

  const filterByCity = (value) => {
    console.log('[Users] filterByCity ', value, prevUsers);
    if (!value || value ==='') {
        dispatch(loadUsers(prevUsers));
    } else {
       dispatch(loadUsers(users.filter(item => item.deliveryArea === value)));
    }
  }
  
  const search = (searchTerm) => {
    //TODO: search users here
    console.log('[Users] search ', searchTerm);
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
     data={users} 
     tableColumns={tableColumns} 
     subHeaderComponent={<Toolbar title= 'שליחים'  actionTitle='הוספת שליח' options={options} search={search}/>} 
    />
  );
};

export default Users;
