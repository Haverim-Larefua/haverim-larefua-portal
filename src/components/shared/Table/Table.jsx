import React, { useCallback } from 'react';
// import logger from "../../../Utils/logger";
import tableStyles from './tableStyles';
import DataTable from 'react-data-table-component';
import './Table.scss';
import { ReactComponent as SortIcon} from '../../../assets/icons/sort-descending.svg';
import { Spinner } from '../Spinner/Spinner';



const Table = (props) => {

  const isRowSelectedByState = (row) => {
    const key = props.selectedRowIdentifierKey;
    const selectedRowsArray = props.selectedRowsState.selectedRows;
    const isCurrentRowSelected = selectedRowsArray.some((selectedRow)=> {
      return row[key] === selectedRow[key]
    });
    return isCurrentRowSelected;
  }

  const handleChange = useCallback(state => {
    props.onSelectedRowsChange(state);
  },[props]);

  const tableHeight = 'calc(100vh - 245px)';
  const sortIcon = <SortIcon />

  return (
    <DataTable
    data={props.data}
    keyField='no'
    columns={props.tableColumns(props.handleCellButtonClick)}
    
      onSelectedRowsChange={handleChange}
      selectableRows={props.selectableRows}
      selectableRowSelected={ props.selectedRowsState ? isRowSelectedByState : null}
      highlightOnHover
      customStyles={tableStyles}
      noHeader
      subHeader
      pagination
      subHeaderComponent={props.subHeaderComponent}
      fixedHeader
      fixedHeaderScrollHeight={tableHeight}
      sortIcon = {sortIcon}
      onRowClicked={(props.rowClick)}
      pointerOnHover={props.pointerOnHover}
      noDataComponent={<div style={{padding: '24px'}}>{props.noDataComponent}</div>}
      progressPending={props.loading}
      progressComponent={<Spinner/>}
      persistTableHead
    />
  );
};

export default Table;


