import React from 'react'
import './Modal.scss';

const Modal = ({ title, handleClose, handleAction, show, children, actionBtnText, handleCancelAction, cancelBtnText }) => {
  const showHideClassName = show ? "show" : "hide";

  return (
    <div className={`modal ${showHideClassName}`}>
      <section className="modal-main">
          <p className="modal-header">
            <title className="title">{title}</title>
            <button className="modal-close" onClick={handleClose}>X</button>
          </p>
        {children}
        <div className="modal-buttons-area">
            <button className="modal-action-button" onClick={handleAction} type="submit"> {actionBtnText} </button>
            <button className="modal-cancel-button" onClick={handleCancelAction}> {cancelBtnText} </button>
        </div>
      </section>
    </div>
  );
}

export default Modal ;
