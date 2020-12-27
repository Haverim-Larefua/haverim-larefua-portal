import React, { useState } from 'react';
import { ReactComponent as SignatureIcon } from '../../../../../assets/icons/signature.svg';
import './Signature.scss';


export interface SignatureProps {
    signature: string;
}

const Signature:React.FC<SignatureProps> = ({signature}: SignatureProps) => {
    const [sign, setSign] = useState(signature);
    return (
        <div className="ffh-signature">
            <SignatureIcon />
            {sign &&
                <div className="ffh-signature__pane">
                    <img className="ffh-signature__image" src={`data:image/png;base64,${sign}`} alt="חתימה" />
                </div>
            }
        </div>
    );
}

export default Signature;
