import React from 'react';
import StringUtil from '../../../Utils/Common/StringUtil';
import formatDate from '../../../Utils/dateFormatter';

export interface DetailsParcelTableProps {
    currentParcel: ICurrentParcel;
  }

  export interface ICurrentParcel {
    address: string;
    city: string;
    comments: string;
    phone: string;
    lastUpdateDate: Date;
    startDate: Date;
    startTime: Date;
    customerName: string;
    customerId: string;
  }

const DetailsParcelTable: React.FC<DetailsParcelTableProps>  = (props) => {
    return(
        <div className="ffh-details__parcel">
        <div className="ffh-details-cell creation-date">
            <div className="ffh-details-cell__label">תאריך יצירה</div>
            <div className="ffh-details-cell__value">
            {`${formatDate(props.currentParcel.lastUpdateDate.toString()).weekday} - ${formatDate(props.currentParcel.lastUpdateDate.toString()).date}` }
            </div>
        </div>
        <div className="ffh-details-cell start-date">
            <div className="ffh-details-cell__label">מועד התחלה</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.startDate ? new Date(props.currentParcel.startDate).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day: "2-digit" }) : "-"}
            </div>
        </div>
        <div className="ffh-details-cell start-time">
            <div className="ffh-details-cell__label">שעת התחלה</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.startTime ? props.currentParcel.startTime: "-"}
            </div>
        </div>
        <div className="ffh-details-cell customer-name">
            <div className="ffh-details-cell__label">שם</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.customerName}
            </div>
        </div>
        <div className="ffh-details-cell customer-id">
            <div className="ffh-details-cell__label">ת.ז</div>
            <div className="ffh-details-cell__value">
                {StringUtil.isNotEmpty(props.currentParcel.customerId) ? props.currentParcel.customerId : "-"}
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
