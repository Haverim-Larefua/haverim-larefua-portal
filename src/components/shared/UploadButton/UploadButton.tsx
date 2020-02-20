import React from 'react';
import './UploadButton.scss';
import { ReactComponent as Icon} from '../../../assets/icons/add.svg';

interface UploadButtonProps {
    title: string;
    action: ()=>{};
}
const UploadButton: React.FC<UploadButtonProps> = (props) => {
    return(
        <label className="ffh-upload-button">
            <Icon />
            <span>{props.title} </span>
            <input className="ffh-upload-button__input" onChange={props.action} type="file"></input>
        </label>
    )
}

export default UploadButton;