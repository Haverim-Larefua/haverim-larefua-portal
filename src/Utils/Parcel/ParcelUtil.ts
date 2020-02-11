import Parcel, { ParcelTracking, parcelStatusesValues } from "../../contexts/interfaces/parcels.interface";

export class ParcelUtil {
  //sort parcels by their no property
  static sortParcels(parcels: Parcel[]) {
    return [...parcels.sort((a, b) => a.identity - b.identity)];
  }

  static compareParcelTracking(a: ParcelTracking, b: ParcelTracking): number {
    const aDate = new Date(a.statusDate).getTime();
    const bDate = new Date(b.statusDate).getTime();
    return ( aDate > bDate ? 1 : ((aDate < bDate) ? -1 : 0 ));
  }

  //sort parcelTracking by their updatedDate
  static sortParcelTracking(parcelTracking: ParcelTracking[]) {
    return parcelTracking? parcelTracking.sort(ParcelUtil.compareParcelTracking) : parcelTracking;
  }

  static parcelsEqual(a: Parcel, b: Parcel): boolean {
    return  a.identity === b.identity &&
            JSON.stringify(a.lastUpdateDate) === JSON.stringify(b.lastUpdateDate);
  }

  // merge A with B according to parcel.identity+parcel.lastUpdateDate
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


  static prepareOneParcelForDisplay(parcel: Parcel): Parcel {
    ParcelUtil.sortParcelTracking(parcel.parcelTracking);
    parcel.userName = parcel.user ? parcel.user.firstName + ' ' + parcel.user?.lastName : '';
    parcel.parcelTrackingStatus = ParcelUtil.parcelStatusEnumToUIValue(parcel.parcelTrackingStatus);
    return parcel;
  }

  //TODO: sort tracking by date
  // static prepareParcelsForDisplay(dbParcels: Parcel[]): Parcel[] {
  //   if (dbParcels && dbParcels.length > 0) {
  //     dbParcels.forEach((parcel: Parcel) => {
  //       parcel = ParcelUtil.prepareOneParcelForDisplay(parcel);
  //     })
  //   }
  //   return dbParcels;
  // }

  // parcelTrackingStatus in DB is defined as @IsEnum(['ready', 'delivered', 'distribution', 'exception'])
  // need to translate from DB value to UI valued ans vice versa
  static parcelStatusEnumToUIValue (status : string) {
    switch (status) {
      case 'ready': {
        return parcelStatusesValues.READY;
      }
      case 'delivered': {
        return parcelStatusesValues.DELIVERED;
      }
      case 'distribution': {
        return parcelStatusesValues.DELIVERING;
      }
      case 'exception': {
        return parcelStatusesValues.EXCEPTION;
      }
      default: {
        return parcelStatusesValues.READY;
      }
    }
  }

  static parcelUIStatusValueToEnum (status: string) {
    switch (status) {
      case parcelStatusesValues.READY: {
        return 'ready';
      }
      case parcelStatusesValues.DELIVERING: {
        return 'distribution';
      }
      case parcelStatusesValues.DELIVERED: {
        return 'delivered';
      }
      case parcelStatusesValues.EXCEPTION: {
        return 'exception';
      }
      default: {
        return 'ready';
      }
    }
  }

  static prepareParcelsForDBUpdate(parcels: Parcel[]): Parcel[] {
    if (parcels && parcels.length > 0) {
      return parcels.map((parcel: Parcel) => {
        return ParcelUtil.prepareParcelForDBUpdate(parcel);
      })
    }
    return parcels;
  }

  static prepareParcelForDBUpdate(parcel: Parcel): Parcel {
     const aParcel = {...parcel};
     aParcel.parcelTrackingStatus = ParcelUtil.parcelUIStatusValueToEnum(aParcel.parcelTrackingStatus);
     return aParcel;
  }

}
