import React from 'react';
import formatDate from '../../../Utils/dateFormatter';
import Status from '../../shared/Status/Status';
import Signature from './Signature';
import { ParcelUtil } from '../../../Utils/Parcel/ParcelUtil';
import {connect} from "react-redux";

const DetailsTrackingTable = ({allUsersById, deliveryTracking, signature}) => {


    const getUserFullNameById = (id) => {
        const user = allUsersById[id];
        if (!user) {
            return '';
        }
        return `${user.firstName} ${user.lastName}`;
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
                        {deliveryTracking.map((track, index) => {
                            return (
                                <div className="ffh-details-tracking__row" key={deliveryTracking[index].id}>
                                    <div className="ffh-details-tracking__cell date">{formatDate(track.statusDate).date}</div>
                                    <div className="ffh-details-tracking__cell day">{formatDate(track.statusDate).weekday}</div>
                                    <div className="ffh-details-tracking__cell hour">{formatDate(track.statusDate).hour}</div>
                                    <div className="ffh-details-tracking__cell status"><Status label={ParcelUtil.parcelStatusEnumToUIValue(track.status)} value={track.status} /></div>
                                    <div className="ffh-details-tracking__cell user">{getUserFullNameById(track.userId)}</div>
                                    <div className="ffh-details-tracking__cell comments"><span>{track.comments}</span>
                                    {console.log('Track Status: ', track.status)}
                                        {(track.status === "delivered" && deliveryTracking.length === index + 1) &&
                                            <Signature signature={signature} />
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

const mapStateToProps =(appState) => {
    return {
        allUsersById: appState.user.allUsersById,
    }
  }
  
  export default connect(mapStateToProps)(DetailsTrackingTable);
  