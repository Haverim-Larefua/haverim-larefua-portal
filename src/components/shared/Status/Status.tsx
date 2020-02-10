import React from 'react';
import './Status.scss';
import statusToClassname from '../../../Utils/statusToClassname';


export interface StatusProps {
    status: string;
  }

const Status: React.FC<StatusProps> = (props) => {

  return (
    <div className={`fhh-status ${statusToClassname(props.status)}`}>
        {props.status}
    </div>
  );
}

export default Status;