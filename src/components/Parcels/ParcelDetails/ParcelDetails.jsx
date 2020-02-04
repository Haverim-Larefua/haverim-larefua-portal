import React from 'react';
import './ParcelDetails.scss';
import { ReactComponent as BackIcon } from '../../../assets/icons/back.svg';

const ParcelDetails = () => {
    return (
        <div className="fhh-details">
            <div className="fhh-details-header">
                    <BackIcon />
                    <h2>חבילה עבור בן אבו מירב</h2>
                    <div className="fhh-details-header__ststus">
                        נמסרה
                    </div>
            </div>
            <div className="fhh-details__parcel">
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">תאריך יצירה</div>
                    <div className="fhh-details-cell__value">רביעי - 22.1.20</div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">מזהה</div>
                    <div className="fhh-details-cell__value">2034576</div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">טלפון</div>
                    <div className="fhh-details-cell__value">0534-4456765</div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">עיר</div>
                    <div className="fhh-details-cell__value">באר שבע</div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">כתובת</div>
                    <div className="fhh-details-cell__value">ישראל רבי עקיבא 45/ 30 </div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">הערות</div>
                    <div className="fhh-details-cell__value">רצוי להגיע בשעות הערב</div>
                </div>
            </div>
            <div className="fhh-details__user">
                <div className="fhh-details-cell">

                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">שם שליח</div>
                    <div className="fhh-details-cell__value">אליהו רוזמן   </div>
                </div>
                <div className="fhh-details-cell">
                    <div className="fhh-details-cell__label">טלפון שליח</div>
                    <div className="fhh-details-cell__value">052-4563645</div>
                </div>
                <div className="fhh-details-cell">

                </div>
            </div>
            <h3 className="fhh-details__subtitle"></h3>
            <div className="fhh-details__tracking"></div>

        </div>
    )
}

export default ParcelDetails;