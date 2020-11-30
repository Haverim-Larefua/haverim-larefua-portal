import React from "react";
import Parcel from "../../../../../models/Parcel";
import { DateUtil } from "../../../../../Utils/Common/DateUtil";
import { ReactComponent as ClockIcon } from "../../../../../assets/icons/ic-time-error.svg";
import "./ExceptionParcel.scss";

interface ExceptionParcelProps {
  parcel: Parcel;
}

const ExceptionParcel = ({ parcel }: ExceptionParcelProps) => {
  return (
    <div className="exception-parcel-container">
      <div className="header-widget-container">
          <div className="parcel-id">{parcel.id}</div>
          <div className="parcel-time-container">
            <div className="parcel-time"> {parcel.startTime}</div>
            <ClockIcon className="clock-icon"/>
            </div>
      </div>
      <div className="data-container">
        <div className="lables">
          <p>שם:</p>
          <p>מועד התחלה:</p>
          <p>שם שליח:</p>
          <p>טלפון שליח:</p>
        </div>

        <div className="values">
          <p>{parcel.customerName}</p>
          <p>
            {parcel.startDate ? DateUtil.getDate2DigitsFormat(new Date(parcel.startDate).toDateString()) : "-"}
          </p>
          <p>{parcel.user?.firstName + " " + parcel.user?.lastName}</p>
          <p>{parcel.user?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ExceptionParcel;
