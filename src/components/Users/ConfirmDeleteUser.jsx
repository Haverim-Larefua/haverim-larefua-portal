import React from "react";
import Modal from "../shared/Modal/Modal";
import AppConstants from "../../constants/AppConstants";

const ConfirmDeleteUser = ({ show, handleClose, handleDelete, text }) => {
  return (
    <Modal
      show={show}
      title={AppConstants.deleteUserUIName}
      cancelBtnText={AppConstants.cancel}
      handleClose={handleClose}
      actionBtnText={AppConstants.delete}
      handleAction={handleDelete}
    >
      <div>
        <span>{text}</span>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteUser;
