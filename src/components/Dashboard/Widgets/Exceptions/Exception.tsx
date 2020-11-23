import React, { useEffect, useState } from "react";
import ExceptionParcel from "./ExceptionParcel/ExceptionParcel";
import { ReactComponent as ErrorIcon } from '../../../../assets/icons/ic-error.svg';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./Exception.scss";
import Parcel from "../../../../models/Parcel";

interface ExceptionsProps {
  exceptionParcels: Parcel[];
}

const Exceptions = ({exceptionParcels}: ExceptionsProps) => {

  const [firstExceptionParcels, setFirstExceptionParcels] = useState<Parcel[]>([]);
  const history = useHistory();

  useEffect(() => {
    const firstParcels = exceptionParcels.slice(0, 5);
    setFirstExceptionParcels(firstParcels);
  }, [exceptionParcels]);

  const navigateToParcelsPage = () => {
    history.push("/parcels");
  }

  return (
    <div className="exceptions-container">
      <div className="exceptions-header-container">
        <div>
          <span><ErrorIcon className="error-icon" /></span>
          <span className="number-exceptions">{exceptionParcels.length}</span>
          <span className="widget-sub-number-title"> בחריגה</span>
        </div>
        <div className="btn-navigate-all" onClick={navigateToParcelsPage}>
          לכל החבילות שבחריגה
          <ArrowPrev className="arrow-all-exceptions"/>
          </div>
      </div>
      <div className="exceptions-body-container">
        {firstExceptionParcels.map((parcel) => (
          <ExceptionParcel key={parcel.id} parcel={parcel} />
        ))}
      </div>
    </div>
  );
};

export default Exceptions;
