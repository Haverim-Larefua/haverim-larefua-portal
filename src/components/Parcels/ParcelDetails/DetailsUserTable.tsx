import React from 'react';
import { ReactComponent as UserIcon } from '../../../assets/icons/delivery-boy.svg';
import AppConstants from '../../../constants/AppConstants';

export interface DetailsUserTableProps {
    deliveryUser: IDeliveryUser;
}

export interface IDeliveryUser {
    firstName: string;
    lastName: string;
    phone: string;
}

const DetailsUserTable:React.FC<DetailsUserTableProps> = (props) => {
    return(
        <div className="ffh-details__user">
        <div className="ffh-details-cell derivery-icon">
            <UserIcon />
        </div>
        <div className="ffh-details-cell derivery-user">
            <div className="ffh-details-cell__label">{AppConstants.deliveryUserNameUIName}</div>
            <div className="ffh-details-cell__value">
                {`${props.deliveryUser.firstName} ${props.deliveryUser.lastName}`}
            </div>
        </div>
        <div className="ffh-details-cell  derivery-phone">
            <div className="ffh-details-cell__label">{AppConstants.deliveryUserPhoneUIName}</div>
            <div className="ffh-details-cell__value">{props.deliveryUser.phone}</div>
        </div>
        <div className="ffh-details-cell">

        </div>
    </div>
    )
}

export default DetailsUserTable;