import React, { useState, useContext, useEffect } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { withRouter, useHistory } from 'react-router-dom';
import { addParcels, loadParcels, assignUserToParcel } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table.jsx";
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
  const [parcelsToAssociate, setParcelsToAssociate] = useState([]);

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

  const associateUserToOneParcel = (userId, parcelId) => {
    const parcel = { ...parcelExtendedData.parcels.find(p => p.id === parcelId) };
    parcel.currentUserId = userId;
    parcel.user = userExtendedData.users.find(u => u.id === userId);
    logger.log("[Parcels] associateUserToOneParcel dispatch", parcel);
    dispatch(assignUserToParcel(parcel));
  };

  const associateUserToListOfParcels = (parcelsToAssociate, userId) => {
    logger.log('[Parcels] associateUserToListOfParcels', parcelsToAssociate, userId);

    if (parcelsToAssociate && parcelsToAssociate.length > 0 ) {
      const uId = parseInt(userId);
      parcelsToAssociate.forEach(id => {
        associateUserToOneParcel(uId, parseInt(id))
      })
    }
  }

  const associateUserToSelectedParcels = () => {
    logger.log('[Parcels] associateUserToParcels', selectedRowsState, selectedUser);
    hideUsersModal();
    associateUserToListOfParcels(parcelsToAssociate, selectedUser);
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
        dispatch(addParcels(data));
      }
    } else { // associate user to parcels
      logger.log('[Parcel] handleAction associate user to parcel' );
      setParcelsToAssociate(selectedRowsState.selectedRows.map(row => row.id));
      showUsersModal();
    }
  };

  const associateUserToParcelClicked = (e) => {
    logger.log('[Parcel] associateUserToParcelClicked ', e.currentTarget, e.target);
    setParcelsToAssociate([e.currentTarget.id]);
    showUsersModal();
  }

  const history = useHistory();
  const handleRowClick = (parcel) => {
    history.push(`/parcel/${parcel.id}`);
  }

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
        rowClick={handleRowClick}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
        handleCellButtonClick={associateUserToParcelClicked}
        selectableRows
        pointerOnHover
      />
    </div>
  );
}

// export default Parcels;
export default withRouter(Parcels);
