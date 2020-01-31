import httpService from '../services/http';
import Configuration from '../configuration/Configuration';
import User from '../contexts/interfaces/users.interface';

class UserHttpService {

  private config: Configuration;

  constructor() {
    this.config = new Configuration();
  }

//////////////////////////////////// Users ////////////////////////////////////

async getUsers() {
    try {
      const response = await httpService.get(`${this.config.USERS_POSTFIX}`);
      return response.data;
    } catch (error) {
        console.error('[HttpService] getUsers: could not retreive users ', error);
    }
}

async createUser(aUser: User) {
  const response = await httpService.create(`${this.config.USERS_POSTFIX}`, aUser);
  return response.data;
}

async addUsers(users: User[]) {
    const response =  await httpService.add(`${this.config.USERS_POSTFIX}`, users);
    return response;
}

async updateUser(aUser: User) {
  const response = await httpService.update(this.config.USERS_POSTFIX, aUser.id, aUser);
  return response.data;
}

async deleteUser(aUser: User) {
  const response = await httpService.delete(this.config.USERS_POSTFIX, aUser.id);
  return response.data;
}


// TODO: this should be a query in DB
async searchUsers(dayFilterTerm: string, cityFilterTerm: string, nameSearchTerm: string)  {
    let users = await this.getUsers();

    if ( users && users.length > 0 && nameSearchTerm && nameSearchTerm !== "") {
      const searchTerm = nameSearchTerm.trim().toLowerCase();
      users = users.filter((item: User) =>
          ((item.firstName && item.firstName.toLowerCase().indexOf(searchTerm) !== -1) ||
          (item.lastName && item.lastName.toLowerCase().indexOf(searchTerm) !== -1))
      );
    }

    if ( users && users.length > 0 && cityFilterTerm && cityFilterTerm !== "" ) {
      const searchTerm = cityFilterTerm.trim().toLowerCase();
      users = users.filter((item: User) => item.deliveryArea === searchTerm);
    }

    if ( users && users.length > 0 && dayFilterTerm &&  dayFilterTerm !== "") {
      const searchTerm = dayFilterTerm.trim().toLowerCase();
      users = users.filter((item: User) => 
        ((item.deliveryDays.indexOf(searchTerm) !== -1) || 
        (item.deliveryDays.indexOf('כל השבוע') !== -1)))
    }

    return users;
  }
}
  
const userHttpService = new UserHttpService();

export default userHttpService;
