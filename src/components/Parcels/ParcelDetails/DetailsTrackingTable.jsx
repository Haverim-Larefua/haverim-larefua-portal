import React, { useContext, useState } from 'react';
import formatDate from '../../../Utils/dateFormatter';
import { userContext } from "../../../contexts/userContext";
import Status from '../../shared/Status/Status';
import Signature from './Signature';
import AppConstants from '../../../constants/AppConstants';
import { ParcelUtil } from '../../../Utils/Parcel/ParcelUtil';


const DetailsTrackingTable = (props) => {
    const [users] = useContext(userContext);


    const getUserFullNameById = (id) => {
        if (users.users.length > 0) {
            const user = users.users.find((u) => u.id === id);
            if (!user) {
                return '';
            }
            return `${user.firstName} ${user.lastName}`;
        }
    };

    return (

        <div>
            <h3 className="ffh-details__subtitle">
                מעקב חבילה
        </h3>

            <div className="ffh-details__tracking">
                <div className="ffh-details-tracking__table">
                    <div className="ffh-details-tracking__head">
                        <div className="ffh-details-tracking__cell date">תאריך</div>
                        <div className="ffh-details-tracking__cell day">יום</div>
                        <div className="ffh-details-tracking__cell hour">שעה</div>
                        <div className="ffh-details-tracking__cell status">סטטוס</div>
                        <div className="ffh-details-tracking__cell user">שליח</div>
                        <div className="ffh-details-tracking__cell comments">הערות</div>
                    </div>
                    <div className="ffh-details-tracking__body">
                        {props.deliveryTracking.map((track, index) => {
                            return (
                                <div className="ffh-details-tracking__row" key={props.deliveryTracking[index].id}>
                                    <div className="ffh-details-tracking__cell date">{formatDate(track.statusDate).date}</div>
                                    <div className="ffh-details-tracking__cell day">{formatDate(track.statusDate).weekday}</div>
                                    <div className="ffh-details-tracking__cell hour">{formatDate(track.statusDate).hour}</div>
                                    <div className="ffh-details-tracking__cell status"><Status label={ParcelUtil.parcelStatusEnumToUIValue(track.status)} value={track.status} /></div>
                                    <div className="ffh-details-tracking__cell user">{getUserFullNameById(track.userId)}</div>
                                    <div className="ffh-details-tracking__cell comments"><span>{track.comments}</span>
                                    {console.log('Track Status: ', track.status)}
                                        {(track.status === "delivered" && props.deliveryTracking.length === index + 1) &&
                                            <Signature signature={props.signature} />
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsTrackingTable;
