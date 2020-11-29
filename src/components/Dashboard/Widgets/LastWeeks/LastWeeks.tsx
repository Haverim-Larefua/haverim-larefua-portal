import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import "./LastWeeks.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { Area, Line, ComposedChart, XAxis } from "recharts";
import Parcel from "../../../../models/Parcel";
import ParcelTracking from "../../../../models/ParcelTracking";
import widgetsService from "../Widgets.service";

const LastWeeks = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let parcels = await httpService.getParcels("delivered", "", "");
    parcels = getParcelsFromThe4LastWeeks(parcels);
    setTotalNumber(parcels.length);

    const data = getDataForTeLast4Weeks(parcels)

    setChartData(data);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels?status=ready");
  };

  const renderQuarterTick = (tickProps: any) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const date = new Date(value);
    const month = date.getMonth();
    debugger;
    const quarterNo = Math.floor(month / 3) + 1;
    const isMidMonth = month % 3 === 1;

    if (month % 3 === 1) {
      return <text x={x + offset} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
    }

    const isLast = month === 11;

    if (month % 3 === 0 || isLast) {
      const pathX = Math.floor(isLast ? x + offset * 2 : x) + 0.5;

      return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
    }
    return null;
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
          <XAxis dataKey="amt" axisLine={true} tickLine={false} interval={0} tick={renderQuarterTick} height={1} scale="band"/>

        </ComposedChart>
      </div>
    </div>
  );
};

export default LastWeeks;


function getParcelsFromThe4LastWeeks(parcels: Parcel[]):  Parcel[]{
  const day = new Date().setDate(new Date().getDate() - 28);
  const parcelsByDate = parcels.filter((p) => {
    const tracking: ParcelTracking[] = p.parcelTracking;
    return (
      tracking && tracking.filter((t) => t.status === "delivered" && new Date(t.statusDate).getDate() > new Date(day).getDate())
        .length > 0
    );
  });

return parcelsByDate;
}


function getDataForTeLast4Weeks(parcels: Parcel[]) {
  const result: any[]= [];

  for(let i =0; i< 28; i ++) {
    const date = new Date().setDate(new Date().getDate() - i);
    const parcelsByDate = widgetsService.getParcelsByDateDelivered(parcels, date);
       result.push({name: date, amt: parcelsByDate.length});
  }

  return result;
}
