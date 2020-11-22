import AppConstants from "../../constants/AppConstants";
import React from 'react';
import memoize from 'memoize-one';
import Status from '../shared/Status/Status';
import ParcelUserComponent from './ParcelUserComponent';
import { ParcelUtil } from "../../Utils/Parcel/ParcelUtil";

const tableColumns = memoize(clickHandler => [{
                name: AppConstants.catalogUIName,
                selector: 'id',
                maxWidth: '80px',
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
                name: AppConstants.startDate,
                selector: 'startDate',
                sortable: true,
                maxWidth: '140px',
                format: row => row.startDate ? new Date(row.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }) : null,
                center: true,
            },
            {
                name: AppConstants.startTime,
                selector: 'startTime',
                sortable: true,
                maxWidth: '140px',
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
                selector: 'city',
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
                name: AppConstants.userUIName,
                selector: 'userName',
                sortable: true,
                minWidth: '350px',
                cell: row => ( < ParcelUserComponent name = { row.userName }
                    itemId = { row.id }
                    status = { row.parcelTrackingStatus }
                    action = { clickHandler }
                    />),
                    ignoreRowClick: row => (row.userName ? false : true),
                    allowOverflow: row => (row.userName ? false : true),
                }
            ]);

        export default tableColumns;