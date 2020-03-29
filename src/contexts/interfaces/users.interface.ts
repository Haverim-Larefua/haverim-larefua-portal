import { loadUsers, UserActions } from "../actions/users.action";
import Parcel from "./parcels.interface";

export interface ISearchUsersParams {
  dayFilter: string,
  cityFilter: string,
  nameFilter: string
}

export const defaultUserExtendedData: UserExtendedData = {
  users: [],
  action: loadUsers([]),
  searchParams: {dayFilter: "", cityFilter: "", nameFilter: ""},
  deliveryAreas: []
};

export class UserExtendedData {
  users: User[] = []; // current in-memory users
  action: UserActions; // last action performed on in-memory users that needs to be performed on DB as well
  searchParams: ISearchUsersParams = {dayFilter: "", cityFilter: "", nameFilter: ""};
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
  username: string;
  password: string;
  parcels: Parcel[] = [];

  constructor(firstName: string,lastName: string,address: string, deliveryArea: string,
              deliveryDays: string, phone: string, notes: string, userName: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.deliveryArea = deliveryArea;
    this.deliveryDays = deliveryDays;
    this.notes = notes;
    this.username = userName;
    this.password = password;
    this.phone = phone;
  }
}
