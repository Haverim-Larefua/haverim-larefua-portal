import { IActionBase, loadParcels } from "../actions/parcels.action";
import AppConstants from "../../constants/AppConstants";
import Parcel from "../../models/Parcel";

export const parcelStatusesValues = Object.freeze({
  READY: AppConstants.readyStatusName,
  DELIVERING: AppConstants.deliveringStatusName,
  EXCEPTION: AppConstants.exceptionStatusName,
  DELIVERED: AppConstants.deliveredStatusName
});
export interface ISearchParcelsParams {
  statusFilter: string,
  cityFilter: string,
  nameFilter: string
}

export const defaultParcelsState: ParcelState = {
  parcels: [],
  action: loadParcels([]),
  searchParams: { statusFilter: AppConstants.readyStatusName, cityFilter: "", nameFilter: "" },
  cities: [],
  error: null,
  searching: true
};

export class ParcelState {
  parcels: Parcel[] = []; // current in-memory parcels
  action: IActionBase; // last action performed on in-memory parcels that needs to be performed on DB as well
  searchParams: ISearchParcelsParams = { statusFilter: "", cityFilter: "", nameFilter: "" };
  cities: string[] = []; // all (distinct) cities declared in all parcels (in DB)
  error?: any;
  searching: boolean

  constructor(parcels: Parcel[], action: IActionBase, cities: string[]) {
    this.parcels = [...parcels];
    this.action = action;
    this.cities = cities;
  }
}

  startDate: Date;
  startTime: Date;
    signature: string,
    startDate: Date,
    startTime: Date,
    this.startDate = startDate;
    this.startTime = startTime;
