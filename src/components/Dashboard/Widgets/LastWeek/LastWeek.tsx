import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./LastWeek.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import { Bar, BarChart, XAxis } from "recharts";

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
  };

  const data = [
    { name: "ו", uv: 48 },
    { name: "ה", uv: 36 },
    { name: "ד", uv: 40 },
    { name: "ג", uv: 20 },
    { name: "ב", uv: 30 },
    { name: "א", uv: 52 },
  ];

  return (
    <div className="last-week-container">
      <div className="last-week-header">
        <div className="widget-number-title">{totalNumber}</div>
        <div className="last-week-sub-title" onClick={navigateToParcelsPage}>
          <Success className="sucess-icon" />
          <div className="widget-sub-number-title">נמסרו בהצלחה בשבוע האחרון</div>
          <ArrowPrev className="arrow" />
        </div>
      </div>
      <div className="last-week-body-container">
        <BarChart width={300} height={200} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <Bar dataKey="uv" fill="#d2f1d4" label={{ position: "top" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default LastWeek;
