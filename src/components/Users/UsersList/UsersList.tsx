import React, { useState, useEffect, useMemo } from "react";
import './UsersList.scss';
import createInitials from '../../../Utils/User/InitialsCreator';
import SelectFilter from '../../shared/SelectFilter/SelectFilter';
import UserListItem from './UserListItem';
import AppConstants from "../../../constants/AppConstants";
import Option from "../../../models/Option";
import {connect} from "react-redux";
import * as userActions from "../../../redux/states/user/actions";

import User from "../../../models/User";
import SerachUsersParams from "../../../models/SerachUsersParams";
import { AppState } from "../../../redux/rootReducer";

export interface UsersListProps {
  updateSelectedUser: (userId: number) => void;
  filteredUsers: User[];
  searchUsers: (searchParams: SerachUsersParams) => void;
  deliveryAreas: string[];

}
const UsersList = ({updateSelectedUser, filteredUsers, deliveryAreas, searchUsers} : UsersListProps) => {
  const [searchInputTerm, setSearchInputTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

 
  const filteredUsersUiFormat = useMemo(() => {
    const initialsColors = () => {
      const num = Math.floor(Math.random() * 4) + 1;
      console.log('COLOR SCHEME: ', num)
      return `color-${num}`
    }
      return filteredUsers.filter(user=>user.active)
        .map(user => {
          const initials = createInitials(user.firstName, user.lastName)
          return { value: user.id, initials: `${initials}`, label: `${user.firstName}  ${user.lastName}`, deliveryDays: user.deliveryDays, initialsColors: initialsColors() };
        })
    }
  , [filteredUsers]);

  useEffect(() => {
    searchUsers({dayFilter: selectedDay, nameFilter: searchInputTerm, cityFilter: selectedCity});
  }, [searchInputTerm, searchUsers, selectedCity, selectedDay])

  const onUserCicked = (userId: number) => {
    updateSelectedUser(userId);
    setSelectedUser(userId);
  };

  return (
    <div className="ffh-userlist">
      <div className="ffh-userlist__head">
        <div className="ffh-userlist__title">{AppConstants.associateParcelToUserUIName}</div>
        <div className="ffh-userlist__control">
        <div className="ffh-userlist__filter">
          <div className="ffh-userlist__filter-label">{AppConstants.deliveryArea}</div>
          <SelectFilter onSelect={setSelectedCity} items={deliveryAreas.map(city => new Option(city, city))} showOptionAll/>
        </div>
        <div className="ffh-userlist__filter">
          <div className="ffh-userlist__filter-label">{AppConstants.deliveryDays}</div>
          <SelectFilter onSelect={setSelectedDay} items={AppConstants.daysOptions} hideFilter showOptionAll/>
        </div>
        <div className="ffh-userlist__search">
          <input className="ffh-userlist__search-input" type="text" placeholder={AppConstants.searchUIName}
            onChange={e =>  setSearchInputTerm(e.target.value)} />
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
              onUserCicked={onUserCicked} />
          );
        })}
      </ul>
    </div>
  );
}

const mapDispatchToProps = {
  searchUsers : userActions.searchUsers
}

const mapStateToProps =(appState: AppState) => {
  return {
    filteredUsers: appState.user.filteredUsers,
    deliveryAreas: appState.user.deliveryAreas
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
