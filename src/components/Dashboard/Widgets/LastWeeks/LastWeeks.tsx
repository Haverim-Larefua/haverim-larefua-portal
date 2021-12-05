import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import "./LastWeeks.scss";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { Area, Line, ComposedChart, XAxis } from "recharts";
import Parcel from "../../../../models/Parcel";
import widgetsService from "../Widgets.service";
import { DateUtil } from "../../../../Utils/Common/DateUtil";
import { CollectionUtil } from "../../../../Utils/Common/CollectionsUtil";
import { Spinner } from "../../../shared/Spinner/Spinner";

interface ChartData {
  date: number;
  amount: number;
}


const LastWeeks = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const numOfDay = 28 + new Date().getDay() + 1;
  const lastWeekDay = new Date(DateUtil.addDaysToDate(new Date(), -numOfDay)).toISOString().split('T')[0] + " 00:00:00";
  const lastWeeksCondition=`parcelTracking.status = 'delivered' and parcelTracking.status_date > '${lastWeekDay}'`;


  useEffect(() => {
    init();
  }, []);

  async function init() {
    let parcels = await httpService.getParcels("delivered", [], "", lastWeeksCondition);
    setTotalNumber(parcels.length);

    const data = getChartData(parcels);
    setChartData(data);
    setLoading(false);
  }

  const navigateToParcelsPage = () => {
    history.push(`/parcels?status=delivered&freeCondition=${lastWeeksCondition}`);
  };


  return (
    <div className={loading ? `last-weeks-container widget-spiner-container`: `last-weeks-container`}>
                  {loading? (<Spinner/>) : (
        <>
      <div className="last-weeks-header">
        <div className="widget-number-title">{totalNumber}</div>
        <div className="last-weeks-sub-title" onClick={navigateToParcelsPage}>
          <Success className="sucess-icon" />
          <div className="widget-sub-number-title last-weeks-sub-number-title">נמסרו בהצלחה ב 4 שבועות האחרונים</div>
          <ArrowPrev className="arrow" />
        </div>
      </div>
      <div className="last-weeks-chart">
        <ComposedChart width={500} height={150} data={chartData} margin={{ top: 30, right: 0, left: 20, bottom: 0 }}>
          <Area type="monotone" dataKey="amount" fill="#def5d9" />
          <Line type="monotone" dataKey="amount" stroke="#def5d9" fill="#def5d9" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} interval={0} tick={(tickProps) => renderQuarterTick(tickProps, chartData)} />
        </ComposedChart>
      </div>
      </>)}
    </div>
  );
};

export default LastWeeks;

function getChartData(parcels: Parcel[]): ChartData[] {
  const result: ChartData[] = [];

  const numOfDay = 28 + new Date().getDay() + 1;

  for (let i = 0; i < numOfDay; i++) {
    const date =  DateUtil.addDaysToDate(new Date(), -i);
    const parcelsByDate = widgetsService.getParcelsByDateDelivered(parcels, date);
    result.push({ date: date, amount: parcelsByDate.length });
  }

  return result;
}

function getTheEndOfWeek(beginDate: Date): Date {
  const  d = DateUtil.addDaysToDate(beginDate, 6);
  return new Date(d);
}

function getAmountByWeek(date: number, chartData: ChartData[]): number {
   let result = 0;

  for(let i =0; i< 7; i++) {
    const day = DateUtil.addDaysToDateNumber(date, i);
    const dayStr = DateUtil.getDate2DigitsFormatFromNumber(day);
    const specificDate = chartData.filter(d => DateUtil.getDate2DigitsFormatFromNumber(d.date) === dayStr);
    result +=  CollectionUtil.isNotEmpty(specificDate) ? specificDate[0].amount : 0;
  }
  return result;
}

function renderQuarterTick(tickProps: any, chartData: ChartData[]) {
  const { x, payload } = tickProps;
  const { value, offset } = payload;
  const date = new Date(value);
  if (date.getDay() === 6) {
    const pathX = Math.floor(x) + 0.5;
    return <path d={`M${pathX},${200}v${-200}`} stroke="#d2f1d4" />;
  }

  if (date.getDay() === 0) {
    return (
      <text
        x={x + offset - 55}
        y={140}
        textAnchor="middle"
        fontSize="12px"
        color="#525461"
      >{`${DateUtil.getDate2DigitsFormatFromDateOnlyDate(date)} - ${DateUtil.getDate2DigitsFormatFromDateOnlyDate(
        getTheEndOfWeek(date)
      )}`}</text>
    );
  }

  if (date.getDay() === 1) {
    return (
      <text x={x + offset - 37} y={50} textAnchor="middle" fontSize="12px" color="#525461">
        {getAmountByWeek(DateUtil.addDaysToDate(date, -1), chartData)}
      </text>
    );
  }
  return null;
}
