import { IActionBase, loadParcels } from "../actions/parcels.action";
import User from "./users.interface";

/*
export enum parcelStatus {
  None = 0,
  Create = 1,
  Edit = 2
}
*/

export class ParcelTracking {
  updateDate: Date | undefined = undefined;
  status: string = '';
  userId: number | undefined = undefined; 
  user: User | undefined = undefined;
  comments: string = '';
  signature: string = ''; // base 64 of an image
}

export const defaultParcelExplained = {
  parcels: [], 
  action: loadParcels([])
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
  no: number;  // identification of customer
  customerName: string; // DB: customer name
  address: string;
  city: string;
  phone: string; 
  comments: string;
  status: string; // should be enum - no status in DB - only in tracking
  signature: string; // base64
  updateDate: Date; 
  userId: number | undefined; 
  user: User | undefined;
  parcelTracking: ParcelTracking[] = [];

  constructor(no: number, customerName: string, address: string, city: string, 
              phone: string, comments: string, status: string, 
              updateDate: Date, signature: string) {
    this.no = no;
    this.customerName = customerName;
    this.address = address;
    this.city = city;
    this.comments = comments;
    this.status = status;
    this.signature = signature;
    this.updateDate = updateDate;
    this.phone = phone;
  }
}
