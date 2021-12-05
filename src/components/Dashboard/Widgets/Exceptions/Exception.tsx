import React, { useEffect, useState } from "react";
import ExceptionParcel from "./ExceptionParcel/ExceptionParcel";
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/ic-error.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import httpService from "../../../../services/http";
import "./Exception.scss";
import Parcel from "../../../../models/Parcel";
import { Spinner } from "../../../shared/Spinner/Spinner";

const Exceptions = () => {
  const [exceptionParcels, setExceptionParcels] = useState<Parcel[]>([]);
  const [firstParcels, setFirstParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await httpService.getParcels("exception", [], "");
    setExceptionParcels(data);
    setFirstParcels(data.slice(0, 5));
    setLoading(false);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels?status=exception");
  };

  return (
    <div className={loading ? `exceptions-container widget-spiner-container`: `exceptions-container`}>
      {loading? (<Spinner />) : (<>
      <div className="exceptions-header-container">
        <div>
          <span>
            <ErrorIcon className="error-icon" />
          </span>
          <span className="number-exceptions">{exceptionParcels.length}</span>
          <span className="widget-sub-number-title"> בחריגה</span>
        </div>
        <div className="btn-navigate-all" onClick={navigateToParcelsPage}>
          לכל החבילות שבחריגה
          <ArrowPrev className="arrow-all-exceptions" />
        </div>
      </div>
      <div className="exceptions-body-container">
        {firstParcels.map((parcel) => (
          <ExceptionParcel key={parcel.id} parcel={parcel} />
        ))}
      </div>
      </>)}
    </div>
  );
};

export default Exceptions;
