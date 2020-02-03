import User from "../../contexts/interfaces/users.interface";

export class UserUtil {
    
  //sort parcels by their no property
  static sortUsers(users: User[]) {
    return [...users.sort((a, b) => 
        (a.firstName+a.lastName).localeCompare(b.firstName+b.lastName))];
  }

  static usersEqual(a: User, b: User): boolean {
    return (a.firstName+a.lastName).localeCompare(b.firstName+b.lastName)===0;
  }

  static getUsersAreasDistinct(users : User[]): string[]{
    let areas: string[] = [];
    if (users &&  users.length > 0 ) {
      users.forEach(item => {
        if (!areas.includes(item.deliveryArea)) {
          areas.push(item.deliveryArea);
        }
      });
    }
    return areas;
  }
}