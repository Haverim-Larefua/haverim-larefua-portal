import React from 'react';
import { ReactComponent as UserIcon } from '../../../../assets/icons/delivery-boy.svg';

export interface DetailsUserTableProps {
    deliveryUser: IDeliveryUser;
}

export interface IDeliveryUser {
    firstName: string;
    lastName: string;
    phone: string;
}

const DetailsUserTable:React.FC<DetailsUserTableProps> = (props) => {
    const deliveryUser: IDeliveryUser = props.deliveryUser ?? {firstName: '', lastName: '', phone: ''};

    return(
        <div className="ffh-details__user">
        <div className="ffh-details-cell derivery-icon">
            <UserIcon />
        </div>
        <div className="ffh-details-cell derivery-user">
            <div className="ffh-details-cell__label">שם שליח</div>
            <div className="ffh-details-cell__value">
                {`${deliveryUser.firstName} ${deliveryUser.lastName}`}
            </div>
        </div>
        <div className="ffh-details-cell  derivery-phone">
            <div className="ffh-details-cell__label">טלפון שליח</div>
            <div className="ffh-details-cell__value">{deliveryUser.phone}</div>
        </div>
        <div className="ffh-details-cell">

        </div>
    </div>
    )
}

export default DetailsUserTable;