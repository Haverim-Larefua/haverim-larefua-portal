import React, { useState, useEffect } from "react";
import './UsersList.scss';
import createInitials from '../../../Utils/User/InitialsCreator';
import SelectFilter from '../../shared/SelectFilter/SelectFilter';
import UserListItem from './UserListItem';
import AppConstants, { delivaryDaysToInitials } from "../../../constants/AppConstants";
import Option from "../../../models/Option";
import {connect} from "react-redux";

const UsersList = ({users, updateSelectedUser}) => {
  const [options, setOptions] = useState([]);
  const [searchInputTerm, setSearchInputTerm] = useState("");
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    function createUsersUIList() {
      const opts = [];
      filteredUsersList.forEach(user => {
        const initials = createInitials(user.firstName, user.lastName)
        opts.push({ value: user.id, initials: `${initials}`, label: `${user.firstName}  ${user.lastName}`, deliveryDays: user.deliveryDays, initialsColors: initialsColors() });
      })
      setOptions(opts);
    }

    createUsersUIList();
  }, [filteredUsersList]);

  useEffect(() => {
    function searchUsersList() {
      if (searchInputTerm && searchInputTerm !== '') {
        if (users?.length > 0) {
          const filteredList = users.filter(user => {
            const flName = user.firstName + user.lastName;
            const lfName = user.lastName + user.firstName;
            const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
            return flName.includes(searchInputTerm) ||
              lfName.includes(searchInputTerm) ||
              initials.includes(searchInputTerm);
          });
          setFilteredUsersList(filteredList);
        }
      } else {
        setFilteredUsersList(users);
      }
    }
    
    searchUsersList();
  }, [searchInputTerm, users])

  const onUserCicked = e => {
    updateSelectedUser(e.currentTarget.id);
    setSelectedUser(e.currentTarget.id);
  };

  const handleChange = (e) => {
    setSearchInputTerm(e.target.value);
  };

  const initialsColors = () => {
    const num = Math.floor(Math.random() * 4) + 1;
    console.log('COLOR SCHEME: ', num)
    return `color-${num}`
  }

  const days = Array.from(delivaryDaysToInitials.values());

  const handleSelection = (day) => {
    const filteredUsersList = users.filter((user) => {
      return user.deliveryDays.includes(day);
    });
    setFilteredUsersList(filteredUsersList);
  }

  return (
    <div className="ffh-userlist">
      <div className="ffh-userlist__head">
        <div className="ffh-userlist__title">{AppConstants.associateParcelToUserUIName}</div>
        <div className="ffh-userlist__control">
          <div className="ffh-userlist__search">
            <input className="ffh-userlist__search-input" type="text" placeholder={AppConstants.searchUIName}
              onChange={handleChange} />
          </div>
          <div className="ffh-userlist__filter">
            <div className="ffh-userlist__filter-label">{AppConstants.deliveryDays}</div>
            <SelectFilter onSelect={handleSelection} items={days.map(day => new Option(day, day))} hideFilter showOptionAll/>
          </div>
        </div>
      </div>
      <ul className='ffh-userlist__items'>
        {options.map((item, i) => {
          return (
            <UserListItem key={i}
              identifier={item.value}
              initials={item.initials}
              initialsColors={item.initialsColors}
              label={item.label}
              selected={item.value === parseInt(selectedUser)}
              showUserDetails={selectedUser}
              onUserCicked={onUserCicked} />
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps =(appState) => {
  return {
    users: appState.user.users,
  }
}

export default connect(mapStateToProps)(UsersList);
