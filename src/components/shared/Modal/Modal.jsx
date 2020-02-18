import React from 'react'
import './Modal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

const Modal = ({ title, handleClose, handleAction, show, children, actionBtnText, cancelBtnText }) => {
  const showHideClassName = show ? "fhh-modal__screen--show" : "fhh-modal__screen--hide";

  return (
    <div className={`fhh-modal__screen ${showHideClassName}`}>
      <div className="fhh-modal">
        <header className="fhh-modal__header">
          <h2 className="fhh-modal__title">{title}</h2>
          <CloseIcon onClick={handleClose} />
        </header>
        <main className="fhh-modal__content">
          {children}
        </main>
        <div className="fhh-modal__actions">
          <button className="fhh-modal__action--cancel" onClick={handleClose}> {cancelBtnText} </button>
          <button className="fhh-modal__action--submit" onClick={handleAction} type="submit"> {actionBtnText} </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
