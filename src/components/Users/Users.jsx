import React, { useState, useEffect } from "react";

import logger from "../../Utils/logger";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import AppConstants from "../../constants/AppConstants";
import UserForm from "./UserForm/UserForm";
import ConfirmDeleteUser from "./ConfirmDeleteUser";
import NotificationForm from "./NotificationForm/NotificationForm";
import { ParcelUtil } from '../../Utils/Parcel/ParcelUtil';
import HttpService from "../../services/http";
import './Users.scss';
import Option from "../../models/Option";
import * as userActions from "../../redux/states/user/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const Users = ({filteredUsers, searching, deliveryAreas, actions}) => {
  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [notifyUserId, setNotifyUserId] = useState("");
  const [notifyUserName, setNotifyUserName] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUserText, setDeleteUserText] = useState("");
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [deleteEnabled, setIsDeleteEnabled] = useState(true);

  useEffect(() => {
    actions.searchUsers({dayFilter: dayFilterTerm, cityFilter: cityFilterTerm, nameFilter: nameSearchTerm});
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, actions]);

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
        setShowConfirmDeleteDialog(true);
      } else {
        setShowConfirmDeleteDialog(false);
      }
    }
    handleDeleteUser();
  }, [deleteUserId, deleteUserText])


  useEffect(() => {
    function handleNotifyUser() {
      if (notifyUserId && notifyUserId !== "") {
        setShowNotificationDialog(true);
      } else {
        setShowNotificationDialog(false);
      }
    }
    handleNotifyUser();
  }, [notifyUserId])

  useEffect(() => {
    setIsDeleteEnabled(deleteEnabled);
  }, [deleteEnabled])



  const handleDelete = () => {
    actions.removeUser(deleteUserId);
    setDeleteUserId("");
  }

  const cellButtonClicked = async (id, name) => {
    logger.log('[Users] cellButtonClicked on ', id, name);
    const user = filteredUsers.find(usr => usr.id === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with id ', id, '  not found');
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
        const detailedUser = await HttpService.getUserById(user.id);
        logger.log('[User] detailed user ', detailedUser);
        let userAllowedToBeDeleted = true;
        let txt = AppConstants.deleteUserConfirmation;
        if (detailedUser.parcels && detailedUser.parcels.length > 0) {
          const prcl = detailedUser.parcels.find(p =>
            ParcelUtil.parcelStatusEnumToUIValue(p.parcelTrackingStatus) === AppConstants.deliveringStatusName
            );
          if (prcl) {
            txt = AppConstants.deleteUserWarningConfirmation;
            userAllowedToBeDeleted = false;
          }
        }
        setIsDeleteEnabled(userAllowedToBeDeleted);
        setDeleteUserText(txt);
        setDeleteUserId(user.id); // because setState is async - we handle the action in useEffect
        break;
      }
      default: {
        logger.warn('[Users] cellButtonClicked unknown action for user  ', id, user.id);
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

  
  const options = [ // ToolbarOptions
    {
      title: AppConstants.deliveryArea,
      name: "cities",
      values: [...deliveryAreas].map(area => new Option(area, area)),
      filter: setCityFilterTerm,
      showOptionAll: true,
      searchable:true
    },
    {
      title: AppConstants.deliveryDays,
      name: "days",
      values: [...AppConstants.daysOptions].map(({label, value}) => new Option(label, value)),
      filter: setDayFilterTerm,
      showOptionAll: true
    }
  ];

  return (
    <div className="users-container">
      <Table
        data={filteredUsers.filter(user => user.active)}
        tableColumns={tableColumns}
        name="users"
        keyField="username"
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
            searchPlaceholder={"חיפוש לפי שם או טלפון"}
            loading = {searching}
          />
        }
      />
      {showNewUserModal &&
        <UserForm showNewUserModal={showNewUserModal} handleClose={handleClose} editUserId={editUserId} />
      }
      {showConfirmDeleteDialog &&
        <ConfirmDeleteUser isDeleteEnabled={deleteEnabled} show={showConfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
        text={deleteUserText} />
      }
      {showNotificationDialog &&
        <NotificationForm show={showNotificationDialog} handleClose={handleClose} userId={notifyUserId} userName={notifyUserName}  />
      }

    </div>
  );
};




const mapStateToProps =(appState) => {
  return {
    filteredUsers: appState.user.filteredUsers,
    deliveryAreas: appState.user.deliveryAreas,
    searching: appState.user.searching
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

