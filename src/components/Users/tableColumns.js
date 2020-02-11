import React from 'react';
import AppConstants from '../../constants/AppConstants';
import memoize from 'memoize-one';
import UserNoteComponent from './UserNoteComponent';

const tableColumns  = memoize(clickHandler => [
    {
      name: AppConstants.lastNameUIName,
      selector: 'lastName',
      sortable: true,
      maxWidth: '250px',
    },
    {
      name: AppConstants.firstNameUIName,
      selector: 'firstName',
      sortable: true,
      maxWidth: '200px',
    },
    {
      name: AppConstants.deliveryAreaUIName,
      selector: 'deliveryArea',
      sortable: true,
      maxWidth: '250px',
    },
    {
      name: AppConstants.delivaryDaysUIName,
      selector: 'deliveryDays',
      sortable: true,
      maxWidth: '250px',
    },
    {
      name: AppConstants.phoneUIName,
      selector: 'phone',
      sortable: true,
    },
    {
      name: AppConstants.commentsUIName,
      selector: 'notes',
      sortable: true,
      minWidth: '350px',
      cell: row => (<UserNoteComponent note={row.notes} itemId={row.phone} action={clickHandler}/>),
      ignoreRowClick: row  =>(row.userName ? false : true),
      allowOverflow: row  => (row.userName ? false : true),
    }

  ]);

  export default tableColumns;