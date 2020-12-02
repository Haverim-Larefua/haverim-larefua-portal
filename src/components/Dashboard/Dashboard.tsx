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
  const  NUM_OF_WIDGETS = 6;
  const [loading, setLoading] = useState(true);
  const [childComponnentsLoaded, setChildComponnentsLoaded] = useState(0);

  const onChildLoad = () => {
    setChildComponnentsLoaded(prev => prev + 1);

  }

  useEffect(() => {
     if(childComponnentsLoaded === NUM_OF_WIDGETS) {
      setLoading(false);
    }
  }, [childComponnentsLoaded])


  return (
    <div className="dashboard-container">
      <div className="dashboard-header-container">
        <div className="title">מבט על</div>
        <div className="date">
          <div className="day">{DateUtil.getDateHEDay(new Date())}</div>
          <div className="date-str">{DateUtil.getDateHEDate(new Date())}</div>
        </div>
      </div>
      {loading ? (
        <div className="spiner-container">
          <Spinner />
        </div>) : null}
        <div className={loading? "hidden-dashboard-body" : "dashboard-body-container"}>
          <div className="left-side">
            <NewParcels onLoad={onChildLoad}/>
            <InDelivery onLoad={onChildLoad}/>
          </div>
          <div className="right-side">
            <Exceptions onLoad={onChildLoad}/>
            <div className="second-line">
              <Today onLoad={onChildLoad}/>
              <LastWeek onLoad={onChildLoad}/>
              <LastWeeks onLoad={onChildLoad}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
