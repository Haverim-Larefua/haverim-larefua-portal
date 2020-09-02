import React, { useCallback } from 'react';
// import logger from "../../../Utils/logger";
import tableStyles from './tableStyles';
import DataTable from 'react-data-table-component';
import './Table.scss';
import { ReactComponent as SortIcon} from '../../../assets/icons/sort-descending.svg';
import { Spinner } from '../Spinner/Spinner';

const Table = (props) => {

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
      highlightOnHover
      customStyles={tableStyles}
      noHeader
      subHeader
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


