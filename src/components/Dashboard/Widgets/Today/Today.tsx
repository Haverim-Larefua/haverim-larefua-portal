import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Fireworks } from "../../../../assets/icons/fiireworks.svg";
import { ReactComponent as ArrowPrev } from "../../../../assets/icons/arrow-prev.svg";
import { ReactComponent as Success } from "../../../../assets/icons/success.svg";
import './Today.scss';
import httpService from "../../../../services/http";
import { Spinner } from "../../../shared/Spinner/Spinner";


  const Today = () => {
    const [totalNumber, setTotalNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const toady = new Date().toISOString().split('T')[0] + " 00:00:00";
    const todayCondition= `parcelTracking.status = 'delivered' and parcelTracking.status_date > '${toady}'`;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const todayParcels = await httpService.getParcels("delivered", [], "", todayCondition);
    setTotalNumber(todayParcels.length);
    setLoading(false)
  }


    const navigateToParcelsPage = () => {
      history.push(`/parcels?status=delivered&freeCondition=${todayCondition}`);
    }

    return (
      <div className={loading ? `today-container widget-spiner-container`: `today-container`}>
                    {loading? (<Spinner/>) : (
        <>
          <div className="fireworks-container">
              <Fireworks className="today-icon"/>
              <div className="today-total">{totalNumber}</div>
          </div>
          <div className="navigate-today-all" onClick={navigateToParcelsPage}>
              <Success className="sucess-icon"/>
               <div className="widget-sub-number-title">נמסרו בהצלחה היום</div>
            <ArrowPrev className="arrow"/>
          </div>
          </> )}
      </div>
    );
  };

  export default Today;
