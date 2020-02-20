import User from "../../contexts/interfaces/users.interface";
import AppConstants from "../../constants/AppConstants";

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

  static prepareOneUserForDisplay(user: User): User {
    if (user.deliveryDays.includes("1,2,3,4,5,6")) {
      user.deliveryDays = AppConstants.allWeek;
    } else {
      const mapObj = ["", "א", "ב", "ג", "ד", "ה", "ו"];
      user.deliveryDays = user.deliveryDays.replace(/1|2|3|4|5|6/gi, function(matched){
        return mapObj[parseInt(matched)];
      });
      if (!user.notes) {
        user.notes  = '';
      }
    }
    return user;
  }

  static prepareUsersForDisplay(users: User[]): User[] {
    if (users && users.length > 0) {
      users.forEach((user: User) => {
        user = UserUtil.prepareOneUserForDisplay(user);
      })
    }
    return users;
  }

  static prepareOneUserForDBUpdate(user: User): User {
    if (user.deliveryDays.includes("א,ב,ג,ד,ה,ו") ) {
      user.deliveryDays = AppConstants.allWeek;
    } else {
      const mapObj = ["1", "2", "3", "4", "5", "6"];
      const startAt = "א".charCodeAt(0);
      user.deliveryDays = user.deliveryDays.replace(/א|ב|ג|ד|ה|ו/gi, function(matched){
        const indx = matched.charCodeAt(0) - startAt;
        return mapObj[indx];
      });
    }
    return user;
  }

  static prepareUsersForDBUpdate(users: User[]): User[] {
    if (users && users.length > 0) {
      users.forEach((user: User) => {
        user = UserUtil.prepareOneUserForDBUpdate(user);
      })
    }
    return users;
  }
}