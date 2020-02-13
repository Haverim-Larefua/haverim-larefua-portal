import React from 'react';
import './Status.scss';
export interface StatusProps {
    status: string;
  }

const Status: React.FC<StatusProps> = (props) => {

  return (
    <div className={`fhh-status ${props.status}`}>
        {props.status}
    </div>
  );
}

export default Status;