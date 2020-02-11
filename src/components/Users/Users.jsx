import React, { useContext, useState, useEffect } from "react";
import logger from "../../Utils/logger";

import Table from "../shared/Table/Table";
import Toolbar from "../shared/Toolbar/Toolbar";
import tableColumns from "./tableColumns";
import { userContext } from "../../contexts/userContext";
import { loadUsers } from "../../contexts/actions/users.action";
import httpService from "../../services/http";
import AppConstants from "../../constants/AppConstants";
import { delivaryDaysValues } from "../../contexts/interfaces/users.interface";
import { citiesContext } from "../../contexts/citiesContext";

const Users = () => {
  const [userExtendedData, dispatch] = useContext(userContext);
  const [cities] = useContext(citiesContext); // to be used by the add user modal

  const [dayFilterTerm, setDayFilterTerm] = useState("");
  const [cityFilterTerm, setCityFilterTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await httpService.searchUsers( dayFilterTerm, cityFilterTerm, nameSearchTerm );
      dispatch(loadUsers(response));
    }
    fetchData();
  }, [dayFilterTerm, cityFilterTerm, nameSearchTerm, dispatch]);

  const days = Object.values(delivaryDaysValues);

  // ToolbarOptions
  const options = [
    {
      title: AppConstants.deliveryAreaUIName,
      name: "cities",
      values: [AppConstants.all, ...userExtendedData.deliveryAreas],
      filter: setCityFilterTerm
    },
    {
      title: AppConstants.delivaryDaysUIName,
      name: "days",
      values: days,
      filter: setDayFilterTerm
    }
  ];

  const cellButtonClicked = (id,name) => {
    logger.log('[Users] cellButtonClicked ', id, name);
    const user = userExtendedData.users.find(usr => usr.phone === id);
    if (!user) {
      logger.error('[Users] cellButtonClicked user with phone ', id,'  not found');
    }
    switch (name) {
      case 'notify' : {
        logger.log('[Users] cellButtonClicked send notification to ', id);
        break;
      }
      case 'edit': {
        logger.log('[Users] cellButtonClicked edit ', id);
        break;
      }
      case 'delete': {
        logger.log('[Users] cellButtonClicked delete ', id);
        break;
      }
      default: {
        logger.warn('[Users] cellButtonClicked unkown action for user  ', id);
        break;
      }
    }
  }

  return (
    <Table
      data={userExtendedData.users}
      tableColumns={tableColumns}
      handleCellButtonClick={cellButtonClicked}
      subHeaderComponent={
        <Toolbar
          title={AppConstants.usersUIName}
          actionTitle={AppConstants.addUserUIName}
          options={options}
          search={setNameSearchTerm}
          withOptions = 'true'
        />
      }
      />
  );
};

export default Users;
