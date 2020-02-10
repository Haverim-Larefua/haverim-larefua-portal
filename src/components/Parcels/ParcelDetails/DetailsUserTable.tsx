import React from 'react';
import { ReactComponent as UserIcon } from '../../../assets/icons/delivery-boy.svg';

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
        <div className="fhh-details__user">
        <div className="fhh-details-cell derivery-icon">
            <UserIcon />
        </div>
        <div className="fhh-details-cell derivery-user">
            <div className="fhh-details-cell__label">שם שליח</div>
            <div className="fhh-details-cell__value">
                {`${props.deliveryUser.firstName} ${props.deliveryUser.lastName}`}
            </div>
        </div>
        <div className="fhh-details-cell  derivery-phone">
            <div className="fhh-details-cell__label">טלפון שליח</div>
            <div className="fhh-details-cell__value">{props.deliveryUser.phone}</div>
        </div>
        <div className="fhh-details-cell">

        </div>
    </div>
    )
}

export default DetailsUserTable;