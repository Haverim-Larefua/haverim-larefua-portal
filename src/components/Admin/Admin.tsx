import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./admin.scss";
import pushNotificationService from "../../services/pushNotification.service";

import Toolbar from "../shared/Toolbar/Toolbar";
import Table from "../shared/Table/Table";

const Admin: React.FC = () => {

  const triggerPushNotification = () => {
    pushNotificationService.sendNotification();
  }

  return (
    <div className="fhh-portal">
      <button   className="btn btn-primary"
        onClick={() => triggerPushNotification()} >
        Trigger Push Notification
      </button>
    </div>
  );
};

export default Admin;
