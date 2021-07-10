import React, {useState, useEffect, useMemo, useContext} from "react";
import './UsersList.scss';
import createInitials from '../../../Utils/User/InitialsCreator';
import SelectFilter from '../../shared/SelectFilter/SelectFilter';
import UserListItem from './UserListItem';
import AppConstants from "../../../constants/AppConstants";
import { connect } from "react-redux";
import * as userActions from "../../../redux/states/user/actions";

import User from "../../../models/User";
import SearchUsersParams from "../../../models/SearchUsersParams";
import { AppState } from "../../../redux/rootReducer";
import { debounce } from "lodash";
import AreaSelect from "../UserForm/AreaSelect/AreaSelect";
import {citiesContext} from "../../../contexts/citiesContext";

export interface UsersListProps {
  updateSelectedUser: (userId: number) => void;
  filteredUsers: User[];
  searchUsers: (searchParams: SearchUsersParams) => void;
  initUserId: number;

}
const UsersList = ({ updateSelectedUser, filteredUsers, searchUsers, initUserId = 0 }: UsersListProps) => {
  const districts = useContext(citiesContext);
  const [searchInputTerm, setSearchInputTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(initUserId);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);


  const filteredUsersUiFormat = useMemo(() => {
    const initialsColors = () => {
      const num = Math.floor(Math.random() * 4) + 1;
      console.log('COLOR SCHEME: ', num)
      return `color-${num}`
    }
    return filteredUsers.filter(user => user.active)
      .map(user => {
        const initials = createInitials(user.firstName, user.lastName)
        return { value: user.id, initials: `${initials}`, label: `${user.firstName}  ${user.lastName}`, deliveryDays: user.deliveryDays, initialsColors: initialsColors() };
      })
  }
    , [filteredUsers]);

  useEffect(() => {
    searchUsers({ dayFilter: selectedDay, nameFilter: searchInputTerm, cityFilter: selectedCities });
  }, [searchInputTerm, searchUsers, selectedCities, selectedDay])

  const onUserClicked = (userId: number) => {
    updateSelectedUser(userId);
    setSelectedUser(userId);
  };

  const handleSearch = debounce(value => {
    setSearchInputTerm(value);
  }, AppConstants.searchDebounceTime);

  return (
    <div className="ffh-userlist">
      <div className="ffh-userlist__head">
        <div className="ffh-userlist__title">{initUserId ? AppConstants.changeParcelUser : AppConstants.associateParcelToUserUIName}</div>
        <div className="ffh-userlist__control">
          <div className="ffh-userlist__filter cities-filter">
            <div className="ffh-userlist__filter-label">{AppConstants.deliveryAreas}</div>
            <AreaSelect districts={districts} onSave={setSelectedCities}/>
          </div>
          <div className="ffh-userlist__filter days-filter">
            <div className="ffh-userlist__filter-label">{AppConstants.deliveryDays}</div>
            <SelectFilter onSelect={setSelectedDay} items={AppConstants.daysOptions} hideFilter showOptionAll />
          </div>
          <div className="ffh-userlist__search name-filter">
            <input className="ffh-userlist__search-input" type="text" placeholder={AppConstants.searchUIName}
              onChange={e => handleSearch(e.target.value)} />
          </div>

        </div>
      </div>
      <ul className='ffh-userlist__items'>
        {filteredUsersUiFormat.map((item, i) => {
          return (
            <UserListItem key={i}
              identifier={item.value}
              initials={item.initials}
              initialsColors={item.initialsColors}
              label={item.label}
              selected={item.value === selectedUser}
              onUserClicked={onUserClicked} />
          );
        })}
      </ul>
    </div>
  );
}

const mapDispatchToProps = {
  searchUsers: userActions.searchUsers
}

const mapStateToProps = (appState: AppState) => {
  return {
    filteredUsers: appState.user.filteredUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
