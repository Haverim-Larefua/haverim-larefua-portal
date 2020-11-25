import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import "./LastWeeks.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { Area, Line, Tooltip, ComposedChart, XAxis } from "recharts";
import Parcel from "../../../../models/Parcel";
import ParcelTracking from "../../../../models/ParcelTracking";

const LastWeeks = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    // const parcels: Parcel[] = await httpService.getParcels("delivered", "", "");


    // const data = [
    //   { name: "", amt: 1400 },
    //   { name: "", amt: 1400 },
    //   { name: "", amt: 1400 },
    //   { name: "", amt: 1400 },
    //   { name: "", amt: 50 },
    //   { name: "", amt: 60 },
    //   { name: "", amt: 1400 },
    // ];

    // setChartData(data);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels?status=ready");
  };

  return (
    <div className="last-weeks-container">
      <div className="last-weeks-header">
        <div className="widget-number-title">{totalNumber}</div>
        <div className="last-weeks-sub-title" onClick={navigateToParcelsPage}>
          <Success className="sucess-icon" />
          <div className="widget-sub-number-title last-weeks-sub-number-title">נמסרו בהצלחה ב 4 שבועות האחרונים</div>
          <ArrowPrev className="arrow" />
        </div>
      </div>
      <div>
        <ComposedChart width={400} height={200} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <Area type="monotone" dataKey="amt" fill="#def5d9" />
          <Line type="monotone" dataKey="amt" stroke="#def5d9" />
        </ComposedChart>
      </div>
    </div>
  );
};

export default LastWeeks;
