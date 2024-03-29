import React, {useState, useEffect, useContext} from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { withRouter, useHistory } from 'react-router-dom';
import Table from "../shared/Table/Table";
import tableColumns from "./tableColumns/tableColumns";
import AppConstants, { ParcelStatus } from "../../constants/AppConstants";
import logger from "../../Utils/logger";
import AssignUserToParcelsModal from "./AssignUserToParcelsModal/AssignUserToParcelsModal";
import ConfirmDeleteParcel from "./ConfirmDeleteParcel/ConfirmDeleteParcel";
import './Parcels.scss';
import * as parcelActions from "../../redux/states/parcel/actions";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import queryString from 'query-string';
import ParcelsToolbar from "./ParcelsToolbar/ParcelsToolbar";
import ParcelsActionsToolbar from "./ParcelsActionsToolbar/ParcelsActionsToolbar";
import PushToUsersModal from "./PushToUsersModal/PushToUsersModal";
import httpService from '../../services/http';
import AreaSelect from "../Users/UserForm/AreaSelect/AreaSelect";
import {citiesContext} from "../../contexts/citiesContext";

const MINUTE = 60000;


const Parcels = ({ error, parcels, searching, actions }) => {
  const districts = useContext(citiesContext);
  const statuses = AppConstants.parcelStatusOptions;
  const [statusFilterTerm, setStatusFilterTerm] = useState(statuses[0].value);
  const [userUpdateStatus, setUserUpdateStatus] = useState(false);
  const [citiesFilterTerm, setCitiesFilterTerm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [freeCondition] = useState("");
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [selectedRowsState, setSelectedRowsState] = useState({ allSelected: false, selectedCount: 0, selectedRows: [] });
  const [parcelsToAssociate, setParcelsToAssociate] = useState([]);
  const [deleteParcelId, setDeleteParcelId] = useState("");
  const [deleteParcelText, setDeleteParcelText] = useState("");
  const [deleteEnabled, setIsDeleteEnabled] = useState(true);
  const [openPushToUsersModal, setPushToUsersModal] = useState(false);

  useEffect(() => {
    const queryStringParams = queryString.parse(window.location.search);
    const statusCond = queryStringParams.status && !userUpdateStatus ? queryStringParams.status : statusFilterTerm;
    const freeCond = queryStringParams.freeCondition && !userUpdateStatus ? queryStringParams.freeCondition : freeCondition;
    actions.searchParcels({ statusFilter: statusCond, cityFilter: citiesFilterTerm, searchTerm, freeCondition: freeCond });
    const timer = setInterval(() => {
      actions.reloadParcels();
    }, MINUTE);
    return () => { clearInterval(timer) };
  }, [actions, citiesFilterTerm, searchTerm, statusFilterTerm, freeCondition, userUpdateStatus]);

  useEffect(() => {
    function handleDeleteParcel() {
      if (deleteParcelId && deleteParcelId !== "") {
        setShowConfirmDeleteDialog(true);
      } else {
        setShowConfirmDeleteDialog(false);
      }
    }
    handleDeleteParcel();
  }, [deleteParcelId, deleteParcelText]);

  useEffect(() => {
    setIsDeleteEnabled(deleteEnabled);
  }, [deleteEnabled]);

  const handleDelete = () => {
    actions.removeParcel(deleteParcelId);
    setDeleteParcelId("");
  };

  const showUsersModal = () => {
    setOpenUsersModal(true);
  };

  const hideUsersModal = () => {
    setOpenUsersModal(false);
    setSelectedRowsState({ allSelected: false, selectedCount: 0, selectedRows: [] });
  };

  const hidePushToUsersModal = () => {
    setPushToUsersModal(false);
  };

  const onSelectedRowsChanged = selectedRows => {
    logger.log('[Parcels] onSelectedRowsChanged ', selectedRows);
    setSelectedRowsState(selectedRows);
  }

  const handleImportFromFile = async (e) => {
    const files = e.target.files;
    if (files) {
      const allCities = await httpService.getCities();
      const data = await ParcelsImporterService.ImportFromExcel(files[0], allCities);
      actions.addParcels(data);
    }
  }

  const handleAssociateUserClicked = async (e) => {
    logger.log('[Parcel] handleAssociateUserClick- associate user to parcel');
    setParcelsToAssociate(selectedRowsState.selectedRows.map(row => row.id));
    showUsersModal();
  };

  const handlePushUsersClicked = async (e) => {
    logger.log('[Parcel] handlePushUsersClick- push to users');
    setPushToUsersModal(true);
  };

  const cellButtonClicked = (idStr, name) => {
    logger.log('[Parcels] cellButtonClicked on ', idStr, name);
    const id = parseInt(idStr);
    const parcel = parcels.find(p => p.id === id);
    if (!parcel) {
      logger.error('[Parcels] cellButtonClicked parcel with id ', id, '  not found');
    }
    if (name === 'delete') {
      let parcelAllowedToBeDeleted = true;
      logger.log('[Parcels] cellButtonClicked delete ', id, parcel.id);
      let txt = AppConstants.deleteParcelConfirmation;
      if (parcel.parcelTrackingStatus !== ParcelStatus.Ready) {
        txt = AppConstants.deleteParcelWarningConfirmation;
        parcelAllowedToBeDeleted = false;
      }
      setIsDeleteEnabled(parcelAllowedToBeDeleted);
      setDeleteParcelText(txt);
      setDeleteParcelId(parcel.id); // because setState is async - we handle the action in useEffect
    } else if (name === 'assign') {
      logger.log('[Parcels] cellButtonClicked assign ', id, parcel.id);
      setParcelsToAssociate([id]);
      showUsersModal();
    } else {
      logger.warn('[Parcels] cellButtonClicked unknown action for parcel  ', id, parcel.id);
    }
  };

  const history = useHistory();
  const handleRowClicked = (parcel) => {
    history.push(`/parcel/${parcel.id}`);
  }

  const handleClose = () => {
    hideUsersModal();
    setDeleteParcelId('');
  };

  const updateStatusTerm = (value) => {
    setStatusFilterTerm(value);
    setUserUpdateStatus(true);
  }
  const options = [
    { title: AppConstants.filterUIName, name: "status", values: statuses, filter: updateStatusTerm, bullets: true, showOptionAll: false },
    { title: AppConstants.cityUIName, name: "cities", searchable: true , searchComponent: <AreaSelect districts={districts} onSave={(cities) => setCitiesFilterTerm(cities.map(city => city.id))}/>}
  ];

  const buildToolBar = () => {
    const displayToolBarTable = selectedRowsState.selectedCount === 0;
    return (
      displayToolBarTable ?
        <ParcelsToolbar
          importFromFileClick={handleImportFromFile}
          options={options}
          search={setSearchTerm}
        /> :
        <ParcelsActionsToolbar
          rowsCount={selectedRowsState.selectedCount}
          associateUserClick={handleAssociateUserClicked}
          pushUsersClick={handlePushUsersClicked}
        />)
  }

  const noDataMessage = 'אין חבילות להצגה';

  return (
    <div className="parcels-table-container">
      {openPushToUsersModal &&
        <PushToUsersModal parcels={selectedRowsState.selectedRows} handleClose={hidePushToUsersModal}> </PushToUsersModal>
      }
      {openUsersModal &&
        <AssignUserToParcelsModal parcelsToAssociate={parcelsToAssociate} handleClose={hideUsersModal}> </AssignUserToParcelsModal>
      }
      <Table
        id="users"
        data={parcels}
        tableColumns={tableColumns}
        handleCellButtonClick={cellButtonClicked}
        rowClick={handleRowClicked}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
        selectableRows
        selectedRowsState={selectedRowsState}
        selectedRowIdentifierKey="id"
        keyField="id"
        pointerOnHover
        noDataComponent={error?.length > 0 ? AppConstants.serverErrorMessage : noDataMessage}
        loading={searching && !error?.length > 0}
      />
      {showConfirmDeleteDialog &&
        <ConfirmDeleteParcel isDeleteEnabled={deleteEnabled} show={showConfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
          text={deleteParcelText} />
      }
    </div>
  );
}

const mapStateToProps = (appState) => {
  return {
    error: appState.parcel.error,
    parcels: appState.parcel.parcels,
    searching: appState.parcel.searching
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(parcelActions, dispatch) };
}

// export default Parcels;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Parcels));
