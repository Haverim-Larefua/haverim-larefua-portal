import React, { useContext } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";

const Users = () => {
  const [ users, dispatch ] = useContext(userContext);

  const cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  const days = ['א','ב','ג','ד','ה','ו','ש','כל השבוע'];

  // ToolbarOptions
  const options = [
      {title: 'עיר', name: 'cities', values: cities},
      {title: 'ימי חלוקה' , name: 'days', values: days}
  ];

  const search = (searchTerm) => {
    //TODO: search users here
    console.log('[Users] search ', searchTerm);
  }

  return (
    <Table 
     data={users} 
     tableColumns={tableColumns} 
     subHeaderComponent={<Toolbar title= 'שליחים'  actionTitle='הוספת שליח' options={options} search={search}/>} 
    />
  );
};

export default Users;
