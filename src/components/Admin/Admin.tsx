import React from "react";
import "./admin.scss";
import pushNotificationService from "../../services/pushNotification.service";


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
