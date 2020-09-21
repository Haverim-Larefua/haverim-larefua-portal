import React from "react";
import { withRouter } from 'react-router-dom';
import { ReactComponent as BlueLogo } from "../../assets/icons/login-image-flat.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import './ApplicationDownloadPage.scss';
import { Button } from "../shared/Button/Button";
import Configuration from "../../configuration/Configuration";
 
const ApplicationDownloadPage: React.FC = () => {

  return (
    <div className="application-download-page">

      <div className="container">
        <div className="logo-container"> <BlueLogo /> </div>

        <div className="application-download-page_text">
          אפליקציית המתנדבים של עמותת חברים לרפואה
      </div>

        <a href={`${Configuration.URLS.BACKEND_URL}${Configuration.URLS.DOWNLOAD}`}><Button><Download className="download" /> להורדת האפליקציה</Button></a>
      </div>
    </div>
  );

}

export default withRouter(ApplicationDownloadPage);