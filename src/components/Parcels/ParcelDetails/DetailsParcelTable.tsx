import React from 'react';
import formatDate from '../../../Utils/dateFormatter';

export interface DetailsParcelTableProps {
    currentParcel: ICurrentParcel;
  }

  export interface ICurrentParcel {
    address: string;
    city: string;
    comments: string;
    no: number;
    phone: string;
    updateDate: string;
  }

const DetailsParcelTable: React.FC<DetailsParcelTableProps>  = (props) => {
    return(
        <div className="fhh-details__parcel">
        <div className="fhh-details-cell creation-date">
            <div className="fhh-details-cell__label">תאריך יצירה</div>
            <div className="fhh-details-cell__value">
            {`${formatDate(props.currentParcel.updateDate).weekday} - ${formatDate(props.currentParcel.updateDate).date}` }
            </div>
        </div>
        <div className="fhh-details-cell id">
            <div className="fhh-details-cell__label">מזהה</div>
            <div className="fhh-details-cell__value">
                {props.currentParcel.no}
            </div>
        </div>
        <div className="fhh-details-cell phone">
            <div className="fhh-details-cell__label">טלפון</div>
            <div className="fhh-details-cell__value">
                {props.currentParcel.phone}
            </div>
        </div>
        <div className="fhh-details-cell city">
            <div className="fhh-details-cell__label">עיר</div>
            <div className="fhh-details-cell__value">
                {props.currentParcel.city}
            </div>
        </div>
        <div className="fhh-details-cell address">
            <div className="fhh-details-cell__label">כתובת</div>
            <div className="fhh-details-cell__value">
                {props.currentParcel.address}
            </div>
        </div>
        <div className="fhh-details-cell notes">
            <div className="fhh-details-cell__label">הערות</div>
            <div className="fhh-details-cell__value">
                {props.currentParcel.comments}
            </div>
        </div>
    </div>
    )
}

export default DetailsParcelTable;