import React, { useContext, useState, useEffect } from "react";
import './UsersList.scss';
import { userContext } from "../../../contexts/userContext";
import createInitials from '../../../Utils/User/InitialsCreator';
import UserListItem from './UserListItem';

const UsersList = (props) => {
  const [userExtendedData] = useContext(userContext);
  const [options, setOptions] = useState([]);

  const [searchInputTerm, setSearchInputTerm] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [selectedUser, setSelectedUser] = useState();

  function initializeUserList() {
    setUsersList(userExtendedData.users);
  }

  function createUsersUIList() {
    const opts = [];
    usersList.forEach(user => {
      const initials = createInitials(user.firstName, user.lastName)
      opts.push({ value: user.id, initials: `${initials}`, label: `${user.firstName}  ${user.lastName}`, initialsColors: initialsColors()});
    })
    setOptions(opts);
  }

  function searchUsersList() {
    if (searchInputTerm && searchInputTerm !== '') {
      if (usersList && usersList.length > 0) {
        const filteredList = usersList.filter(user => {
          const flName = user.firstName + user.lastName;
          const lfName = user.lastName + user.firstName;
          const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
          return flName.includes(searchInputTerm) ||
            lfName.includes(searchInputTerm) ||
            initials.includes(searchInputTerm);
        });
        setUsersList(filteredList);
      }
    } else {
      initializeUserList();
    }
  }

  useEffect(() => {
    setUsersList(userExtendedData.users);
  }, [userExtendedData]);

  useEffect(() => {
    createUsersUIList();
  }, [usersList]);

  useEffect(() => {
    searchUsersList();
  }, [searchInputTerm])

  const onUserCicked = e => {
    props.updateSelectedUser(e.currentTarget.id);
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

  return (
    <div className="ffh-userlist">
      <div className="ffh-userlist__head">
        <div className="ffh-userlist__title">שיוך לשליח</div>
        <div className="ffh-userlist__search">
          <input className="ffh-userlist__search-input" type="text" placeholder="חיפוש"
            onChange={handleChange} />
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

export default UsersList;