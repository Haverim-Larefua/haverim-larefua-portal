import { IActionBase, noChangeToParcel } from "../actions/parcels.action";

/*
export enum parcelStatus {
  None = 0,
  Create = 1,
  Edit = 2
}
*/

export const defaultParcelExplained = {
  parcels: [], 
  action: noChangeToParcel('')
}

export class ParcelExplained {
  parcels: Parcel[]; // current in-memory parcels 
  action: IActionBase; // last action performed on in-memory parcels that needs to be performed on DB as well

  constructor(parcels: Parcel[], action: IActionBase) {
    this.parcels = [...parcels];
    this.action = action;
  }
}

export default class Parcel {
  id: number | undefined;
  name: string;
  address: string;
  city: string;
  phones: [];
  comments: string;
  status: string; // should be enum
  signature: string; // base64
  updateDate: Date;

  constructor(name: string, address: string, city: string, 
              phones: [], comments: string, status: string, 
              updateDate: Date, signature: string) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.comments = comments;
    this.status = status;
    this.signature = signature;
    this.updateDate = updateDate;
    this.phones = Object.assign([], phones);
  }
}
