import React from "react";
import UserDetails from './UserDetails'
import './UserListItem.scss';

const UserListItem = (props) => {
    return (
        <li className={`fhh-userlist-item ${props.selected ? 'selected' : ''}`} id={props.identifier} onClick={props.onUserCicked}>
            <span className='fhh-userlist-item__initials'>{props.initials} </span>
            <span className='fhh-userlist-item__name'>{props.label}</span>
            {props.showUserDetails == props.identifier ? <UserDetails user={props.showUserDetails} /> : '' }
        </li>
      );
}

export default UserListItem;