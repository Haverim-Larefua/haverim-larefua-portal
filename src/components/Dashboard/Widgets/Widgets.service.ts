import Parcel from "../../../models/Parcel";
import ParcelTracking from "../../../models/ParcelTracking";

export class WidgetsService {
    public getParcelsByDateDelivered(parcels: Parcel[], day: number) {
        return parcels.filter((p) => {
          const tracking: ParcelTracking[] = p.parcelTracking;
          return (
            tracking.filter((t) => t.status === "delivered" && new Date(t.statusDate).getDate() === new Date(day).getDate())
              .length > 0
          );
        });
      }
}

const widgetsService = new WidgetsService();

export default widgetsService;
