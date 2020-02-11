import React from 'react'
import './Modal.scss';

const Modal = ({ title, handleClose, handleAction, show, children, actionBtnText }) => {
  const showHideClassName = show ? "show" : "hide";

  return (
    <div className={`modal ${showHideClassName}`}>
      <section className="modal-main">
          <p className="modal-header">
            <title className="title">{title}</title>
            <button className="modal-close" onClick={handleClose}>X</button>
          </p>
        {children}
        <button className="modal-button" onClick={handleAction}> {actionBtnText} </button>
      </section>
    </div>
  );
}

export default Modal ;
