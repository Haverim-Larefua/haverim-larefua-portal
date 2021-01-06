import React from 'react'
import './Modal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as AlertIcon } from '../../../assets/icons/alert.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error.svg';

interface IModalProps {
  title: string;
  handleClose: () => void;
  handleAction: () => void;
  children: any;
  actionBtnText: string;
  cancelBtnText: string;
  type?: 'error' | 'alert';
  isActionDisabled?: boolean;
}

const Modal: React.FC<IModalProps> = (props): React.ReactElement => {

  let headerIcon;
  switch (props.type) {
    case 'alert':
      headerIcon = <AlertIcon className="ffh-modal__icon" />
      break;
    case 'error':
      headerIcon = <ErrorIcon className="ffh-modal__icon" />
      break;
    default:
      break;
  }

  return (
    <div className="ffh-modal__screen">
      <div className="ffh-modal">
        <header className="ffh-modal__header">
          {headerIcon}
          <h2 className="ffh-modal__title">{props.title}</h2>
          <CloseIcon className="ffh-modal__close" onClick={props.handleClose} />
        </header>
        <main className="ffh-modal__content">{props.children}</main>
        <div className="ffh-modal__actions">
          <button className="ffh-modal__action--cancel" onClick={props.handleClose}> {props.cancelBtnText} </button>
          {props.type === 'alert' && !props.isActionDisabled &&
            <button className="ffh-modal__action--submit" onClick={props.handleAction} type="submit" > {props.actionBtnText} </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
