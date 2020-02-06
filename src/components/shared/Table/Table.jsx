import React, { useMemo, useCallback } from 'react';
// import logger from "../../../Utils/logger";
import tableStyles from './tableStyles';
import DataTable from 'react-data-table-component';
import './Table.scss';
import { ReactComponent as SortIcon} from '../../../assets/icons/sort-descending.svg';

const Table = (props) => {
 
  const handleButtonClick = () => {
    //alert('clicked');
  };

  const handleChange = useCallback(state => {
    props.onSelectedRowsChange(state);
  },[]);


  const columns = useMemo(() => [
  ...props.tableColumns,
    {
      cell: () => <button onClick={handleButtonClick}>Action</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      right: true,
    },
  ], [props.tableColumns]);


  const tableHeight = 'calc(100vh - 245px)';
  const sortIcon = <SortIcon />

  return (
    <DataTable
      data={props.data}
      keyField='no'
      columns={columns}
      onSelectedRowsChange={handleChange}
      selectableRows
      highlightOnHover
      customStyles={tableStyles}
      noHeader
      subHeader
      subHeaderComponent={props.subHeaderComponent}
      fixedHeader
      fixedHeaderScrollHeight={tableHeight}
      sortIcon = {sortIcon}
    />
  );
};

export default Table;


