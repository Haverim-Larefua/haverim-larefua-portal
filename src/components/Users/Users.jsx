import React, { useContext, useState, useEffect } from "react";

import logger from "../../Utils/logger";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import AppConstants, { delivaryDaysToInitials } from "../../constants/AppConstants";
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

const Users = ({users, searching, deliveryAreas, actions}) => {
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
  const [deleteEnalbed, setIsDeleteEnabled] = useState(true);

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

  useEffect(() => {
    setIsDeleteEnabled(deleteEnalbed);
  }, [deleteEnalbed])



  const handleDelete = () => {
    actions.removeUser(deleteUserId);
    setDeleteUserId("");
  }

  const cellButtonClicked = async (id, name) => {
    logger.log('[Users] cellButtonClicked on ', id, name);
    const user = users.find(usr => usr.phone === id);
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
        const detailedUser = await HttpService.getUserById(user.id);
        logger.log('[User] detailed user ', detailedUser);
        let userAllowedTobeDeleted = true;
        let txt = AppConstants.deleteUserConfirmation;
        if (detailedUser.parcels && detailedUser.parcels.length > 0) {
          const prcl = detailedUser.parcels.find(p =>
            ParcelUtil.parcelStatusEnumToUIValue(p.parcelTrackingStatus) === AppConstants.deliveringStatusName
            );
          if (prcl) {
            txt = AppConstants.deleteUserWarningConfirmation;
            userAllowedTobeDeleted = false;
          }
        }
        setIsDeleteEnabled(userAllowedTobeDeleted);
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
        data={users.filter(user => user.active)}
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
        <ConfirmDeleteUser isDeleteEnabled={deleteEnalbed} show={showComfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
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
    users: appState.user.users,
    deliveryAreas: appState.user.deliveryAreas,
    searching: appState.user.searching
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

