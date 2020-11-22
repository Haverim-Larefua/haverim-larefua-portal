import User from "../../models/User";
import { loadUsers, UserActions } from "../actions/users.action";

export interface ISearchUsersParams {
  dayFilter: string,
  cityFilter: string,
  nameFilter: string
}

export const defaultUserState: UserState = {
  users: [],
  action: loadUsers([]),
  searchParams: { dayFilter: "", cityFilter: "", nameFilter: "" },
  deliveryAreas: []
};

export class UserState {
  users: User[] = []; // current in-memory users
  action: UserActions; // last action performed on in-memory users that needs to be performed on DB as well
  searchParams: ISearchUsersParams = { dayFilter: "", cityFilter: "", nameFilter: "" };
  deliveryAreas: string[] = []; // lis of all delivery areas (distinct) from all users (in DB)

  constructor(users: User[], action: UserActions, deliveryAreas: string[]) {
    this.users = [...users];
    this.action = action;
    this.deliveryAreas = deliveryAreas;
  }
}

