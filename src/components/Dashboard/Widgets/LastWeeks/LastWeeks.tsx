
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./LastWeeks.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";


const LastWeeks = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [noUserNumber, setNoUserNumber] = useState(0);
  const [readyDeliveryNumber, setReadyDeliveryNumber] = useState(0);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await httpService.getParcels("ready", "", "");
    setTotalNumber(data.length);
    const noUser = data.filter((parcel) => !parcel.user).length;
    setNoUserNumber(noUser);
    const noDelivery = data.length - noUser;
    setReadyDeliveryNumber(noDelivery);
  }


  const navigateToParcelsPage = () => {
    history.push("/parcels?status=ready");
  }

  return (
    <div className="last-weeks-container">

    </div>
  );
};

export default LastWeeks;
