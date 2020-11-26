import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Fireworks } from "../../../../assets/icons/fiireworks.svg";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import './Today.scss';
import httpService from "../../../../services/http";
import ParcelTracking from "../../../../models/ParcelTracking";


  const Today = () => {
    const [totalNumber, setTotalNumber] = useState(0);
    const history = useHistory();


  useEffect(() => {
    init();
  }, []);

  async function init() {
    const parcels = await httpService.getParcels("delivered", "", "");

    const toady = new Date().getDate();
    const todayParcels = parcels.filter(p => {
      const tracking: ParcelTracking[] = p.parcelTracking;
      return tracking.filter(t => t.status === "delivered" && new Date(t.statusDate).getDate() === toady).length > 0;
    });
    setTotalNumber(todayParcels.length);
  }


    const navigateToParcelsPage = () => {
      history.push("/parcels");
    }

    return (
      <div className="today-container">
          <div className="fireworks-container">
              <Fireworks className="today-icon"/>
              <div className="today-total">{totalNumber}</div>
          </div>
          <div className="navigate-today-all" onClick={navigateToParcelsPage}>
              <Success className="sucess-icon"/>
               <div className="widget-sub-number-title">נמסרו בהצלחה היום</div>
            <ArrowPrev className="arrow"/>
          </div>
      </div>
    );
  };

  export default Today;
