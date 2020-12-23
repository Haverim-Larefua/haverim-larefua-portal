import React, { useEffect, useState } from "react";
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
import { ReactComponent as SwitchUserIcon } from "../../../assets/icons/switch.svg";
import { ReactComponent as RemoveUserIcon } from "../../../assets/icons/remove.svg";

import AssignUserToParcelsModal from "../AssignUserToParcelsModal/AssignUserToParcelsModal";


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
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [parcelsToAssociate, setParcelsToAssociate] = useState<number[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number>(0);

  const history = useHistory();
  const handleNavigateBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const initParcel = async (id: number) => {
      const parcelData = await httpService.getParcel(id);
      setCurrentParcel(parcelData);
      const parcelStatus = AppConstants.parcelStatusOptions.find((option) => option.value === parcelData?.parcelTrackingStatus);
      parcelStatus && setCurrentStatus({ ...parcelStatus });
      const parcelTracking = parcelData?.parcelTracking || [];
      setDeliveryTracking([...parcelTracking]);
      setParcelsToAssociate([id]);
    };
    initParcel(match.params.id);

  }, [match.params.id]);

  useEffect(() => {
    const getParcel = async () => {
      if (currentParcel) {
        const parcelData = await httpService.getParcel(currentParcel.id);
        setCurrentParcel(parcelData);
        setCurrentUserId(parcelData.currentUserId);
      }
    };
    getParcel();

  }, [currentUserId]);


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
    const { params } = match;


    const parcelTracking = [...currentParcel.parcelTracking];
    parcelTracking.push({
      status: status,
      statusDate: new Date(),
      userId: currentParcel.currentUserId,
      id: 0,
      parcelId: currentParcel.id,
      comments: "",
    });

    setDeliveryTracking(parcelTracking);

    const parcelStatus = AppConstants.parcelStatusOptions.find((option) => option.value === status);
    parcelStatus && setCurrentStatus({ ...parcelStatus });

    currentParcel.exception = false;
    setCurrentParcel(currentParcel);

    httpService.updateParcelsStatus(currentParcel.currentUserId, status, [currentParcel.id]).then(() => {
      actions.reloadParcels();
    });
  };

  const hideUsersModal = (userId?: number) => {
    setOpenUsersModal(false);
    if (userId && userId !== currentUserId) {
      setCurrentUserId(userId);
    }
  };

  const showUsersModal = () => {
    setOpenUsersModal(true);
  };
  return currentParcel ? (
    <div className="ffh-details">
      <div className="ffh-details-header">
        {openUsersModal &&
          <AssignUserToParcelsModal parcelsToAssociate={parcelsToAssociate} handleClose={hideUsersModal} initUserId ={currentParcel.currentUserId} />}
        <BackIcon className="ffh-details__back" onClick={handleNavigateBack} />
        <h2 className="ffh-details-header__title">{`חבילה עבור ${currentParcel.customerName}`}</h2>
        <Status
          label={ParcelUtil.parcelStatusEnumToUIValue(
            currentStatus ? currentStatus.value : currentParcel.parcelTrackingStatus
          )}
          value={currentStatus ? currentStatus.value : currentParcel.parcelTrackingStatus}
        />

        {currentParcel.exception ? <Status label={AppConstants.exceptionStatusName} value="exception" /> : null}

        <div className="ffh-details-header__actions">
          {currentParcel.user ? <button ><RemoveUserIcon /> {AppConstants.disassociateUserUIName} </button> : null}
          <button onClick={showUsersModal}><SwitchUserIcon /> {currentParcel.user ? AppConstants.changeParcelUser : AppConstants.associateUserUIName} </button>;
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
          <DetailsTrackingTable
            key={deliveryTracking[deliveryTracking.length - 1].id}
            deliveryTracking={deliveryTracking}
            signature={currentParcel.signature}
          />
        </div>
      ) : null}
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
