import React, { useContext } from 'react';
import formatDate from '../../../Utils/dateFormatter';
import { userContext } from "../../../contexts/userContext";
import Status from '../../shared/Status/Status';
import {ParcelUtil} from '../../../Utils/Parcel/ParcelUtil';



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
            <h3 className="fhh-details__subtitle">
                מעקב חבילה
        </h3>

            <div className="fhh-details__tracking">
                <div className="fhh-details-tracking__table">
                    <div className="fhh-details-tracking__head">
                        <div className="fhh-details-tracking__cell date">תאריך</div>
                        <div className="fhh-details-tracking__cell day">יום</div>
                        <div className="fhh-details-tracking__cell hour">שעה</div>
                        <div className="fhh-details-tracking__cell status">סטטוס</div>
                        <div className="fhh-details-tracking__cell user">שליח</div>
                        <div className="fhh-details-tracking__cell comments">הערות</div>
                    </div>
                    <div className="fhh-details-tracking__body">
                        {props.deliveryTracking.map((track, index) => {
                            return (
                                <div className="fhh-details-tracking__row" key={index}>
                                    <div className="fhh-details-tracking__cell date">{formatDate(track.statusDate).date}</div>
                                    <div className="fhh-details-tracking__cell day">{formatDate(track.statusDate).weekday}</div>
                                    <div className="fhh-details-tracking__cell hour">{formatDate(track.statusDate).hour}</div>
                                    <div className="fhh-details-tracking__cell status"><Status status={ParcelUtil.parcelStatusEnumToUIValue(track.status)} /></div>
                                    <div className="fhh-details-tracking__cell user">{getUserFullNameById(track.userId)}</div>
                                    <div className="fhh-details-tracking__cell comments">{track.notes}</div>
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