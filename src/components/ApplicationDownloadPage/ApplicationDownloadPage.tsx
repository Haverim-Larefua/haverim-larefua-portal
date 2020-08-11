import React from "react";
import { withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import './ApplicationDownloadPage.scss';
import { Button } from "../shared/Button/Button";
import httpService from "../../services/http";

const ApplicationDownloadPage: React.FC = () => {

  const downloadApp = async () => {
    const response = await httpService.downLoadApp();
  }

  return (
    <div className="application-download-page">

      <div className="container">
        <div className="logo-container"> <Logo /> </div>

        <div className="application-download-page_text">
          אפליקציית המתנדבים של עמותת חברים לרפואה
      </div>

        <Button className="application-download-page_button" onClick={downloadApp}>להורדת האפליקציה</Button>
      </div>
    </div>
  );

}

export default withRouter(ApplicationDownloadPage);