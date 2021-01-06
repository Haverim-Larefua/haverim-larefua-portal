import React, { useState } from "react";
import "./NotificationForm.scss";

import httpService from "../../../services/http";
import Input from "../../shared/Input/Input";
import Modal from "../../shared/Modal/Modal";
import AppConstants from "../../../constants/AppConstants";

interface INotificationProps {
    userId: string;
    userName: string;
    show: boolean;
    handleClose: () => void;
}

const NotificationForm: React.FC<INotificationProps> = (props): React.ReactElement => {

    const [ title, setTitle ] = useState<string>("");
    const [ subtitle, setSubtitle ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const [ notificationErrorMessage, setNotificationErrorMessage ] = useState<string>("  ");


    const notify = () => {
        if (!title || title === '' || !subtitle || subtitle === '' || !message || message === '') {
            setNotificationErrorMessage('יש למלא את כל השדות');
            return;
        }
        httpService.sendPushNotification(props.userId, title, subtitle, message)
            .then((res) => {
                handleClose();
            })
            .catch((err) => {
                setNotificationErrorMessage(`.אירעה שגיאה בשליחת ההודעה. נסו שוב`);
            })
    };

    const handleClose = () => {
        setTitle("");
        setSubtitle("");
        setMessage("");
        setNotificationErrorMessage("");
        props.handleClose();
    }

    return (
        <Modal title= {`${AppConstants.notifyToUser}${props.userName}` }
               handleClose={handleClose}
               handleAction={() => notify()}
               actionBtnText="שליחה"
               cancelBtnText={AppConstants.cancel}
               type={'alert'}
        >
            <div className='ffh-user-notification'>
                    <Input type='text' name='title' label='כותרת' value={title} required onChange={(e) => setTitle(e.target.value)} />
                    <Input type='text' name='subtitle' label='כותרת משנה' value={subtitle} required onChange={(e) => setSubtitle(e.target.value)} />
                    <label htmlFor="message" className="ffh-form-label">הודעה</label>
                    <textarea rows={5} name="message"  className="ffh-form-textarea" value={message} required onChange={e => setMessage(e.target.value)} />
                        <div className='error-message'>{notificationErrorMessage}</div>
            </div>
        </Modal>
    )

};
export default NotificationForm;