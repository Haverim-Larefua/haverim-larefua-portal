import React from "react";
import './UserListItem.scss';
import UserDetails from '../UserDetails/UserDetails'
import Initials from './Initials'

interface UserListItemProps {
    identifier: string;
    label: string;
    initials: string;
    initialsColors: string;
    selected: boolean;
    showUserDetails: string;
    onUserCicked: (event: any) => void;
}


const UserListItem: React.FC<UserListItemProps> = (props:UserListItemProps) => {
    return (
        <li className={`ffh-userlist-item ${props.selected ? 'selected' : ''}`} id={props.identifier} onClick={props.onUserCicked}>
            <Initials initialsColors={props.initialsColors} initials={props.initials} />
            <span className='ffh-userlist-item__name'>{props.label}</span>
            {props.showUserDetails == props.identifier ? <UserDetails user={props.showUserDetails} initialsColors={props.initialsColors} initials={props.initials}  /> : '' }
        </li>
      );
}

export default UserListItem;