import React from 'react';
import formatDate from '../../../Utils/dateFormatter';
import AppConstants from '../../../constants/AppConstants';
import App from '../../App/App';

export interface DetailsParcelTableProps {
    currentParcel: ICurrentParcel;
  }

  export interface ICurrentParcel {
    address: string;
    city: string;
    comments: string;
    identity: number;
    phone: string;
    lastUpdateDate: string;
  }

const DetailsParcelTable: React.FC<DetailsParcelTableProps>  = (props) => {
    return(
        <div className="ffh-details__parcel">
        <div className="ffh-details-cell creation-date">
            <div className="ffh-details-cell__label">{AppConstants.creationDateUIName}</div>
            <div className="ffh-details-cell__value">
            {`${formatDate(props.currentParcel.lastUpdateDate).weekday} - ${formatDate(props.currentParcel.lastUpdateDate).date}` }
            </div>
        </div>
        <div className="ffh-details-cell id">
            <div className="ffh-details-cell__label">{AppConstants.identifierUIName}</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.identity}
            </div>
        </div>
        <div className="ffh-details-cell phone">
            <div className="ffh-details-cell__label">{AppConstants.phone}</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.phone}
            </div>
        </div>
        <div className="ffh-details-cell city">
            <div className="ffh-details-cell__label">{AppConstants.cityUIName}</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.city}
            </div>
        </div>
        <div className="ffh-details-cell address">
            <div className="ffh-details-cell__label">{AppConstants.addressUIName}</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.address}
            </div>
        </div>
        <div className="ffh-details-cell notes">
            <div className="ffh-details-cell__label">{AppConstants.notes}</div>
            <div className="ffh-details-cell__value">
                {props.currentParcel.comments}
            </div>
        </div>
    </div>
    )
}

export default DetailsParcelTable;