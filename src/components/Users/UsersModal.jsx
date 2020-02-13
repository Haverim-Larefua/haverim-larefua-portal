import React from 'react'
import './UsersModal.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const UsersModal = ({ handleClose, handleAction, show, children }) => {
  const showHideClassName = show ? "users-modal users-display-block" : "users-modal users-display-none";

  return (
    <div className={showHideClassName}>
      <section className="users-modal-main">
        <CloseIcon className="users-modal-close" onClick={handleClose}/>
        {children}
        <button className="users-modal-button" onClick={handleAction}> שיוך </button>
      </section>
    </div>
  );
}

export default UsersModal ;