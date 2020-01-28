import React, { useMemo, useState, useCallback, useEffect } from 'react';
import tableDataItems from './datatemp';
import tableStyles from './tableStyles';
import tableColumns from './TableColums';
import DataTable from 'react-data-table-component';
import Toolbar from '../Toolbar/Toolbar';
import httpService from '../../../services/http';

const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    console.log('state', selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {

   alert('clicked');
  };

  const handleChange = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  httpService.getUsers().then(data => { setUsers(data)});

  console.log(users);

  const columns = useMemo(() => [
  ...tableColumns,
    {
      cell: () => <button onClick={handleButtonClick}>Action</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      right: true,
    },
  ], []);


  return (
    <DataTable
      data={users}
      columns={columns}
      onSelectedRowsChange={handleChange}
      selectableRows
      highlightOnHover
      customStyles={tableStyles}
      noHeader
      subHeader
      subHeaderComponent={
        (
            <Toolbar>
            </Toolbar>
        )
      }
    />
  );
};

export default Table;


