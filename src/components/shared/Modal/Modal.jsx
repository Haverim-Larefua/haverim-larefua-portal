import React from 'react'
import './Modal.scss';

const Modal = ({ handleClose, handleAction, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="modal-close" onClick={handleClose}> X </button>
        {children}
        <button className="modal-button" onClick={handleAction}> שיוך </button>
      </section>
    </div>
  );
}

export default Modal ;