import Parcel from "../../../models/Parcel";
import ParcelTracking from "../../../models/ParcelTracking";
import { DateUtil } from "../../../Utils/Common/DateUtil";

export class WidgetsService {
    public getParcelsByDateDelivered(parcels: Parcel[], day: number) {
        return parcels.filter((p) => {
          const tracking: ParcelTracking[] = p.parcelTracking;
          return (
            tracking.filter((t) => t.status === "delivered" && DateUtil.getDate2DigitsFormatFromDate(t.statusDate) === DateUtil.getDate2DigitsFormatFromNumber(day))
              .length > 0
          );
        });
      }
}

const widgetsService = new WidgetsService();

export default widgetsService;
