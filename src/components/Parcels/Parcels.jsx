import React, { useState, useContext, useEffect } from "react";
import memoize from 'memoize-one';
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { addParcels, loadParcels, assignUserToParcel } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
import { userContext } from "../../contexts/userContext";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { parcelStatusesValues } from "../../contexts/interfaces/parcels.interface";
import logger from "../../Utils/logger";
import Modal from "../shared/Modal/Modal";
import UsersList from "../Users/UsersList";

const Parcels = () => {
  const [parcelExtendedData, dispatch] = useContext(parcelContext);
  const [userExtendedData] = useContext(userContext);

  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false);

  const [selectedRowsState, setSelectedRowsState] = useState({allSelected: false, selectedCount: 0, selectedRows: []});

  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    async function fetchData() {
      if (searching) {
        return;
      }
      setSearching(true);
      const response = await httpService.searchParcels(statusFilterTerm, cityFilterTerm,  nameSearchTerm);
      dispatch(loadParcels(response));
      setSearching(false);
    }
    fetchData();
    //throttle(fetchData, 300);
  }, [statusFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);

  const showUsersModal = () => {
    setOpenUsersModal(true);
  };

  const hideUsersModal = () => {
    setOpenUsersModal(false);
  };

  const updateSelectedUser= (userId) => {
    logger.log('[Parcels] updateSelectedUser', userId);
    setSelectedUser(userId);
  }

  const associateUserToSelectedParcels = () => {
    logger.log('[Parcels] associateUserToParcels', selectedRowsState, selectedUser);
    hideUsersModal();
    if (selectedRowsState.selectedCount > 0 ) {
      selectedRowsState.selectedRows.forEach(row => {
        associateUserToParcel(selectedUser.value, row.id)
      })
    }
  }

  const associateUserToParcel = (userId, parcelId) => {
    const parcel = {...parcelExtendedData.parcels.find(p => p.id === parcelId)};
    parcel.currentUserId = userId;
    parcel.user = userExtendedData.users.find(u => u.id === userId);
    logger.log('[Parcels] associateUserToparcel dispatch', parcel);
    dispatch(assignUserToParcel(parcelId, userId));
  }

  const statuses = [AppConstants.all, ...Object.values(parcelStatusesValues)];

  // ToolbarOptions
  const options = [
    { title: AppConstants.statusUIName, name: "status", values: statuses, filter: setStatusFilterTerm, bullets: true },
    { title: AppConstants.cityUIName,   name: "cities", values: [AppConstants.all, ...parcelExtendedData.cities], filter: setCityFilterTerm }
  ];

  //selectedRowsState = { allSelected, selectedCount, selectedRows }
  const onSelectedRowsChanged = selectedRowsState => {
    logger.log('[Parcels] onSelectedRowsChanged ', selectedRowsState);
    setSelectedRowsState(selectedRowsState);
  }

  const buildSubTitle = () => {
    return (
        selectedRowsState.selectedCount > 0 
          ? `${selectedRowsState.selectedCount} חבילות נבחרו` 
          : ''
          )
  }

  const isWithOptionsAnSearch = () => {
    return selectedRowsState.selectedCount === 0
  }

  const handleAction = e => {
    if (isWithOptionsAnSearch()) { // load from file
      const files = e.target.files;
      if (files) {
        handleFile(files[0]);
      }
    } else { // associate user to parcels
      logger.log('[Parcel] handleAction associate user to parcel' );
      showUsersModal();
    }
  };

  const associateUserToParcelClicked = (e) => {
    logger.log('[Parcel] associateUserToParcelClicked ', e);
    //TODO  Open modal with users 
    showUsersModal();
  }

  const handleFile = async file => {
    const data = await ParcelsImporterService.ImportFromExcel(file);
    dispatch(addParcels(data));
  };

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
        search={setNameSearchTerm}
        withSearch = {withOptionsAndSearch}
        uploadButton = {withOptionsAndSearch}
      />)
  }

  return (
    <div>
      <Modal show={openUsersModal} handleClose={hideUsersModal} handleAction={associateUserToSelectedParcels}>
        <UsersList updateSelectedUser={updateSelectedUser}/>
      </Modal>

      <Table
        data={parcelExtendedData.parcels}
        tableColumns={tableColumns}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
        handleCellButtonClick={associateUserToParcelClicked}
      />
    </div>
  );
}

export default Parcels;
