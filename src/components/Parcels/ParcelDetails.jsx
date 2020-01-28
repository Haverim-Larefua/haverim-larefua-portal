import React, { useContext } from 'react';
import { parcelContext } from '../../contexts/parcelContext';
import { removeParcel } from '../../contexts/actions/parcels.action';

const ParcelDetails = ({ pkg }) => {
  const { dispatch } = useContext(parcelContext);
  return (
    <li onClick={() => dispatch(removeParcel(pkg.id))}>
      <div >{pkg.name}</div>
      <div >{pkg.address}</div>
    </li>
  );
}

export default ParcelDetails;