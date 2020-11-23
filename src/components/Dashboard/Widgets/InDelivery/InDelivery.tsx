import Parcel from "../../../../models/Parcel";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import './InDelivery.scss'

interface InDeliveryProps {
    inDeliveryParcels: Parcel[];
  }

  const InDelivery = ({ inDeliveryParcels }: InDeliveryProps) => {
    const [totalNumber, setTotalNumber] = useState(0);
    const history = useHistory();

    useEffect(() => {
      setTotalNumber(inDeliveryParcels.length);
    }, [inDeliveryParcels]);

    const navigateToParcelsPage = () => {
      history.push("/parcels");
    }

    return (
      <div className="in-delivery-container">
        <div className="in-delivery-header">
            <div className="in-delivery-title">
            {totalNumber}
            </div>
            <div className="in-delivery-sub-title" onClick={navigateToParcelsPage}>
                <div className="widget-sub-number-title">כעת בחלוקה</div>
                <ArrowPrev className="arrow-all-in-delivery"/>
            </div>
        </div>
      </div>
    );
  };

  export default InDelivery;
