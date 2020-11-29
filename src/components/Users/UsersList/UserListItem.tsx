import React, {useState} from "react";
import './UserListItem.scss';
import { ReactComponent as SelectedIcon } from '../../../assets/icons/selected.svg';
import UserDetails from '../UserDetails/UserDetails';
import Initials from './Initials';

interface UserListItemProps {
    identifier: number;
    label: string;
    initials: string;
    initialsColors: string;
    selected: boolean;
    showUserDetails: number;
    onUserCicked: (id: number) => void;
    onDetailsClickOutside?: (event: any) => void;
}


const UserListItem: React.FC<UserListItemProps> = (props:UserListItemProps) => {

    const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

    const onLineClicked = ()=> {
        props.onUserCicked(props.identifier);
        setShowUserDetailsModal(true);
    }

    const handleOutsideClick = () => {
        setShowUserDetailsModal(false);
    }

    return (
        <li className={`ffh-userlist-item ${props.selected ? 'selected' : ''}`} id={`${props.identifier}`} onClick={onLineClicked}>
            {props.selected ? <SelectedIcon className="ffh-userlist-item__selected-icon" /> : <Initials initialsColors={props.initialsColors} initials={props.initials} />}
            <span className='ffh-userlist-item__name'>{props.label}</span>
            {props.showUserDetails === props.identifier ?
                <UserDetails user={props.showUserDetails}
                             initialsColors={props.initialsColors}
                             initials={props.initials}
                             show={showUserDetailsModal}
                             onClickOutside={handleOutsideClick}
                /> : '' }
        </li>
      );
}

export default UserListItem;