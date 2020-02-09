import React from 'react';
import './AssignButton.scss';
import { ReactComponent as Icon} from '../../../assets/icons/add-volunteer.svg';

interface AssignButtonProps {
    id: string;
    name: string;
    action: ()=>{};
}
const AssignButton: React.FC<AssignButtonProps> = (props) => {
    return(
        <button id={props.id} name={props.name} className="fhh-assign-button" onClick={props.action}>
            <Icon />
        </button>
    )
}

export default AssignButton;