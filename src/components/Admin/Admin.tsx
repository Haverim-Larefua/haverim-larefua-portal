import React from "react";
import "./admin.scss";


const Admin: React.FC = () => {

  const triggerPushNotification = () => {
    console.log('Implement later');
  };

  return (
    <div className="ffh-portal">
      <button   className="btn btn-primary"
        onClick={() => triggerPushNotification()} >
        Trigger Push Notification
      </button>
    </div>
  );
};

export default Admin;
