import React from "react";
import Modal from "../shared/Modal/Modal";
import AppConstants from "../../constants/AppConstants";
import './ConfirmDeleteUser.scss';

interface IConfirmDeleteUserProps {
  show: boolean;
  handleClose: ()=> void;
  handleDelete: ()=> void;
  text: string;
}

const ConfirmDeleteUser: React.FC<IConfirmDeleteUserProps> = (props): React.ReactElement =>{
  return (
    <Modal
      show={props.show}
      title={AppConstants.deleteUserUIName}
      cancelBtnText={AppConstants.cancel}
      handleClose={props.handleClose}
      actionBtnText={AppConstants.delete}
      handleAction={props.handleDelete}
      type={'alert'}
    >
      <div className='ffh-confirmation-message'>
        {props.text}
      </div>
    </Modal>
  );
};

export default ConfirmDeleteUser;
