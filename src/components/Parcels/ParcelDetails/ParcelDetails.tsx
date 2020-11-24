import React, { Fragment, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import "./ParcelDetails.scss";
import DetailsParcelTable from "./DetailsParcelTable";
import DetailsUserTable from "./DetailsUserTable";
import DetailsTrackingTable from "./DetailsTrackingTable";
import { ReactComponent as BackIcon } from "../../../assets/icons/back.svg";
import Status from "../../shared/Status/Status";
import AppConstants from "../../../constants/AppConstants";
import Dropdown from "../../shared/Dropdown/Dropdown";
import { ParcelUtil } from "../../../Utils/Parcel/ParcelUtil";
import { connect } from "react-redux";
import Parcel from "../../../models/Parcel";
import { AppState } from "../../../redux/rootReducer";
import * as parcelActions from "../../../redux/states/parcel/actions";
import { bindActionCreators, Dispatch } from "redux";

const statuses = AppConstants.parcelStatusOptions.filter((status) => status.label !== AppConstants.exceptionStatusName);

interface ParcelDetailsProps {
  match: any;
  parcels: Parcel[];
  actions: any;
}

const ParcelDetails = ({ match, parcels, actions }: ParcelDetailsProps) => {
  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const history = useHistory();
  const handleNavigateBack = () => {
    history.goBack();
  };
  const { params } = match;

  const currentParcel = parcels.find((p) => p.id === parseInt(params.id));
  const deliveryStage =
    currentParcel && currentParcel.parcelTracking.length > 0
      ? { status: currentParcel.parcelTracking[0].status, userId: currentParcel.parcelTracking[0].userId }
      : "";
  const deliveryTracking = currentParcel && currentParcel.parcelTracking.length > 0 ? currentParcel.parcelTracking : [];
  const currentStatus = AppConstants.parcelStatusOptions.find((p) => p.value === currentParcel?.parcelTrackingStatus);
  const statusFilter = {
    title: AppConstants.changeStatusLabel,
    name: "status",
    values: statuses,
    filter: setStatusFilterTerm,
    bullets: true,
    isDisabled: false,
  };

  const updateParcelStatus = async (status: string) => {
    if (!currentParcel) {
      return;
    }

    actions.updateParcelsStatus(currentParcel.currentUserId, status, [currentParcel.id]);
  };

  return currentParcel ? (
    <div className="ffh-details">
      <div className="ffh-details-header">
        <BackIcon className="ffh-details__back" onClick={handleNavigateBack} />
        <h2 className="ffh-details-header__title">{`חבילה עבור ${currentParcel.customerName}`}</h2>
        <Status
          label={ParcelUtil.parcelStatusEnumToUIValue(currentParcel.parcelTrackingStatus)}
          value={currentParcel.parcelTrackingStatus}
        />

        {currentParcel.exception ? <Status label={AppConstants.exceptionStatusName} value="exception" /> : null}

        <div className="ffh-toolbar__filters">
          <Fragment key={statusFilter.title}>
            <label className="ffh-toolbar__label">{statusFilter.title}</label>
            <Dropdown
              options={statuses}
              name={statusFilter.name}
              filter={statusFilter.filter}
              bullets={statusFilter.bullets}
              showOptionAll={false}
              isDisabled={statusFilter.isDisabled}
              onSelection={updateParcelStatus}
              defaultValue={currentStatus}
            />
          </Fragment>
        </div>
      </div>
      <DetailsParcelTable currentParcel={currentParcel} />
      {deliveryStage && (
        <div>
          <DetailsUserTable deliveryUser={currentParcel.user} />
          <DetailsTrackingTable deliveryTracking={deliveryTracking} signature={currentParcel.signature} />
        </div>
      )}
    </div>
  ) : null;
};

function mapStateToProps(appState: AppState) {
  return {
    error: appState.parcel.error,
    parcels: appState.parcel.parcels,
    cities: appState.parcel.cities,
    searching: appState.parcel.searching,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: bindActionCreators(parcelActions, dispatch) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ParcelDetails));
