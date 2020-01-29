import React, { useContext } from "react";

import Table from "../shared/Table/Table";
import Toolbar from '../shared/Toolbar/Toolbar';
import tableColumns from './tableColumns';
import { userContext } from "../../contexts/userContext";

const Users = () => {
  const [ users, dispatch ] = useContext(userContext);

  return (
    <Table 
     data={users} 
     tableColumns={tableColumns} 
     subHeaderComponent={<Toolbar title= 'שליחים'  actionTitle='הוספת שליח'/>} 
    />
  );
};

export default Users;
