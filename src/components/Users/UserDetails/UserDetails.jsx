import React, { useContext } from 'react';
import { userContext } from '../../../contexts/userContext';
import './UserDetails.scss';
import Initials from '../UsersList/Initials';

const UserDetails = (props) => {

  const [users] = useContext(userContext);
  const getDeliveryUserById = (id) => {
    if (users.users.length > 0) {
      const deliveryUser = users.users.find(u => u.id === id);
      return deliveryUser;
    }
  }

  const userDetails = getDeliveryUserById(parseInt(props.user));

  return (
    <div className="ffh-user-details">
      <div className="ffh-user-details__item ffh-user-details__user">
      <div className="ffh-user-details__user-name">
      <Initials initialsColors={props.initialsColors} initials={props.initials} />
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
  );
}

export default UserDetails;