import React, { Fragment, useContext, useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { parcelContext } from "../../../contexts/parcelContext";
import { userContext } from "../../../contexts/userContext";
import './ParcelDetails.scss';
import DetailsParcelTable from "./DetailsParcelTable";
import DetailsUserTable from "./DetailsUserTable";
import DetailsTrackingTable from "./DetailsTrackingTable";
import { ReactComponent as BackIcon } from '../../../assets/icons/back.svg';
import Status from '../../shared/Status/Status';
import User from '../../../contexts/interfaces/users.interface';
import AppConstants from '../../../constants/AppConstants';
import { parcelStatusesValues } from '../../../contexts/interfaces/parcels.interface';
import Dropdown from '../../shared/Dropdown/Dropdown';

const statuses = [...Object.values(parcelStatusesValues).filter(status => status !== AppConstants.exceptionStatusName)];

const ParcelDetails = (props) => {
    const [statusFilterTerm, setStatusFilterTerm] = useState("");
    const history = useHistory();
    const handleNavigateBack = () => {
        history.goBack();
    }
    const { params } = props.match;
    const [parcels] = useContext(parcelContext);
    const currentParcel = parcels.parcels.find(p => p.id === parseInt(params.id));
    const deliveryStage = (currentParcel && currentParcel.parcelTracking.length > 0)
        ? { status: currentParcel.parcelTracking[0].status, userId: currentParcel.parcelTracking[0].userId }
        : '';
    const [users] = useContext(userContext);
    const deliveryTracking = (currentParcel && currentParcel.parcelTracking.length > 0) ? currentParcel.parcelTracking : '';

    const getDeliveryUserById = (id) => {
        if (users.users.length > 0) {
            let deliveryUser = users.users.find(u => u.id === id);
            if (!deliveryUser) {
                deliveryUser = new User('','','','','','','','');
            }
            return deliveryUser;
        }
    }

    const statusFilter = { title: AppConstants.changeStatusLabel, name: "status", values: statuses, filter: setStatusFilterTerm, bullets: true };


    return currentParcel ? (
        <div className="ffh-details">
            <div className="ffh-details-header">
                <BackIcon className="ffh-details__back" onClick={handleNavigateBack} />
                <h2 className="ffh-details-header__title">
                    {`חבילה עבור ${currentParcel.customerName}`}
                </h2>
                <Status status={currentParcel.parcelTrackingStatus} />

                {currentParcel.exception ? (
                  <Status status={AppConstants.exceptionStatusName} />
                ) : null}
                
                <div className="ffh-toolbar__filters">
                  <Fragment key={statusFilter.title}>
                    <label className="ffh-toolbar__label">{statusFilter.title}</label>
                    <Dropdown options={[...statusFilter.values]} name={statusFilter.name} filter={statusFilter.filter} bullets={statusFilter.bullets} isDisabled={statusFilter.isDisabled}> </Dropdown>
                  </Fragment>
                </div>
            </div>
            <DetailsParcelTable currentParcel={currentParcel} />
            {deliveryStage &&
                <div>
                    <DetailsUserTable deliveryUser={getDeliveryUserById(currentParcel.currentUserId)} />
                    <DetailsTrackingTable deliveryTracking={deliveryTracking} signature={currentParcel.signature} />
                </div>
            }
        </div>
    )
        : ''
}

export default withRouter(ParcelDetails);
