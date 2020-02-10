import React, { useContext, useState, useEffect, Fragment } from "react";
import './UserListItem.scss';
// import AppConstants from "../../constants/AppConstants";

const UserListItem = (props) => {
    return (
        <li className='user_item' id={props.identifier} onClick={props.onUserCicked}> 
            <span className='initials' > {props.initials} </span> 
            {props.label} 
        </li>
      );
}

export default UserListItem;