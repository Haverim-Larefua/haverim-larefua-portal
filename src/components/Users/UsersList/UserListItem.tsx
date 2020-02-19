import React from "react";
import './UserListItem.scss';
import UserDetails from '../UserDetails/UserDetails'

interface UserListItemProps {
    identifier: string;
    label: String;
    initials: String;
    selected: boolean;
    showUserDetails: string;
    onUserCicked: (event: any) => void;
}

const UserListItem: React.FC<UserListItemProps> = (props:UserListItemProps) => {
    return (
        <li className={`ffh-userlist-item ${props.selected ? 'selected' : ''}`} id={props.identifier} onClick={props.onUserCicked}>
            <span className='ffh-userlist-item__initials'>{props.initials} </span>
            <span className='ffh-userlist-item__name'>{props.label}</span>
            {props.showUserDetails === props.identifier ? <UserDetails user={props.showUserDetails} /> : '' }
        </li>
      );
}

export default UserListItem;