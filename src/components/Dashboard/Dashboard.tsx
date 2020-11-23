import React, { useEffect, useState } from "react";
import Parcel from "../../models/Parcel";
import httpService from "../../services/http";
import { DateUtil } from "../../Utils/Common/DateUtil";
import "./Dashboard.scss";
import Exceptions from "./Widgets/Exceptions/Exception";
import InDelivery from "./Widgets/InDelivery/InDelivery";
import NewParcels from "./Widgets/NewParcels/NewParcels";

const Dashboard = () => {
  const [allParcels, setAllParcels] = useState<Parcel[]>([]);

  useEffect(() => {
    httpService.getParcels().then((data) => setAllParcels(data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-container">
        <div className="title">מבט על</div>
        <div className="date">
          <div className="day">{DateUtil.getDateHEDay(new Date())}</div>
          <div className="date-str">{DateUtil.getDateHEDate(new Date())}</div>
        </div>
      </div>
      <div className="dashboard-body-container">
        <div className="left-side">
          <NewParcels readyParcels={allParcels} />
          <InDelivery inDeliveryParcels={allParcels} />
        </div>
        <div className="right-side">
          <Exceptions exceptionParcels={allParcels} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
