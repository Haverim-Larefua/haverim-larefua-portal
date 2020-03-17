import React, { useContext, useState, useEffect } from "react";

import logger from "../../Utils/logger";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { removeUser, searchUsers } from "../../contexts/actions/users.action";
import AppConstants, { delivaryDaysToInitials } from "../../constants/AppConstants";
import UserForm from "./UserForm/UserForm";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import NotificationForm from "./NotificationForm/NotificationForm";

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [notifyUserId, setNotifyUserId] = useState("");
  const [notifyUserName, setNotifyUserName] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUserText, setDeleteUserText] = useState("");
  const [showComfirmDeleteDialog, setShowComfirmDeleteDialog] = useState(false);
  const [showNotificationDialog, setShowNoticationDialog] = useState(false);
  // const [searching, setSearching] = useState(false);
  // const [refreshTime, setRefreshTime] = useState(0);

  // const refreshData = async () => {
  //   logger.log('[Users] refreshData ', searching);
  //   if (searching) {
  //     return;
  //   }
  //   setSearching(true);
  //   const response = await httpService.searchUsers(dayFilterTerm, cityFilterTerm, nameSearchTerm);
  //   dispatch(loadUsers(response));
  //   setSearching(false);
  //   setRefreshTime(refreshTime + 1);
  // }

  // useEffect(() => {
  //   const timer = setTimeout(refreshData, 30000);
  //   return () => { clearTimeout(timer)};
  // }, [refreshTime]);

  useEffect(() => {
    logger.log('[Users ] useEffect [filters] refresh data');
    // refreshData();
    dispatch(searchUsers({dayFilter: dayFilterTerm, cityFilter: cityFilterTerm, nameFilter: nameSearchTerm}));
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm]);

  useEffect(() => {
    function handleEditUser() {
      if (editUserId && editUserId !== "") {
        setShowNewUserModal(true);
      } else {
        setShowNewUserModal(false);
      }
    }
    handleEditUser();
  }, [editUserId]);

  useEffect(() => {
    function handleDeleteUser() {
      if (deleteUserId && deleteUserId !== "") {
        setShowComfirmDeleteDialog(true);
      } else {
        setShowComfirmDeleteDialog(false);
      }
    }
    handleDeleteUser();
  }, [deleteUserId, deleteUserText])


  useEffect(() => {
    function handleNotifyUser() {
      if (notifyUserId && notifyUserId !== "") {
        setShowNoticationDialog(true);
      } else {
        setShowNoticationDialog(false);
      }
    }
    handleNotifyUser();
  }, [notifyUserId])


  const daysInitials = delivaryDaysToInitials.values();
  const deliveryAreas = userExtendedData && userExtendedData.deliveryAreas ? userExtendedData.deliveryAreas : [];
  const options = [ // ToolbarOptions
    {
      title: AppConstants.deliveryArea,
      name: "cities",
      values: [AppConstants.all, ...deliveryAreas],
      filter: setCityFilterTerm
    },
    {
      title: AppConstants.deliveryDays,
      name: "days",
      values: [AppConstants.all, ...daysInitials],
      filter: setDayFilterTerm
    }
  ];

  const handleDelete = () => {
    dispatch(removeUser(deleteUserId));
    setDeleteUserId("");
  }

  const cellButtonClicked = (id, name) => {
    logger.log('[Users] cellButtonClicked on ', id, name);
    const user = userExtendedData.users.find(usr => usr.phone === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with phone ', id, '  not found');
    }
    switch (name) {
      case 'notify': {
        logger.log('[Users] cellButtonClicked send notification to ', id, user.id);
        setNotifyUserId(user.id); // because setState is async - we handle the action in useEffect
        setNotifyUserName(user.firstName + ' ' + user.lastName);
        break;
      }
      case 'edit': {
        logger.log('[Users] cellButtonClicked edit ', id, user.id);
        setEditUserId(user.id); // because setState is async - we handle the action in useEffect
        break;
      }
      case 'delete': {
        logger.log('[Users] cellButtonClicked delete ', id, user.id);
        let txt = AppConstants.deleteUserConfirmation;
        if (user.parcels && user.parcels.length > 0) {
          const prcl = user.parcels.find(p => p.parcelTrackingStatus === AppConstants.deliveringStatusName);
          if (prcl && prcl.length > 0) {
            txt = AppConstants.deleteUserWarningConfirmation;
          }
        }
        setDeleteUserText(txt);
        setDeleteUserId(user.id); // because setState is async - we handle the action in useEffect
        break;
      }
      default: {
        logger.warn('[Users] cellButtonClicked unkown action for user  ', id, user.id);
        break;
      }
    }
  };

  const handleClose = () => {
    setShowNewUserModal(false);
    setEditUserId('');
    setDeleteUserId('');
    setNotifyUserId('');
  };

  return (
    <React.Fragment>
      <Table
        data={userExtendedData.users}
        tableColumns={tableColumns}
        handleCellButtonClick={cellButtonClicked}
        subHeaderComponent={
          <Toolbar
            title={AppConstants.usersUIName}
            actionTitle={AppConstants.addUserUIName}
            action={() => setShowNewUserModal(true)}
            withOptions
            options={options}
            withSearch
            search={setNameSearchTerm}
          />
        }
      />
      {showNewUserModal &&
        <UserForm showNewUserModal={showNewUserModal} handleClose={handleClose} editUserId={editUserId} />
      }
      {showComfirmDeleteDialog &&
        <ConfirmDeleteUser show={showComfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
        text={deleteUserText} />
      }
      {showNotificationDialog &&
        <NotificationForm show={showNotificationDialog} handleClose={handleClose} userId={notifyUserId} userName={notifyUserName} />
      }

    </ React.Fragment>
  );
};

export default Users;
