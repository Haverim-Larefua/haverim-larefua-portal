import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./LastWeek.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import { Bar, BarChart, XAxis, LabelList } from "recharts";
import ParcelTracking from "../../../../models/ParcelTracking";
import Parcel from "../../../../models/Parcel";

const LastWeek = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const parcels = await httpService.getParcels("delivered", "", "");


    // const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    // const lastWeekParcels = parcels.filter(p => {
    //   const tracking: ParcelTracking[] = p.parcelTracking;
    //   return tracking.filter(t => t.statusDate > lastWeek).length > 0;
    // });
    setTotalNumber( parcels.length);


    const data = [
      { name:  getDay(5) , amount: getAmount(parcels, 0) },
      { name:  getDay(4), amount:  getAmount(parcels, 1) },
      { name:  getDay(3), amount:  getAmount(parcels, 2) },
      { name:  getDay(2), amount:  getAmount(parcels, 3) },
      { name:  getDay(1), amount:  getAmount(parcels, 4) },
      { name:  getDay(0), amount:  getAmount(parcels, 5) },
    ];
    setChartData(data);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels?status=ready");
  };



  return (
    <div className="last-week-container">
      <div className="last-week-header">
        <div className="widget-number-title">{totalNumber}</div>
        <div className="last-week-sub-title" onClick={navigateToParcelsPage}>
          <Success className="sucess-icon" />
          <div className="widget-sub-number-title last-week-sub-number-title">נמסרו בהצלחה בשבוע האחרון</div>
          <ArrowPrev className="arrow" />
        </div>
      </div>
      <div className="last-week-body-container">
        <BarChart width={300} height={200} data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tickLine={false} tickMargin={1}>
          <LabelList dataKey="name" position="insideTop"   />
            </XAxis>
          <Bar dataKey="amount" fill="#d2f1d4" label={{ position: "top" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default LastWeek;


function getDay(index: number) {
  const today = new Date();
  const days = ['ו','ה','ד','ג','ב','א', ''];
  let indexDay = today.getDay() - index;
  if(indexDay < 1) {
    indexDay = days.length - index;
  }
  return days[indexDay];
}

function getAmount(parcels: Parcel[], index: number): number {
  const day = new Date().setDate(new Date().getDate()- index);
  const parcelsByDate = parcels.filter(p => {
    const tracking: ParcelTracking[] = p.parcelTracking;
    return tracking.filter(t => t.status === "delivered" && new Date(t.statusDate).getDate() === new Date(day).getDate()).length > 0;
  });

  return parcelsByDate.length;
}
