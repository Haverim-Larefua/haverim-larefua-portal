import React, { useContext, useState, useEffect, Fragment } from "react";
import './UsersList.scss';
import { userContext } from "../../contexts/userContext";
import UserListItem from './UserListItem';

const UsersList = (props) => {
    const [userExtendedData] = useContext(userContext);
    const [options, setOptions] = useState([]);

    const [searchInputTerm, setSearchInputTerm] = useState("");
    const [usersList, setUsersList] = useState([]);

    function initializeUserList() {
      setUsersList(userExtendedData.users);
    }

    function createUsersUIList() {
      const opts = [];
      usersList.forEach(user => {
        const initials = user.firstName.charAt(0)+ user.lastName.charAt(0);
        opts.push({value: user.id, initials: `${initials}`, label: `${user.firstName}  ${user.lastName}`});
      })
      setOptions(opts);
    }

    function searchUsersList() {
      if (searchInputTerm && searchInputTerm != '') {
        if (usersList && usersList.length > 0) {
          const filteredList = usersList.filter(user => {
            const flName = user.firstName+user.lastName;
            const lfName = user.lastName+user.firstName;
            const initials = user.firstName.charAt(0)+ user.lastName.charAt(0);
            return  flName.includes(searchInputTerm) || 
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
      console.log(`[UsersList] onUserCicked`, e, e.id);
      props.updateSelectedUser(e.target.id);
    };

    const handleChange = (e) => {
      setSearchInputTerm(e.target.value);
    };

    return (
      <Fragment>
        <div className="search">
            <input className="search-input" type="text" placeholder="חיפוש"
                onChange={handleChange}/>
        </div>
        <ul className='users_list'>
          {options.map((item, i) => {
            return (
              <UserListItem key={i} 
                identifier={item.value} 
                initials={item.initials} 
                label={item.label}
                onUserCicked={onUserCicked} /> 
            );
          })}
        </ul>
      </Fragment>
    );
}
 
export default UsersList;