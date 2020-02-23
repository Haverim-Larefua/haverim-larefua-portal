import { loadUsers, UserActions } from "../actions/users.action";
import Parcel from "./parcels.interface";

export const defaultUserExtendedData: UserExtendedData = {
  users: [],
  action: loadUsers([]),
  deliveryAreas: []
};

export class UserExtendedData {
  users: User[] = []; // current in-memory users
  action: UserActions; // last action performed on in-memory users that needs to be performed on DB as well
  deliveryAreas: string[] = []; // lis of all delivery areas (distinct) from all users (in DB)

  constructor(users: User[], action: UserActions, deliveryAreas: string[]) {
    this.users = [...users];
    this.action = action;
    this.deliveryAreas = deliveryAreas;
  }
}

export default class User {
  id: number | undefined;
  firstName: string;
  lastName: string;
  address: string;
  deliveryArea: string;
  deliveryDays: string; 
  phone: string;
  notes: string;
  role: string; // DB: role_fk maybe a number or enum
  parcels: Parcel[] = [];

  constructor(firstName: string,lastName: string,address: string, deliveryArea: string,
              deliveryDays: string, phone: string, notes: string, role: string) {
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
