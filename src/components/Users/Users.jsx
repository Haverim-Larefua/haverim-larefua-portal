import React, {useContext, useState, useEffect} from "react";
import logger from "../../Utils/logger";
import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { loadUsers, removeUser } from "../../contexts/actions/users.action";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { deliveryDaysInitialValues } from "../../contexts/interfaces/users.interface";
import UserForm from "./UserForm";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  const [notifyUserId, setNotifyUserId] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUserText, setDeleteUserText] = useState("");
  const [showComfirmDeleteDialog, setShowComfirmDeleteDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers( dayFilterTerm, cityFilterTerm, nameSearchTerm );
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);

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
      } else {
      }
    }
    handleNotifyUser();
  }, [notifyUserId])


  const daysInitials = Object.values(deliveryDaysInitialValues);

  const options = [ // ToolbarOptions
    {
      title: AppConstants.deliveryArea,
      name: "cities",
      values: [AppConstants.all, ...userExtendedData.deliveryAreas],
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

  const cellButtonClicked = (id,name) => {
    logger.log('[Users] cellButtonClicked on ', id, name);
    const user = userExtendedData.users.find(usr => usr.phone === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with phone ', id,'  not found');
    }
    switch (name) {
      case 'notify' : {
        logger.log('[Users] cellButtonClicked send notification to ', id, user.id);
        setNotifyUserId(user.id); // because setState is async - we handle the action in useEffect
        break;
      }
      case 'edit': {
        logger.log('[Users] cellButtonClicked edit ', id, user.id);
        setEditUserId(user.id); // because setState is async - we handle the action in useEffect
        break;
      }
      case 'delete': {
        logger.log('[Users] cellButtonClicked delete ', id, user.id);
        let txt = ' ? האם אכן תרצה/י למחוק ';
        if (user.parcels && user.parcels.length > 0) {
          const prcl = user.parcels.find(p => p.parcelTrackingStatus === AppConstants.deliveringStatusName);
          if (prcl && prcl.length > 0) {
            txt = ' ? ישנן חבילות משוייכות לשליח זה. האם בכל זאת תרצה.י למחוק ';
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
    setEditUserId("");
    setDeleteUserId("");
    setNotifyUserId("");
  };

  return (
    <React.Fragment>
        <UserForm showNewUserModal={showNewUserModal}  handleClose={handleClose} editUserId={editUserId}/>

        <ConfirmDeleteUser show={showComfirmDeleteDialog} handleClose={handleClose} handleDelete={handleDelete}
          text={deleteUserText}/>

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
      </ React.Fragment>
  );
};

export default Users;
