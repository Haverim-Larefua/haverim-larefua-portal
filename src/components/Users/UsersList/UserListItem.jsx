import React from "react";
import UserDetails from '../UserDetails/UserDetails'
import './UserListItem.scss';

const UserListItem = (props) => {
    return (
        <li className={`ffh-userlist-item ${props.selected ? 'selected' : ''}`} id={props.identifier} onClick={props.onUserCicked}>
            <span className='ffh-userlist-item__initials'>{props.initials} </span>
            <span className='ffh-userlist-item__name'>{props.label}</span>
            {props.showUserDetails == props.identifier ? <UserDetails user={props.showUserDetails} /> : '' }
        </li>
      );
}

export default UserListItem;