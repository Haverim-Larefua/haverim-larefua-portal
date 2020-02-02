import { IActionBase, loadUsers } from "../actions/users.action";
import Parcel from "./parcels.interface";
import AppConstants from "../../constants/AppConstants";


export const delivaryDaysValues = Object.freeze({
  ALL_WEEK: AppConstants.allWeek,
  SUNDAY: AppConstants.sunday,
  MONDAY: AppConstants.monday,
  TEUSDAY: AppConstants.teusday,
  WEDNESDAY: AppConstants.wednesday,
  THURSDAY: AppConstants.thursday,
  FRIDAY: AppConstants.friday,
});

export const defaultUserExplained = {
  users: [], 
  action: loadUsers([])
}

export class UserExplained {
  users: User[]; // current in-memory users 
  action: IActionBase; // last action performed on in-memory users that needs to be performed on DB as well

  constructor(users: User[], action: IActionBase) {
    this.users = [...users];
    this.action = action;
  }
}

export default class User {
  id: number | undefined;
  firstName: string; 
  lastName: string; 
  address: string;
  deliveryArea: string; 
  deliveryDays: string;  // delivaryDaysValues
  phone: string; 
  notes: string; 
  role: string; // DB: role_fk maybe a number or enum
  parcels: Parcel[] = [];

  constructor(firstName: string, lastName: string, address: string, deliveryArea: string,
              deliveryDays: string, phone: string, notes: string, role: string ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.deliveryArea = deliveryArea;
    this.deliveryDays = deliveryDays;
    this.notes = notes;
    this.role = role;
    this.phone = phone;
  }
}

