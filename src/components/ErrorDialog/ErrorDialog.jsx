import React, { useContext, useState, useEffect } from "react";
import Modal from "../shared/Modal/Modal";
import AppConstants from "../../constants/AppConstants";
import './ErrorDialog.scss';
import { errorContext } from "../../contexts/ErrorContext";
import { SystemError, defaultError } from "../../contexts/interfaces/error.interface";

const ErrorDialog = () => {
  
  const [systemError, dispatchError] = useContext(errorContext);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
    
  useEffect(() => {
    function handleError() {
     if (systemError && systemError.text !== "" && systemError.code !== 0 ) {
       setShowErrorDialog(true);
     } else {
       setShowErrorDialog(false);
     }
    }
    handleError();
  }, [systemError])

  const handleClose = () => {
    setShowErrorDialog(false);
    dispatchError(new SystemError(defaultError));
  };
    
  return (
    <React.Fragment>
        { systemError && systemError.text !== "" && systemError.code !== 0 &&
          <Modal
            title={AppConstants.errorUIName}
            cancelBtnText={AppConstants.closeUIName}
            handleClose={handleClose}
            actionBtnText={AppConstants.closeUIName}
            handleAction={handleClose}
            type={'error'}
          >
            <div className='ffh-confirmation-message'>
              {systemError.text}
            </div>
          </Modal>
        }
    </ React.Fragment>
  );
};

export default ErrorDialog;