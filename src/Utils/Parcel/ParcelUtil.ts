import Parcel from "../../contexts/interfaces/parcels.interface";

export class ParcelUtil {
  //sort parcels by their no property
  static sortParcels(parcels: Parcel[]) {
    return [...parcels.sort((a, b) => a.no - b.no)];
  }

  static parcelsEqual(a: Parcel, b: Parcel): boolean {
    return a.no === b.no && a.updateDate === b.updateDate;
  }

  static mergeParcels(a: Parcel[], b: Parcel[]): Parcel[] {
    // merge A with B according to parcel.no+parcel.updateDate
    if (a && a.length > 0) {
      if (b && b.length > 0) {
        //merge
        let mergedParcels = ParcelUtil.sortParcels([...a]);
        b.forEach((bParcel: Parcel) => {
          if ( !a.some((aParcel: Parcel) => ParcelUtil.parcelsEqual(bParcel, aParcel))) {
            mergedParcels.push(bParcel);
          }
        });
      } else { // B has not parcels: no parcels added
        return a;
      }
    } else { // A has no parcels at all
      return b;
    }
    return a;
  }
}
