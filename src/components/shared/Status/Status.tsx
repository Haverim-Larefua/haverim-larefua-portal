import React from 'react';
import './Status.scss';
export interface StatusProps {
    label: string;
    value: string;
  }

const Status: React.FC<StatusProps> = (props) => {

  return (
    <div className={`ffh-status ${props.value}`}>
        {props.label}
    </div>
  );
}

export default Status;