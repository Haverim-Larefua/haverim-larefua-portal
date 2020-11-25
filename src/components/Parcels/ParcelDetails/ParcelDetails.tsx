import React, { Fragment, useEffect, useState } from "react";
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
import Option from "../../../models/Option";
import ParcelTracking from "../../../models/ParcelTracking";
import { CollectionUtil } from "../../../Utils/Common/CollectionsUtil";
import httpService from "../../../services/http";

const statuses = AppConstants.parcelStatusOptions.filter((status) => status.label !== AppConstants.exceptionStatusName);

interface ParcelDetailsProps {
  match: any;
  actions: any;
}

const ParcelDetails = ({ match, actions }: ParcelDetailsProps) => {
  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [currentParcel, setCurrentParcel] = useState<Parcel>();
  const [currentStatus, setCurrentStatus] = useState<Option<string>>();
  const [deliveryTracking, setDeliveryTracking] = useState<ParcelTracking[]>([]);
  const history = useHistory();
  const handleNavigateBack = () => {
    history.goBack();
  };

  const initParcel = async (id: number) => {
    const data  = await httpService.getParcel(id);
    setCurrentParcel(data);
    const s = AppConstants.parcelStatusOptions.find((p) => p.value === data?.parcelTrackingStatus);
    s && setCurrentStatus({ ...s });
    const dt = data ? data.parcelTracking : [];
    setDeliveryTracking([...dt]);
  }

  useEffect(() => {
    initParcel(match.params.id);
  }, [match.params.id]);

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

    const dt = [...currentParcel.parcelTracking];
    dt.push({
      status: status,
      statusDate: new Date(),
      userId: currentParcel.currentUserId,
      id: 0,
      parcelId: currentParcel.id,
      comments: "",
    });

    setDeliveryTracking(dt);

    const s = AppConstants.parcelStatusOptions.find((p) => p.value === status);
    s && setCurrentStatus({ ...s });

    httpService.updateParcelsStatus(currentParcel.currentUserId, status, [currentParcel.id]).then(() =>{
      actions.reloadParcels();
    });
  };

  return currentParcel ? (
    <div className="ffh-details">
      <div className="ffh-details-header">
        <BackIcon className="ffh-details__back" onClick={handleNavigateBack} />
        <h2 className="ffh-details-header__title">{`חבילה עבור ${currentParcel.customerName}`}</h2>
        <Status
          label={ParcelUtil.parcelStatusEnumToUIValue(currentStatus? currentStatus.value : currentParcel.parcelTrackingStatus)}
          value={currentStatus? currentStatus.value : currentParcel.parcelTrackingStatus}
        />

        {currentParcel.exception ? <Status label={AppConstants.exceptionStatusName} value="exception" /> : null}

        <div className="ffh-toolbar__filters">
          <label className="ffh-toolbar__label">{statusFilter.title}</label>
          <Dropdown
            key={currentParcel.id}
            options={statuses}
            name={statusFilter.name}
            filter={statusFilter.filter}
            bullets={statusFilter.bullets}
            showOptionAll={false}
            isDisabled={statusFilter.isDisabled}
            onSelection={updateParcelStatus}
            defaultValue={currentStatus}
          />
        </div>
      </div>
      <DetailsParcelTable currentParcel={currentParcel} />
      {CollectionUtil.isNotEmpty(deliveryTracking) ? (
        <div>
          <DetailsUserTable deliveryUser={currentParcel.user} />
          <DetailsTrackingTable key={deliveryTracking[deliveryTracking.length-1].id} deliveryTracking={deliveryTracking} signature={currentParcel.signature} />
        </div>
      ): null}
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
