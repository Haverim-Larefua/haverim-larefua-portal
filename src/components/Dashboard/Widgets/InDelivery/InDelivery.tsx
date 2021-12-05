import Parcel from "../../../../models/Parcel";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./InDelivery.scss";
import _ from "lodash";
import { Spinner } from "../../../shared/Spinner/Spinner";



const InDelivery = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [parcelsByCity, setParcelsByCity] = useState<any>();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await httpService.getParcels("distribution", [], "");
    const inDeliveryParcels = data.filter((parcel: Parcel) => parcel.currentUserId);
    setTotalNumber(inDeliveryParcels.length);

   const groupedByCity = _.mapValues(_.groupBy(inDeliveryParcels, "city.name"), (clist) =>
     clist.map((parcel) => _.omit(parcel, "city.name")).length
   );
    setParcelsByCity(groupedByCity);
    setLoading(false);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels?status=distribution");
  };

  return (
    <div className={loading ? `in-delivery-container widget-spiner-container`: `in-delivery-container`}>
        {loading? (<Spinner/>) : (
        <>
      <div className="in-delivery-header">
        <div className="in-delivery-title">{totalNumber}</div>
        <div className="in-delivery-sub-title" onClick={navigateToParcelsPage}>
          <div className="widget-sub-number-title">כעת בחלוקה</div>
          <ArrowPrev className="arrow-all-in-delivery" />
        </div>
        {parcelsByCity ? (
          <div className="in-delivery-body">
            {Object.keys(parcelsByCity).sort((a, b) => parcelsByCity[a] - parcelsByCity[b]).reverse().map((city, index) =>
              (<div key={index} className="city-value">
                <div> {city}</div>
                <div> {parcelsByCity[city]}</div>
                </div>
              )
            )}
          </div>
        ) : null}
      </div>
      </>)}
    </div>
  );
};

export default InDelivery;
