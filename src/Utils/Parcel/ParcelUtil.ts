import AppConstants from "../../constants/AppConstants";
import Parcel from "../../models/Parcel";
import ParcelTracking from "../../models/ParcelTracking";
import { CollectionUtil } from "../Common/CollectionsUtil";

export class ParcelUtil {
  //sort parcels by their no property
  static sortParcels(parcels: Parcel[]) {
    return [...parcels.sort((a, b) => a.identity - b.identity)];
  }

  static compareParcelTracking(a: ParcelTracking, b: ParcelTracking): number {
    const aDate = new Date(a.statusDate).getTime();
    const bDate = new Date(b.statusDate).getTime();
    return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
  }

  //sort parcelTracking by their updatedDate
  static sortParcelTracking(parcelTracking: ParcelTracking[]) {
    return parcelTracking ? [...parcelTracking].sort(ParcelUtil.compareParcelTracking) : parcelTracking;
  }

  static parcelsEqual(a: Parcel, b: Parcel): boolean {
    return (
      a.customerId === b.customerId &&
      a.startDate &&
      new Date(a.startDate).toDateString() === new Date(b.startDate).toDateString() &&
      JSON.stringify(a.startTime) === JSON.stringify(b.startTime)
    );
  }

  // merge A with B
  // return array where [0] are the merged parcels, [1] are the added parcels
  static mergeParcels(a: Parcel[], b: Parcel[]): [Parcel[], Parcel[]] {
    if (CollectionUtil.isEmpty(a)) {
      return [b, b];
    }

    if (CollectionUtil.isEmpty(a)) {
      return [a, []];
    }

    let addedParcels: Parcel[] = [];
    let mergedParcels = ParcelUtil.sortParcels([...a]);
    b.forEach((bParcel: Parcel) => {
      if (!mergedParcels.some((aParcel: Parcel) => ParcelUtil.parcelsEqual(bParcel, aParcel))) {
        addedParcels.push(bParcel);
        mergedParcels.push(bParcel);
      }
    });
    return [mergedParcels, addedParcels];
  }

  static getParcelsCitiesDistinct(parcels: Parcel[]): string[] {
    const cities = new Set(parcels.map((parcel) => parcel.city));
    return [...cities].sort();
  }

  static prepareOneParcelForDisplay(parcel: Parcel): Parcel {
    ParcelUtil.sortParcelTracking(parcel.parcelTracking);
    parcel.userName = parcel.user ? parcel.user.firstName + " " + parcel.user?.lastName : "";
    return parcel;
  }

  //TODO: sort tracking by date
  static prepareParcelsForDisplay(dbParcels: Parcel[]): Parcel[] {
    if (dbParcels && dbParcels.length > 0) {
      dbParcels.forEach((parcel: Parcel) => {
        parcel = ParcelUtil.prepareOneParcelForDisplay(parcel);
      });
    }
    return dbParcels;
  }

  // parcelTrackingStatus in DB is defined as @IsEnum(['ready', 'assigned', 'delivered', 'distribution', 'exception'])
  // need to translate from DB value to UI valued ans vice versa
  static parcelStatusEnumToUIValue(status: string) {
    switch (status) {
      case "assigned": {
        return AppConstants.readyStatusName;
      }
      case "delivered": {
        return AppConstants.deliveredStatusName;
      }
      case "distribution": {
        return AppConstants.deliveringStatusName;
      }
      case "exception": {
        return AppConstants.exceptionStatusName;
      }
      default: {
        return AppConstants.readyStatusName;
      }
    }
  }

  static prepareParcelsForDBUpdate(parcels: Parcel[]): Parcel[] {
    if (parcels && parcels.length > 0) {
      return parcels.map((parcel: Parcel) => {
        return ParcelUtil.prepareParcelForDBUpdate(parcel);
      });
    }
    return parcels;
  }

  static prepareParcelForDBUpdate(parcel: Parcel): Parcel {
    return {
      ...parcel,
      parcelTracking: [],
    };
  }
}
