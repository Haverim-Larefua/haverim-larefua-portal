import React from "react";
import './UserListItem.scss';

interface UserListItemProps {
    identifier: string;
    label: String;
    initials: String;
    onUserCicked: (event: any) => void;
}

const UserListItem: React.FC<UserListItemProps> = (props) => {
    return (
        <li className='user_item' id={props.identifier} onClick={props.onUserCicked}> 
            <span className='initials' > {props.initials} </span> 
            {props.label} 
        </li>
      );
}

export default UserListItem;