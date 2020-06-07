import React, { useState, useContext, useEffect } from "react";
import ParcelsImporterService from "../../services/ParcelsImporter.service";
import { withRouter, useHistory } from 'react-router-dom';
import { addParcels, assignUserToParcels, searchParcels, removeParcel } from "../../contexts/actions/parcels.action";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { parcelContext } from "../../contexts/parcelContext";
import { userContext } from "../../contexts/userContext";
import AppConstants from "../../constants/AppConstants";
import { parcelStatusesValues } from "../../contexts/interfaces/parcels.interface";
import logger from "../../Utils/logger";
import UsersModal from "../Users/UsersList/UsersModal";
import UsersList from "../Users/UsersList/UsersList";
import ConfirmDeleteParcel from "./ConfirmDeleteParcel";
import ErrorDialog from "../shared/ErrorDialog";

const Parcels = () => {
  const [parcelExtendedData, dispatch] = useContext(parcelContext);
  const [userExtendedData] = useContext(userContext);

  const [statusFilterTerm, setStatusFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [showComfirmDeleteDialog, setShowComfirmDeleteDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  
  const [selectedRowsState, setSelectedRowsState] = useState({allSelected: false, selectedCount: 0, selectedRows: []});
  const [parcelsToAssociate, setParcelsToAssociate] = useState([]);

  const [selectedUser, setSelectedUser] = useState();

  const [deleteParcelId, setDeleteParcelId] = useState("");
  const [deleteParcelText, setDeleteParcelText] = useState("");
  

  useEffect(() => {
    dispatch(searchParcels({statusFilter: statusFilterTerm, cityFilter: cityFilterTerm, nameFilter: nameSearchTerm}));
  }, [statusFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);

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

  const handleDelete = () => {
    dispatch(removeParcel(deleteParcelId));
    setDeleteParcelId("");
  }

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
    return parcel;
  };

  const associateUserToListOfParcels = (parcelsToAssociate, userId) => {
    logger.log('[Parcels] associateUserToListOfParcels', parcelsToAssociate, userId);

    const parcels = [];
    if (parcelsToAssociate && parcelsToAssociate.length > 0 ) {
      const uId = parseInt(userId);
      parcelsToAssociate.forEach(id => {
        parcels.push(associateUserToOneParcel(uId, parseInt(id)));
      });
      dispatch(assignUserToParcels(parcels));
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

  const cellButtonClicked = (idStr, name) => {
    logger.log('[Parcels] cellButtonClicked on ', idStr, name);
    const id = parseInt(idStr); 
    const parcel = parcelExtendedData.parcels.find(prcl => prcl.id === id);
    if (!parcel) {
      logger.error('[Parcels] cellButtonClicked user with id ', id, '  not found');
    }
    if (name === 'delete') {
      logger.log('[Parcels] cellButtonClicked delete ', id, parcel.id);
      let txt = AppConstants.deleteParcelConfirmation;
      if (parcel.parcels && parcel.parcels.length > 0) {
        const prcl = parcel.parcels.find(p => p.parcelTrackingStatus === AppConstants.deliveringStatusName);
        if (prcl && prcl.length > 0) {
          txt = AppConstants.deleteParcelWarningConfirmation;
        }
      }
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
    setShowErrorDialog(false);
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
      {openUsersModal &&
      <UsersModal show={openUsersModal} handleClose={hideUsersModal} handleAction={associateUserToSelectedParcels}>
        <UsersList updateSelectedUser={updateSelectedUser}/>
      </UsersModal>
    }
      <Table
        data={parcelExtendedData.parcels}
        tableColumns={tableColumns}
        handleCellButtonClick={cellButtonClicked}
        rowClick={handleRowClick}
        onSelectedRowsChange={onSelectedRowsChanged}
        subHeaderComponent={buildToolBar()}
        selectableRows
        pointerOnHover
      />
      {showComfirmDeleteDialog &&
        <ConfirmDeleteParcel show={showComfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
        text={deleteParcelText} />
      } 
      {showErrorDialog &&
        <ErrorDialog show={showErrorDialog} handleClose={handleClose} text='dsdf slkdfsdfslkj sdf'/>
      }  

    </div>
  );
}

// export default Parcels;
export default withRouter(Parcels);
