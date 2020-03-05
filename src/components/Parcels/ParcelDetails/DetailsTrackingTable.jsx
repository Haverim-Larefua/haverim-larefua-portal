import React, { useContext } from 'react';
import formatDate from '../../../Utils/dateFormatter';
import { userContext } from "../../../contexts/userContext";
import Status from '../../shared/Status/Status';
import Signature from './Signature';
import AppConstants from '../../../constants/AppConstants';


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
                        <div className="ffh-details-tracking__cell date">{AppConstants.dateUIName}</div>
                        <div className="ffh-details-tracking__cell day">{AppConstants.dayUIName}</div>
                        <div className="ffh-details-tracking__cell hour">{AppConstants.hourUIName}</div>
                        <div className="ffh-details-tracking__cell status">{AppConstants.statusUIName}</div>
                        <div className="ffh-details-tracking__cell user">{AppConstants.userUIName}</div>
                        <div className="ffh-details-tracking__cell comments">{AppConstants.notes}</div>
                    </div>
                    <div className="ffh-details-tracking__body">
                        {props.deliveryTracking.map((track, index) => {
                            return (
                                <div className="ffh-details-tracking__row" key={index}>
                                    <div className="ffh-details-tracking__cell date">{formatDate(track.statusDate).date}</div>
                                    <div className="ffh-details-tracking__cell day">{formatDate(track.statusDate).weekday}</div>
                                    <div className="ffh-details-tracking__cell hour">{formatDate(track.statusDate).hour}</div>
                                    <div className="ffh-details-tracking__cell status"><Status status={track.status} /></div>
                                    <div className="ffh-details-tracking__cell user">{getUserFullNameById(track.userId)}</div>
                                    <div className="ffh-details-tracking__cell comments"><span>{track.comments}</span>
                                    {console.log('Track Status: ', track.status)}
                                        {(track.status === AppConstants.deliveredStatusName && props.deliveryTracking.length === index + 1) &&
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