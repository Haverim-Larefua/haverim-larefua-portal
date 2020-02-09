import React, { useCallback } from 'react';
// import logger from "../../../Utils/logger";
import tableStyles from './tableStyles';
import DataTable from 'react-data-table-component';
import './Table.scss';
import { ReactComponent as SortIcon} from '../../../assets/icons/sort-descending.svg';

const Table = (props) => {
 

  const handleChange = useCallback(state => {
    props.onSelectedRowsChange(state);
  },[]);

  const tableHeight = 'calc(100vh - 245px)';
  const sortIcon = <SortIcon />

  return (
    <DataTable
      data={props.data}
      keyField='no'
      columns={props.tableColumns(props.handleCellButtonClick)}
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
      onRowClicked={(props.rowClick)}
    />
  );
};

export default Table;


