import React from 'react';
import './UserDetails.scss';
import Initials from '../UsersList/Initials';
import ClickOutsideHandler from '../../shared/ClickOutsideHandler/ClickOutsideHandler';
import {connect} from "react-redux";

const UserDetails = ({users, user, initials, onClickOutside, initialsColors, show }) => {
  const getDeliveryUserById = (id) => {
    if (users.length > 0) {
      const deliveryUser = users.find(u => u.id === id);
      return deliveryUser;
    }
  }

  const userDetails = getDeliveryUserById(parseInt(user));


  return show ? (

    <ClickOutsideHandler onClickOutside={onClickOutside}>
      <div className="ffh-user-details">
        <div className="ffh-user-details__item ffh-user-details__user">
          <div className="ffh-user-details__user-name">
            <Initials initialsColors={initialsColors} initials={initials} />
            {userDetails.firstName} {userDetails.lastName}
          </div>
        </div>
        <div className="ffh-user-details__item ffh-user-details__phone">
          <h4 className="ffh-user-details__label">טלפון</h4>
          {userDetails.phone}</div>
        <div className="ffh-user-details__item ffh-user-details__city">
          <h4 className="ffh-user-details__label">עיר חלוקה</h4>
          {userDetails.deliveryArea}</div>
        <div className="ffh-user-details__item ffh-user-details__days">
          <h4 className="ffh-user-details__label">ימי חלוקה</h4>
          {userDetails.deliveryDays}</div>
        <div className="ffh-user-details__item ffh-user-details__notes">
          <h4 className="ffh-user-details__label">הערות</h4>
          {userDetails.notes}</div>
      </div>
    </ClickOutsideHandler>
  ) : <></>;
}

const mapStateToProps =(appState) => {
  return {
    users: appState.user.users,
  }
}

export default connect(mapStateToProps)(UserDetails);
