import React, { useState, useEffect, useMemo } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { withRouter, useHistory } from 'react-router-dom';
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import AppConstants from "../../constants/AppConstants";
import logger from "../../Utils/logger";
import AssignUserToParcelsModal from "./AssignUserToParcelsModal/AssignUserToParcelsModal";
import ConfirmDeleteParcel from "./ConfirmDeleteParcel";
import './Parcels.scss';
import * as parcelActions from "../../redux/states/parcel/actions";
import {  connect } from 'react-redux';
import {bindActionCreators } from "redux";
import queryString from 'query-string';
import { ParcelUtil } from "../../Utils/Parcel/ParcelUtil";

const MINUTE = 60000;
const Parcels = ({error, cities, parcels, searching, actions} ) => {
  const statuses = AppConstants.parcelStatusOptions;

  const [statusFilterTerm, setStatusFilterTerm] = useState(statuses[0].value);
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [freeCondition, setFreCondition] = useState("");
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [showComfirmDeleteDialog, setShowComfirmDeleteDialog] = useState(false);

  const [selectedRowsState, setSelectedRowsState] = useState({allSelected: false, selectedCount: 0, selectedRows: []});
  const [parcelsToAssociate, setParcelsToAssociate] = useState([]);
  const [deleteParcelId, setDeleteParcelId] = useState("");
  const [deleteParcelText, setDeleteParcelText] = useState("");
  const [deleteEnalbed, setIsDeleteEnabled] = useState(true);

  useEffect(() => {
    const queryStringParams = queryString.parse(window.location.search);
    if(queryStringParams?.status) {
      setStatusFilterTerm(queryStringParams.status);
    }
    if(queryStringParams?.freeCondition) {
      setFreCondition(queryStringParams.freeCondition);
    }
  }, [])

  useEffect(() => {
    actions.searchParcels({statusFilter: statusFilterTerm, cityFilter: cityFilterTerm, searchTerm, freeCondition});
    const timer = setInterval(() => {
      actions.reloadParcels();
    }, MINUTE);
    return () => { clearInterval(timer) };
  }, [actions, cityFilterTerm, searchTerm, statusFilterTerm, freeCondition]);

  useEffect(() => {
    function handleDeleteParcel() {
      if (deleteParcelId && deleteParcelId !== "") {
        setShowComfirmDeleteDialog(true);
      } else {
        setShowComfirmDeleteDialog(false);
      }
    }
    handleDeleteParcel();
  }, [deleteParcelId, deleteParcelText])

  useEffect(() => {
    setIsDeleteEnabled(deleteEnalbed);
  }, [deleteEnalbed])

  const handleDelete = () => {
    actions.removeParcel(deleteParcelId);
    setDeleteParcelId("");
  }

  const showUsersModal = () => {
    setOpenUsersModal(true);
  };

  const hideUsersModal = () => {
    setOpenUsersModal(false);
    setSelectedRowsState({allSelected:false, selectedCount:0, selectedRows: [] });
  };

  const onSelectedRowsChanged = selectedRowsState => {
    logger.log('[Parcels] onSelectedRowsChanged ', selectedRowsState);
    setSelectedRowsState(selectedRowsState);
  }

  const buildSubTitle = () => {
    return (selectedRowsState.selectedCount > 0 ? `${selectedRowsState.selectedCount} חבילות נבחרו` : '' );
  }

  const isWithOptionsAnSearch = () => {
    return selectedRowsState.selectedCount === 0
  }

  const handleAction = async (e) => {
    if (isWithOptionsAnSearch()) { // load from file
      const files = e.target.files;
      if (files) {
        const data = await ParcelsImporterService.ImportFromExcel(files[0]);
        const [mergedParcels, addedParcels] = ParcelUtil.mergeParcels(parcels, data);
        actions.addParcels(addedParcels);
      }
    } else { // associate user to parcels
      logger.log('[Parcel] handleAction associate user to parcel' );
      setParcelsToAssociate(selectedRowsState.selectedRows.map(row => row.id));
      showUsersModal();
    }
  };

  const cellButtonClicked = (idStr, name) => {
    logger.log('[Parcels] cellButtonClicked on ', idStr, name);
    const id = parseInt(idStr);
    const parcel = parcels.find(prcl => prcl.id === id);
    if (!parcel) {
      logger.error('[Parcels] cellButtonClicked parcel with id ', id, '  not found');
    }
    if (name === 'delete') {
      let parcelAllowedToBeDeleted = true;
      logger.log('[Parcels] cellButtonClicked delete ', id, parcel.id);
      let txt = AppConstants.deleteParcelConfirmation;
      if (parcel.parcelTrackingStatus !== AppConstants.readyStatusName) {
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
      logger.warn('[Parcels] cellButtonClicked unkown action for parcel  ', id, parcel.id);
    }
  };

  const history = useHistory();
  const handleRowClick = (parcel) => {
    history.push(`/parcel/${parcel.id}`);
  }

  const handleClose = () => {
    hideUsersModal();
    setDeleteParcelId('');
  };

  const citiesOptions = useMemo(() => cities.map(city => ({ label: city, value: city })), [cities]);
  const options = [
    { title: AppConstants.filterUIName, name: "status", values: statuses, filter: setStatusFilterTerm, bullets: true, showOptionAll: false },
    { title: AppConstants.cityUIName, name: "cities", values: citiesOptions, filter: setCityFilterTerm, searchable:true, selectedValue: cityFilterTerm}
  ];

  const buildToolBar = () => {
    const withOptionsAndSearch = isWithOptionsAnSearch();
    const actionTitle = withOptionsAndSearch ? AppConstants.addFromFileUIName : AppConstants.associateUserUIName;
    return (
      <Toolbar
        title={AppConstants.parcelsUIName}
        subTitle={buildSubTitle()}
        actionTitle={actionTitle}
        action={handleAction}
        withOptions = {withOptionsAndSearch}
        options={options}
        search={setSearchTerm}
        withSearch = {withOptionsAndSearch}
        uploadButton = {withOptionsAndSearch}
        searchPlaceholder={"חיפוש לפי שם, תעודת זהות וטלפון"}
      />)
  }

  const noDataMessage = 'אין חבילות להצגה';

  return (
    <div className="parcels-table-conatiner">
      {openUsersModal &&
      <AssignUserToParcelsModal parcelsToAssociate={parcelsToAssociate} handleClose={hideUsersModal} >
      </AssignUserToParcelsModal>
    }
      <Table
        id="users"
        data={parcels}
        tableColumns={tableColumns}
        handleCellButtonClick={cellButtonClicked}
        rowClick={handleRowClick}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
        selectableRows
        selectedRowsState={selectedRowsState}
        selectedRowIdentifierKey="id"
        pointerOnHover
        noDataComponent={error?.length > 0 ? AppConstants.serverErrorMessage : noDataMessage}
        loading={searching && !error?.length > 0}
      />
      {showComfirmDeleteDialog &&
        <ConfirmDeleteParcel isDeleteEnabled={deleteEnalbed} show={showComfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
        text={deleteParcelText} />
      }
    </div>
  );
}

const mapStateToProps =(appState) => {
  return {
    error: appState.parcel.error,
    parcels: appState.parcel.parcels,
    cities: appState.parcel.cities,
    searching: appState.parcel.searching
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(parcelActions, dispatch) };
}

// export default Parcels;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Parcels));
