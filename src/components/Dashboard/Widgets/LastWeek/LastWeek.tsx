
import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./LastWeek.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";


const LastWeek = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await httpService.getParcels("ready", "", "");
    setTotalNumber(data.length);
  }


  const navigateToParcelsPage = () => {
    history.push("/parcels?status=ready");
  }

  return (
    <div className="last-week-container">
        <div className="last-week-header">
            <div className="last-week-title">
            {totalNumber}
            </div>
            <div className="last-week-sub-title" onClick={navigateToParcelsPage}>
                <Success className="sucess-icon"/>
                <div className="widget-sub-number-title">נמסרו בהצלחה בשבוע האחרון</div>
            <ArrowPrev className="arrow"/>
            </div>
        </div>
    </div>
  );
};

export default LastWeek;
