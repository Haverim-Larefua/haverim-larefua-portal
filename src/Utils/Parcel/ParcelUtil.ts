import Parcel from "../../contexts/interfaces/parcels.interface";

export class ParcelUtil {
  //sort parcels by their no property
  static sortParcels(parcels: Parcel[]) {
    return [...parcels.sort((a, b) => a.no - b.no)];
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
}
