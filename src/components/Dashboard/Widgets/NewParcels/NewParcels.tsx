import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./NewParcels.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";


const NewParcels = () => {
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
    <div className="new-parcels-container">
      <div className="total">
        <div className="total-number">{totalNumber}</div>
        <div>טרום חלוקה</div>
      </div>
      <div className="chart-wrapper">
        <PieChart
          lineWidth={20}
          data={[
            { title: "מוכנות לחלוקה", value: readyDeliveryNumber, color: "#9947fd" },
            { title: "ללא שיוך", value: noUserNumber, color: "#ebdffa"  },
          ]}
          totalValue={totalNumber}
        />
      </div>
      <div className="chart-map">
        <div className="no-user">
          <div className="number">{noUserNumber}</div>
          <div onClick={navigateToParcelsPage}>ללא שיוך
          <ArrowPrev className="arrow"/>
          </div>
        </div>
        <div className="deliveried">
          <div className="number">{readyDeliveryNumber}</div>
          <div onClick={navigateToParcelsPage}>מוכנות לחלוקה
            <ArrowPrev className="arrow"/>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewParcels;
