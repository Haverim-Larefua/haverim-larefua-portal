import React, { useEffect, useState } from "react";
import { DateUtil } from "../../Utils/Common/DateUtil";
import { Spinner } from "../shared/Spinner/Spinner";
import "./Dashboard.scss";
import Exceptions from "./Widgets/Exceptions/Exception";
import InDelivery from "./Widgets/InDelivery/InDelivery";
import LastWeek from "./Widgets/LastWeek/LastWeek";
import LastWeeks from "./Widgets/LastWeeks/LastWeeks";
import NewParcels from "./Widgets/NewParcels/NewParcels";
import Today from "./Widgets/Today/Today";

const Dashboard = () => {

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
            <NewParcels />
            <InDelivery/>
          </div>
          <div className="right-side">
            <Exceptions/>
            <div className="second-line">
              <Today />
              <LastWeek />
              <LastWeeks />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
