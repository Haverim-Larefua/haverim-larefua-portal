import React from 'react';
import AppConstants from '../../constants/AppConstants';
import memoize from 'memoize-one';
import UserNoteComponent from './UserNoteComponent';
import UserDeliveryAreasComponent from "./UserDeliveryAreasComponent";

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
      id: 'deliveryAreas',
      name: AppConstants.deliveryAreas,
      selector: 'cities',
      sortable: true,
      maxWidth: '250px',
      cell: row => (<UserDeliveryAreasComponent cities={row.cities}></UserDeliveryAreasComponent>),
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
      cell: row => (<UserNoteComponent note={row.notes} itemId={row.id} action={clickHandler}/>),
      ignoreRowClick: row  =>(row.userName ? false : true),
      allowOverflow: row  => (row.userName ? false : true),
    }

  ]);

  export default tableColumns;
