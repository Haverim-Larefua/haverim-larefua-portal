import React from 'react'
import './PushToUsersModal.scss';
import AppConstants from '../../../constants/AppConstants';
import Modal from '../../shared/Modal/Modal';
import { connect } from 'react-redux';
import { sendPushNotificationToUsers } from "../../../redux/states/parcel/actions"


interface PushToUsersModalProps {
  parcels: any[];
  handleClose: () => void;
  sendPushNotificationToUsers: (parcelIds: number[]) => void;

}

const PushToUsersModal = ({ handleClose, parcels, sendPushNotificationToUsers }: PushToUsersModalProps) => {

  const handleNotify = () => {
    sendPushNotificationToUsers(parcels.map(parcel => parcel.id));
    handleClose();
  }
  return (
    <Modal
      title={AppConstants.pushUsersUIName}
      cancelBtnText={AppConstants.cancel}
      handleClose={handleClose}
      actionBtnText={AppConstants.notify}
      handleAction={handleNotify}
      type={'alert'}
    >
      <div className='ffh-push-sub-header'> {AppConstants.pushToUsersModalSubHeader}</div >
      <div className='ffh-push-message'>{AppConstants.pushToUsersModalMessage}</div>
    </Modal>
  );
}

const mapDispatchToProps = {
  sendPushNotificationToUsers
}
export default connect(null, mapDispatchToProps)(PushToUsersModal);


