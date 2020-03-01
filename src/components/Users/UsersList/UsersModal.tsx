import React from 'react'
import './UsersModal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import AppConstants from '../../../constants/AppConstants';

interface IUsersModalProps {
  handleClose: () => void;
  handleAction: () => void;
  children: Element;
}

const UsersModal: React.FC<IUsersModalProps> = (props): React.ReactElement =>  {

  return (
    <div className="ffh-users-modal">
      <section className="ffh-users-modal-main">
        <CloseIcon className="ffh-users-modal-close" onClick={props.handleClose}/>
        {props.children}
        <button className="ffh-users-modal-button" onClick={props.handleAction}> {AppConstants.allocation} </button>
      </section>
    </div>
  );
}

export default UsersModal ;