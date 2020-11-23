import Parcel from "../../../../models/Parcel";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import './InDelivery.scss'



  const InDelivery = () => {

    const [totalNumber, setTotalNumber] = useState(0);
    const history = useHistory();

    useEffect(() => {
      init();
    }, []);

    async function init() {
      const data = await httpService.getParcels("ready", "", "");
      const inDeliveryParcels = data.filter((parcel: Parcel) => parcel.user);
      setTotalNumber(inDeliveryParcels.length);
    }

    const navigateToParcelsPage = () => {
      history.push("/parcels");
    }

    return (
      <div className="in-delivery-container">
        <div className="in-delivery-header">
            <div className="in-delivery-title">
            {totalNumber}
            </div>
            <div className="in-delivery-sub-title" onClick={navigateToParcelsPage}>
                <div className="widget-sub-number-title">כעת בחלוקה</div>
                <ArrowPrev className="arrow-all-in-delivery"/>
            </div>
        </div>
      </div>
    );
  };

  export default InDelivery;
