import { IActionBase, noChangeToUser } from "../actions/users.action";


export const defaultUserExplained = {
  users: [], 
  action: noChangeToUser('')
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
  deliveryDays: string;
  phones: [];
  comments: string;
  role: string; // maybe a number or enum

  constructor(firstName: string, lastName: string, address: string, deliveryArea: string,
              deliveryDays: string, phones: [], comments: string, role: string ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.deliveryArea = deliveryArea;
    this.deliveryDays = deliveryDays;
    this.comments = comments;
    this.role = role;
    this.phones = Object.assign([], phones);
  }
}

