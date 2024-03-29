import AppConstants from "../../../constants/AppConstants";
import React from 'react';
import memoize from 'memoize-one';
import Status from '../../shared/Status/Status';
import ParcelUserComponent from './ParcelUserComponent/ParcelUserComponent';
import { DateUtil } from "../../../Utils/Common/DateUtil";
import { ParcelUtil } from "../../../Utils/Parcel/ParcelUtil";
import Note from "../../shared/Note/Note";
import formatDate from "../../../Utils/dateFormatter";
import rootReducer from "../../../redux/rootReducer";


const tableColumns = memoize(clickHandler => [{
                name: AppConstants.catalogUIName,
                selector: 'id',
                maxWidth: '80px',
                sortable: true,
                minWidth: '80px'
            },
            {
                name: AppConstants.identifierUIName,
                selector: 'identity',
                sortable: true,
                maxWidth: '120px',
                omit: true
            },
            {
                name: AppConstants.creationDateTime,
                selector: 'lastUpdateDate',
                sortable: true,
                maxWidth: '150px',
                minWidth: '150px',
                format: row => row.lastUpdateDate ? DateUtil.getDateHEDate(new Date(row.lastUpdateDate)) : null,
                center: true,
            },
            {
                name: AppConstants.statusUIName,
                selector: 'parcelTrackingStatus',
                sortable: true,
                maxWidth: '130px',
                cell: row => < Status value = { row.parcelTrackingStatus }
                label = { ParcelUtil.parcelStatusEnumToUIValue(row.parcelTrackingStatus) }
                />,
            },
            {
                name: AppConstants.nameUIName,
                selector: 'customerName',
                sortable: true,
                maxWidth: '230px',
            },
            {
                name: AppConstants.idUIName,
                selector: 'customerId',
                sortable: true,
                maxWidth: '220px',
            },
            {
                name: AppConstants.addressUIName,
                selector: 'address',
                sortable: true,
            },
            {
                name: AppConstants.cityUIName,
                id: 'city',
                selector: 'city.name',
                sortable: true,
                maxWidth: '130px',
            },
            {
                name: AppConstants.phone,
                selector: 'phone',
                sortable: true,
                maxWidth: '180px',
                style: {
                    direction: 'ltr',
                    'justify-content': 'flex-end'
                },
            },
            {
              name: AppConstants.phone2,
              selector: 'phone2',
              sortable: true,
              maxWidth: '180px',
              style: {
                direction: 'ltr',
                'justify-content': 'flex-end'
              },
            },
            {
                name: AppConstants.treeUIName,
                selector: 'tree',
                sortable: true,
                maxWidth: '150px',
                style: {
                  'justify-content': 'flex-start'
                },
              },
            {
                name: AppConstants.userUIName,
                selector: 'currentUserId',
                sortable: true,
                minWidth: '350px',
                cell: row => {
                  const comment = row.parcelTracking[row.parcelTracking.length - 1]?.comments
                    ? '[' + formatDate(row.parcelTracking[row.parcelTracking.length - 1]?.statusDate).date + '] ' + row.parcelTracking[row.parcelTracking.length - 1]?.comments
                    : undefined ;
                  return (< ParcelUserComponent userId={row.currentUserId}
                                         itemId={row.id}
                                         status={row.parcelTrackingStatus}
                                         action={clickHandler}
                                         comments={comment}
                  />)
                },
                    ignoreRowClick: row => (row.currentUserId ? false : true),
                    allowOverflow: row => (row.currentUserId ? false : true),
                },

    
            ]);

        export default tableColumns;
