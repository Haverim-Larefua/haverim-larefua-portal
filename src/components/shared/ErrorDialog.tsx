import React from "react";
import Modal from "./Modal/Modal";
import AppConstants from "../../constants/AppConstants";
import './ErrorDialog.scss';

interface IErrorProps {
  show: boolean;
  handleClose: ()=> void;
  text: string;
}

const ErrorDialog: React.FC<IErrorProps> = (props): React.ReactElement =>{
  return (
    <Modal
      title={AppConstants.errorUIName}
      cancelBtnText={AppConstants.closeUIName}
      handleClose={props.handleClose}
      actionBtnText={AppConstants.closeUIName}
      handleAction={props.handleClose}
      type={'error'}
    >
      <div className='ffh-confirmation-message'>
        {props.text}
      </div>
    </Modal>
  );
};

export default ErrorDialog;