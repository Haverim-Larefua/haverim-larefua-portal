import React from 'react';
import formatDate from '../../../Utils/dateFormatter';

export interface DetailsParcelTableProps {
    currentParcel: ICurrentParcel;
  }

  export interface ICurrentParcel {
    address: string;
    city: string;
    comments: string;
    id: number;
    phone: string;
    lastUpdateDate: string;
  }

const DetailsParcelTable: React.FC<DetailsParcelTableProps>  = (props) => {
    return(
        <div className="ffh-details__parcel">
        <div className="ffh-details-cell creation-date">
            <div className="ffh-details-cell__label">תאריך יצירה</div>
            <div className="ffh-details-cell__value">
            {`${formatDate(props.currentParcel.lastUpdateDate).weekday} - ${formatDate(props.currentParcel.lastUpdateDate).date}` }
            </div>
        </div>
        <div className="ffh-details-cell id">
            <div className="ffh-details-cell__label">מזהה</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.id}
            </div>
        </div>
        <div className="ffh-details-cell phone">
            <div className="ffh-details-cell__label">טלפון</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.phone}
            </div>
        </div>
        <div className="ffh-details-cell city">
            <div className="ffh-details-cell__label">עיר</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.city}
            </div>
        </div>
        <div className="ffh-details-cell address">
            <div className="ffh-details-cell__label">כתובת</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.address}
            </div>
        </div>
        <div className="ffh-details-cell notes">
            <div className="ffh-details-cell__label">הערות</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.comments}
            </div>
        </div>
    </div>
    )
}

export default DetailsParcelTable;