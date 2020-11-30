import React from 'react';
import AppConstants from '../../constants/AppConstants';
import memoize from 'memoize-one';
import UserNoteComponent from './UserNoteComponent';

const tableColumns  = memoize(clickHandler => [
    {
      id: 'lastName',
      name: AppConstants.lastName,
      selector: 'lastName',
      sortable: true,
      maxWidth: '250px',
    },
    {
      id: 'firstName',
      name: AppConstants.firstName,
      selector: 'firstName',
      sortable: true,
      maxWidth: '200px',
    },
    {
      id: 'deliveryArea',
      name: AppConstants.deliveryArea,
      selector: 'deliveryArea',
      sortable: true,
      maxWidth: '250px',
    },
    {
      id: 'deliveryDays',
      name: AppConstants.deliveryDays,
      selector: 'deliveryDays',
      sortable: true,
      maxWidth: '250px',
    },
    {
      id: 'phone',
      name: AppConstants.phone,
      selector: 'phone',
      sortable: true,
      style: {
        direction: 'ltr',
        'justify-content': 'flex-end'
      },
    },
    {
      id: 'notes',
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
