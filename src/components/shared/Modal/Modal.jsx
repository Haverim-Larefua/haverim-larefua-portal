import React from 'react'
import './Modal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

const Modal = ({ title, handleClose, handleAction, show, children, actionBtnText, cancelBtnText }) => {
  const showHideClassName = show ? "modal show" : "modal hide";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
          <p className="modal-header">
            <title className="title">{title}</title>
            <CloseIcon className="modal-close users-modal-close" onClick={handleClose}/>
          </p>
        {children}
        <div className="modal-buttons-area">
            <button className="modal-action-button" onClick={handleAction} type="submit"> {actionBtnText} </button>
            <button className="modal-cancel-button" onClick={handleClose}> {cancelBtnText} </button>
        </div>
      </section>
    </div>
  );
}

export default Modal ;
