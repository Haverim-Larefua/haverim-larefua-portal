import Parcel from "../../../../models/Parcel";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpService from "../../../../services/http";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import "./InDelivery.scss";
import _ from "lodash";
import { CollectionUtil } from "../../../../Utils/Common/CollectionsUtil";

const InDelivery = () => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [parcelsByCity, setParcelsByCity] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await httpService.getParcels("ready", "", "");
    const inDeliveryParcels = data.filter((parcel: Parcel) => parcel.currentUserId);
    setTotalNumber(inDeliveryParcels.length);

    const groupedByCity = _.mapValues(_.groupBy(inDeliveryParcels, "user.deliveryArea"), (clist) =>
      clist.map((parcel) => _.omit(parcel, "user.deliveryArea")).length
    );

    setParcelsByCity(groupedByCity);
  }

  const navigateToParcelsPage = () => {
    history.push("/parcels");
  };

  return (
    <div className="in-delivery-container">
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
    </div>
  );
};

export default InDelivery;
