import React from "react";
import './UserListItem.scss';
import { ReactComponent as SelectedIcon } from '../../../assets/icons/selected.svg';
import Initials from './Initials';

interface UserListItemProps {
    identifier: number;
    label: string;
    initials: string;
    initialsColors: string;
    selected: boolean;
    onUserCicked: (id: number) => void;
    onDetailsClickOutside?: (event: any) => void;
}


const UserListItem: React.FC<UserListItemProps> = (props:UserListItemProps) => {
    const onLineClicked = ()=> {
        props.onUserCicked(props.identifier);
    }

    return (
        <li className={`ffh-userlist-item ${props.selected ? 'selected' : ''}`} id={`${props.identifier}`} onClick={onLineClicked}>
            {props.selected ? <SelectedIcon className="ffh-userlist-item__selected-icon" /> : <Initials initialsColors={props.initialsColors} initials={props.initials} />}
            <span className='ffh-userlist-item__name'>{props.label}</span>
        </li>
      );
}

export default UserListItem;