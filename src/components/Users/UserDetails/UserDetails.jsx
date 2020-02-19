import React, { useContext } from 'react';
import { userContext } from '../../../contexts/userContext';
import './UserDetails.scss';

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
    <div className="fhh-user-details">
      <div className="fhh-user-details__item fhh-user-details__user">
      <div className="fhh-user-details__user-name">
      {userDetails.firstName} {userDetails.lastName}
      </div>
      </div>
      <div className="fhh-user-details__item fhh-user-details__phone">
        <h4 className="fhh-user-details__label">טלפון</h4>
        {userDetails.phone}</div>
      <div className="fhh-user-details__item fhh-user-details__city">
        <h4 className="fhh-user-details__label">עיר חלוקה</h4>
        {userDetails.deliveryArea}</div>
      <div className="fhh-user-details__item fhh-user-details__days">
        <h4 className="fhh-user-details__label">ימי חלוקה</h4>
        {userDetails.deliveryDays}</div>
      <div className="fhh-user-details__item fhh-user-details__notes">
        <h4 className="fhh-user-details__label">הערות</h4>
        {userDetails.notes}</div>
    </div>
  );
}

export default UserDetails;