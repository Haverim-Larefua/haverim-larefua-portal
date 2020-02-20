import React from 'react';
import { ReactComponent as SignatureIcon } from '../../../assets/icons/signature.svg';
import './Signature.scss';


export interface SignatureProps {
    signature: string;
}

const Signature:React.FC<SignatureProps> = (props) => {
    return (
        <div className="ffh-signature">
            <SignatureIcon />
            {props.signature &&
                <div className="ffh-signature__pane">
                    <img className="ffh-signature__image" src={`data:image/png;base64,${props.signature}`} alt="חתימה" />
                </div>
            }
        </div>
    );
}

export default Signature;