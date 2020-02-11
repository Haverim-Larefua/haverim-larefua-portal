import React from 'react';
import './Status.scss';
import { ParcelUtil } from '../../../Utils/Parcel/ParcelUtil';
export interface StatusProps {
    status: string;
  }

const Status: React.FC<StatusProps> = (props) => {

  return (
    <div className={`fhh-status ${props.status}`}>

        {ParcelUtil.parcelStatusEnumToUIValue(props.status)}
    </div>
  );
}

export default Status;