import React from "react";
import { withRouter } from 'react-router-dom';
import { ReactComponent as BlueLogo } from "../../assets/icons/login-image-flat.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import './ApplicationDownloadPage.scss';
import { Button } from "../shared/Button/Button";
import Configuration from "../../configuration/Configuration";
import AppConstants from "../../constants/AppConstants";

const IOSArray = [
  AppConstants.iPadSimulator,
  AppConstants.iPhoneSimulator,
  AppConstants.iPodSimulator,
  AppConstants.iPad,
  AppConstants.iPhone,
  AppConstants.iPod
];

const ApplicationDownloadPage: React.FC = () => {
  function getUrlByOperatingSystem() {
    if (IOSArray.includes(navigator.platform)) {
      return Configuration.URLS.DOWNLOAD_IOS;
    }
    return Configuration.URLS.DOWNLOAD_ANDROID;
  }

  return (
    <div className="application-download-page">

      <div className="container">
        <div className="logo-container"> <BlueLogo /> </div>

        <div className="application-download-page_text">
          {AppConstants.downloadAppInfoText}
        </div>

        <a href={`${Configuration.URLS.BACKEND_URL}${getUrlByOperatingSystem()}`}>
          <Button><Download className="download" /> {AppConstants.downloadAppText}</Button></a>
      </div>
    </div>
  );

}

export default withRouter(ApplicationDownloadPage);