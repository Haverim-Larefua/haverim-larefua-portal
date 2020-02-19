import React from 'react'
import './Modal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

const Modal = ({ title, handleClose, handleAction, show, children, actionBtnText, cancelBtnText }) => {
  const showHideClassName = show ? "ffh-modal__screen--show" : "ffh-modal__screen--hide";

  return (
    <div className={`ffh-modal__screen ${showHideClassName}`}>
      <div className="ffh-modal">
        <header className="ffh-modal__header">
          <h2 className="ffh-modal__title">{title}</h2>
          <CloseIcon onClick={handleClose} />
        </header>
        <main className="ffh-modal__content">
          {children}
        </main>
        <div className="ffh-modal__actions">
          <button className="ffh-modal__action--cancel" onClick={handleClose}> {cancelBtnText} </button>
          <button className="ffh-modal__action--submit" onClick={handleAction} type="submit"> {actionBtnText} </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
