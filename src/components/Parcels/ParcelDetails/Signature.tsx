import React from 'react';
import { ReactComponent as SignatureIcon } from '../../../assets/icons/signature.svg';
import './Signature.scss';


export interface SignatureProps {
    signature: string;
}

const Signature:React.FC<SignatureProps> = (props) => {
    return (
        <div className="fhh-signature">
            <SignatureIcon />
            {props.signature &&
                <div className="fhh-signature__pane">
                    <img className="fhh-signature__image" src={`data:image/png;base64,${props.signature}`} alt="חתימה" />
                </div>
            }
        </div>
    );
}

export default Signature;