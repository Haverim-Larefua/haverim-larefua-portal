import React from 'react';
import './UploadButton.scss';

interface UploadButtonProps {
    title: string;
    action: ()=>{};
}
const UploadButton: React.FC<UploadButtonProps> = (props) => {
    return(
        <label className="fhh-upload-button">
            <span>{props.title}</span>
            <input className="fhh-upload-button__input" onChange={props.action} type="file"></input>
        </label>
    )
}

export default UploadButton;