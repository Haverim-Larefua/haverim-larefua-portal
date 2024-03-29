import AppConstants from "../../constants/AppConstants";
import User from "../../models/User";

export class UserUtil {

  //sort parcels by their no property
  static sortUsers(users: User[]) {
    return [...users.sort((a, b) =>
      (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName))];
  }

  static usersEqual(a: User, b: User): boolean {
    return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName) === 0;
  }

  static getUsersAreasDistinct(users: User[]): string[] {
    let areas: string[] = [];
    const usersDeliveryAreas = users? [...new Set(users.flatMap(user => user.cities.map(da => da.name)))] : [];
    usersDeliveryAreas.forEach(deliveryArea => {
      if (!areas.includes(deliveryArea)) {
        areas.push(deliveryArea);
      }
    });
    return areas;
  }

  static sortString(str: string) {
    var arr = str.replace(/ /g, '').split(',');
    var sorted = arr.sort();
    return sorted.join(',');
  }

  static prepareOneUserForDisplay(user: User): User {
    const sortedDays = UserUtil.sortString(user.deliveryDays);
    if (sortedDays.includes("1,2,3,4,5,6")) {
      user.deliveryDays = AppConstants.allWeek;
    } else {
      const mapObj = ["", "א", "ב", "ג", "ד", "ה", "ו"];
      user.deliveryDays = sortedDays.replace(/1|2|3|4|5|6/gi, function (matched) {
        return mapObj[parseInt(matched)];
      });
      if (!user.notes) {
        user.notes = '';
      }
    }
    return user;
  }

  static prepareUsersForDisplay(users: User[]): User[] {
    if (users && users.length > 0) {
      users.forEach((user: User) => {
        UserUtil.prepareOneUserForDisplay(user);
      })
    }
    return users;
  }

  static prepareOneUserForDBUpdate(user: User): User {
    let dbUser: User = Object.assign({}, user);
    if (dbUser.deliveryDays.includes(AppConstants.allWeek)) {
      dbUser.deliveryDays = "1,2,3,4,5,6";
    } else {
      const mapObj = ["1", "2", "3", "4", "5", "6"];
      const startAt = "א".charCodeAt(0);
      dbUser.deliveryDays = dbUser.deliveryDays.replace(/א|ב|ג|ד|ה|ו/gi, function (matched) {
        const indx = matched.charCodeAt(0) - startAt;
        return mapObj[indx];
      });
    }
    return dbUser;
  }

  static prepareUsersForDBUpdate(users: User[]): User[] {
    if (users && users.length > 0) {
      users.forEach((user: User) => {
        UserUtil.prepareOneUserForDBUpdate(user);
      })
    }
    return users;
  }

  static lastUserNumber(users: User[]): number {
    const tmpUsers = users.filter(usr => usr.username.startsWith('haver'));
    const usrNumbers = tmpUsers ? tmpUsers.map(usr => Number(usr.username.substr(5))) : [];
    const sortedNumbers = usrNumbers.filter(n => !Number.isNaN(n)).sort((a, b) => b - a);
    return sortedNumbers && sortedNumbers.length > 0 ? sortedNumbers[0] : 0;
  }
}