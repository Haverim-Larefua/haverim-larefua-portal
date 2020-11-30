import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./LastWeek.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import { Bar, BarChart, XAxis } from "recharts";
import ParcelTracking from "../../../../models/ParcelTracking";
import Parcel from "../../../../models/Parcel";
import { DateUtil } from "../../../../Utils/Common/DateUtil";
import widgetsService from "../Widgets.service";

const LastWeek = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let parcels = await httpService.getParcels("delivered", "", "");
    parcels = getParcelsFromTheLastWeek(parcels);
    setTotalNumber(parcels.length);

    const data = [
      { name: getDay(0), amount: getAmount(parcels, 0) },
      { name: getDay(1), amount: getAmount(parcels, 1) },
      { name: getDay(2), amount: getAmount(parcels, 2) },
      { name: getDay(3), amount: getAmount(parcels, 3) },
      { name: getDay(4), amount: getAmount(parcels, 4) },
      { name: getDay(5), amount: getAmount(parcels, 5) },
      { name: getDay(6), amount: getAmount(parcels, 6) },
    ];
    setChartData(data);
  }

  const navigateToParcelsPage = () => {
    const lastWeekDay = new Date(DateUtil.addDaysToDate(new Date(), -7)).toISOString().split('T')[0] + " 00:00:00";
    history.push(`/parcels?status=delivered&freeCondition=parcelTracking.status = 'delivered' and parcelTracking.status_date > '${lastWeekDay}'`);

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
          <XAxis dataKey="name" tickLine={false} tickMargin={1}  axisLine={false}></XAxis>
          <Bar dataKey="amount" fill="#d2f1d4" label={{ position: "top" }} />
        </BarChart>
        <div className="date-chart-container">
          {getLastWeekDates().map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LastWeek;

function getDay(index: number) {
  const today = new Date();
  const days = ["א","ב", "ג", "ד", "ה", "ו", "ז"];
  let indexDay = today.getDay() - index;
  if (indexDay < 0) {
    indexDay = days.length + indexDay;
  }
  return days[indexDay];
}

function getAmount(parcels: Parcel[], index: number): number {
  const date = new Date().setDate(new Date().getDate() - index);
  const parcelsByDate = widgetsService.getParcelsByDateDelivered(parcels, date);

  return parcelsByDate.length;
}


function getParcelsFromTheLastWeek(parcels: Parcel[]):  Parcel[]{
  const day = new Date().setDate(new Date().getDate() - 7);
  const parcelsByDate = parcels.filter((p) => {
    const tracking: ParcelTracking[] = p.parcelTracking;
    return (
      tracking && tracking.filter((t) => t.status === "delivered" && new Date(t.statusDate) > new Date(day))
        .length > 0
    );
  });

return parcelsByDate;
}

function getLastWeekDates(): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < 7) {
    let day = new Date(new Date().setDate(new Date().getDate() - i));
    result.push(DateUtil.getDate2DigitsFormatFromDateOnlyDate(day));
    i++;
  }

  return result;
}
