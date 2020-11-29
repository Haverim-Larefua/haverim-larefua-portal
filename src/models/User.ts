import Parcel from "./Parcel";

export default class User {
  id: number;
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
  active: boolean;

  constructor(
    firstName: string,
    lastName: string,
    address: string,
    deliveryArea: string,
    deliveryDays: string,
    phone: string,
    notes: string,
    userName: string,
    password: string
  ) {
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
