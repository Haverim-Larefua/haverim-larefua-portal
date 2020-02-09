import React, { useContext } from 'react';
import formatDate from '../../../Utils/dateFormatter';
import { userContext } from "../../../contexts/userContext";
import Status from '../../shared/Status/Status';

export interface DetailsTrackingTableProps {
    deliveryTracking: IDeliveryTracking[];
  }

  export interface IDeliveryTracking {

    statusDate: string;
    status: string;
    comments: string;
    userId: number;
  }

const DetailsTrackingTable: React.FC<DetailsTrackingTableProps> = (props) => {
    const [users] = useContext(userContext);


    const getUserFullNameById = (id:number) => {
        if (users.users.length > 0) {
            const user = users.users.find((u:any) => u.id === id);
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
                                    <div className="fhh-details-tracking__cell status"><Status status={track.status} /></div>
                                    <div className="fhh-details-tracking__cell user">{getUserFullNameById(track.userId)}</div>
                                    <div className="fhh-details-tracking__cell comments">---</div>
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