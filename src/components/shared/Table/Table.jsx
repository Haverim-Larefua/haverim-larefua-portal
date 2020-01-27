import React, { useMemo, useState, useCallback, useEffect } from 'react';
import tableDataItems from './datatemp';
import tableColumns from './TableColums';
import DataTable from 'react-data-table-component';
import Toolbar from '../Toolbar/Toolbar';

const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log('state', selectedRows);
  }, [selectedRows]);

  const handleButtonClick = () => {

   alert('clicked');
  };

  const handleChange = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

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
      data={tableDataItems}
      columns={columns}
      onSelectedRowsChange={handleChange}
      selectableRows
      highlightOnHover
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


