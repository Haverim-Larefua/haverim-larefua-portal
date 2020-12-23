import React, { useState } from 'react'
import './AssignUserToParcelsModal.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import AppConstants from '../../../constants/AppConstants';
import UsersList from '../../Users/UsersList/UsersList';
import { connect } from 'react-redux';
import {assignUserToParcels} from "../../../redux/states/parcel/actions"
interface AssignUserToParcelsModalProps {
  handleClose: (useId?:number) => void;
  assignUserToParcels: (parcelsToAssociate: number[], userId: number) => void;
  parcelsToAssociate: number[];
  initUserId:number;
}

const AssignUserToParcelsModal= ({parcelsToAssociate, handleClose, assignUserToParcels, initUserId = 0}: AssignUserToParcelsModalProps) =>  {
  const [selectedUserId, setSelectedUserId] = useState(initUserId);
  const associateUserToSelectedParcels = () => {
    assignUserToParcels(parcelsToAssociate, selectedUserId);
    handleClose(selectedUserId);
  }
  
  const handleCloseWithoutChange= () =>  {
      handleClose();
  }
  return (
    <div className="ffh-users-modal">
      <section className="ffh-users-modal-main">
        <CloseIcon className="ffh-users-modal-close" onClick={handleCloseWithoutChange}/>
        <UsersList updateSelectedUser={setSelectedUserId} initUserId ={initUserId} />

        <button className="ffh-users-modal-button" onClick={associateUserToSelectedParcels}> {AppConstants.allocation} </button>
      </section>
    </div>
  );
}

const mapDispatchToProps ={
  assignUserToParcels
}

export default connect(null, mapDispatchToProps)(AssignUserToParcelsModal);
