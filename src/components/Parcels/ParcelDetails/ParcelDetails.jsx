import React, { useContext } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { parcelContext } from "../../../contexts/parcelContext";
import { userContext } from "../../../contexts/userContext";
import './ParcelDetails.scss';
import DetailsParcelTable from "./DetailsParcelTable";
import DetailsUserTable from "./DetailsUserTable";
import DetailsTrackingTable from "./DetailsTrackingTable";
import { ReactComponent as BackIcon } from '../../../assets/icons/back.svg';
import Status from '../../shared/Status/Status';

const ParcelDetails = (props) => {
    console.log('Entering parcel Details');
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
            const deliveryUser = users.users.find(u => u.id === id);
            return deliveryUser;
        }
    }

    return currentParcel ? (
        <div className="fhh-details">
            <div className="fhh-details-header">
                <BackIcon className="fhh-details__back" onClick={handleNavigateBack} />
                <h2 className="fhh-details-header__title">
                    {`חבילה עבור ${currentParcel.customerName}`}
                </h2>
                <Status status={currentParcel.parcelTrackingStatus} />

            </div>
            <DetailsParcelTable currentParcel={currentParcel} />
            {deliveryStage ?
                <div>
                    <DetailsUserTable deliveryUser={getDeliveryUserById(deliveryStage.userId)} />
                    <DetailsTrackingTable deliveryTracking={deliveryTracking} />
                </div>
                : ''}


        </div>
    )
        : ''
}

export default withRouter(ParcelDetails);