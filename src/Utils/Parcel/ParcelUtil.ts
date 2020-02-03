import Parcel, { ParcelTracking } from "../../contexts/interfaces/parcels.interface";
import AppConstants from "../../constants/AppConstants";

export class ParcelUtil {
  //sort parcels by their no property
  static sortParcels(parcels: Parcel[]) {
    return [...parcels.sort((a, b) => a.no - b.no)];
  }

  static compareParcelTracking(a: ParcelTracking, b: ParcelTracking): number {
    return (
      a.updateDate.getTime() > b.updateDate.getTime() 
      ? 1
      : (a.updateDate.getTime() < b.updateDate.getTime()) 
        ? -1
        : 0
    )
  }

  //sort parcelTracking by their updatedDate
  static sortParcelTracking(parcelTracking: ParcelTracking[]) {
    return parcelTracking? parcelTracking.sort(ParcelUtil.compareParcelTracking) : parcelTracking;
  }

  static parcelsEqual(a: Parcel, b: Parcel): boolean {
    return  a.no === b.no && 
            JSON.stringify(a.updateDate) === JSON.stringify(b.updateDate);
  }

  // merge A with B according to parcel.no+parcel.updateDate
  // return array where [0] are the merged parcels, [1] are the added parcels
  static mergeParcels(a: Parcel[], b: Parcel[]): [Parcel[], Parcel[]] {
    if (a && a.length > 0) {
      if (b && b.length > 0) {
        //merge
        let addedParcels: Parcel[] = [];
        let mergedParcels = ParcelUtil.sortParcels([...a]);
        b.forEach((bParcel: Parcel) => {
          if ( !mergedParcels.some((aParcel: Parcel) => ParcelUtil.parcelsEqual(bParcel, aParcel))) {
            addedParcels.push(bParcel);
            mergedParcels.push(bParcel);
          }
        });
        return [mergedParcels, addedParcels];
      } else { // B has no parcels: no parcels added
        return [a, []];
      }
    } else { // A has no parcels at all
      return [b, b];
    }
  }

  static getParcelsCitiesDistinct(parcels : Parcel[]): string[]{
    let areas: string[] = [];
    if (parcels &&  parcels.length > 0 ) {
      parcels.forEach(item => {
        if (!areas.includes(item.city)) {
          areas.push(item.city);
        }
      });
    }
    return areas;
  }

  //TODO: sort tracking by date
  static createParcelsDisplay(dbParcels: Parcel[]): Parcel[] {
    if (dbParcels && dbParcels.length > 0) {
    dbParcels.forEach((parcel: Parcel) => {
      ParcelUtil.sortParcelTracking(parcel.parcelTracking);
      parcel.userName = parcel.user?.firstName + ' ' + parcel.user?.lastName;
      parcel.status = 
        (parcel.parcelTracking && parcel.parcelTracking.length > 0) 
            ? parcel.parcelTracking[0].status 
            : AppConstants.readyStatusName;
    })
    }
    return dbParcels;
  }
}
