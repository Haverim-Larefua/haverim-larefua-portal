import { IActionBase, loadParcels } from "../actions/parcels.action";
import User from "./users.interface";
import AppConstants from "../../constants/AppConstants";

export const parcelStatusesValues = Object.freeze({
  READY: AppConstants.readyStatusName,
  DELIVERING: AppConstants.deliveringStatusName,
  EXCEPTION: AppConstants.exceptionStatusName,
  DELIVERED: AppConstants.deliveredStatusName
});

export class ParcelTracking {
  statusDate: Date = new Date();
  status: string = ""; //parcelStatusesValues
  userId: number | undefined = undefined;
  user: User | undefined = undefined;
  comments: string = "";
  signature: string = ""; // base 64 of an image
}

export const defaultparcelExtendedData = {
  parcels: [],
  action: loadParcels([]),
  cities: []
};

export class ParcelExtendedData {
  parcels: Parcel[] = []; // current in-memory parcels
  action: IActionBase; // last action performed on in-memory parcels that needs to be performed on DB as well
  cities: string[] = [] // all (distinct) cities declared in all parcels (in DB)

  constructor(parcels: Parcel[], action: IActionBase, cities: string[]) {
    this.parcels = [...parcels];
    this.action = action;
    this.cities = cities;
  }
}

export default class Parcel {
  id: number | undefined;
  no: number; // identification of customer
  customerName: string; // DB: customer name
  address: string;
  city: string;
  phone: string;
  comments: string;
  status: string; // parcelStatusesValues
  signature: string; // base64
  updateDate: Date;
  userId: number | undefined;
  user: User | undefined;
  userName: string | undefined;
  parcelTracking: ParcelTracking[] = [];

  constructor(
    no: number,
    customerName: string,
    address: string,
    city: string,
    phone: string,
    comments: string,
    status: string,
    updateDate: Date,
    signature: string
  ) {
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
