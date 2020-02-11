import React from 'react';
import AppConstants from '../../constants/AppConstants';
import memoize from 'memoize-one';
import UserNoteComponent from './UserNoteComponent';

const tableColumns  = memoize(clickHandler => [
    {
      name: AppConstants.lastName,
      selector: 'lastName',
      sortable: true,
    },
    {
      name: AppConstants.firstName,
      selector: 'firstName',
      sortable: true,
    },
    {
      name: AppConstants.deliveryArea,
      selector: 'deliveryArea',
      sortable: true,
    },
    {
      name: AppConstants.deliveryDays,
      selector: 'deliveryDays',
      sortable: true,
    },
    {
      name: AppConstants.phone,
      selector: 'phone',
      sortable: true,
    },
    {
      name: AppConstants.commentsUIName,
      selector: 'notes',
      sortable: true,
      minWidth: '250px',
      cell: row => (<UserNoteComponent note={row.notes} itemId={row.phone} action={clickHandler}/>),
      ignoreRowClick: row  =>(row.userName ? false : true),
      allowOverflow: row  => (row.userName ? false : true),
    }

  ]);

  export default tableColumns;
