import React, {useContext, useState, useEffect} from "react";
import logger from "../../Utils/logger";

import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { deliveryDaysInitialValues } from "../../contexts/interfaces/users.interface";
import UserForm from "./UserForm";

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [editUserId, setEditUserId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers( dayFilterTerm, cityFilterTerm, nameSearchTerm );
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);


  const daysInitials = Object.values(deliveryDaysInitialValues);
  // ToolbarOptions
  const options = [
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

  const cellButtonClicked = (id,name) => {
    logger.log('[Users] cellButtonClicked on ', id, name);
    const user = userExtendedData.users.find(usr => usr.phone === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with phone ', id,'  not found');
    }
    switch (name) {
      case 'notify' : {
        logger.log('[Users] cellButtonClicked send notification to ', id, user.id);
        break;
      }
      case 'edit': {
        logger.log('[Users] cellButtonClicked edit ', id, user.id);
        setEditUserId(user.id);
        setShowNewUserModal(true);
        break;
      }
      case 'delete': {
        logger.log('[Users] cellButtonClicked delete ', id, user.id);
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
  };

  return (
      <div>
        <UserForm showNewUserModal={showNewUserModal}  handleClose={handleClose} editUserId={editUserId}/>

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
      </div>
  );
};

export default Users;
