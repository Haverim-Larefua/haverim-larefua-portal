import React from 'react';

import './ParcelsActionsToolbar.scss';
import { ReactComponent as AddUserIcon } from '../../../assets/icons/add-volunteer.svg';
import { ReactComponent as PushUserIcon } from '../../../assets/icons/ic-message.svg';

// import logger from '../../../Utils/logger';
import AppConstants from '../../../constants/AppConstants';

export interface IParcelsActionsToolbarToolbarProps {
  rowsCount: string;
  associateUserClick: () => any;
  pushUsersClick: () => any;
}

const ParcelsActionsToolbar = ({ rowsCount, associateUserClick, pushUsersClick }: IParcelsActionsToolbarToolbarProps) => {
  const associateUserButton = <button className="ffh-toolbar__immediate_action" onClick={associateUserClick}><AddUserIcon /> {AppConstants.associateUserUIName} </button>;
  const pushUserButton = <button className="ffh-toolbar__immediate_action" onClick={pushUsersClick}><PushUserIcon /> {AppConstants.pushUserUIName} </button>;
  const title = `${rowsCount} ${AppConstants.chosenParcelsUIName}`;
  return (
    <div className="ffh-toolbar">
      <div className="ffh-toolbar__title">
        {AppConstants.parcelsUIName}
      </div>
      <div className="ffh-toolbar__subtitle">
        {title}
      </div>
      {associateUserButton}
      {pushUserButton}
    </div>);
}
export default ParcelsActionsToolbar;
