import React from 'react';
import './Note.scss';
import { ReactComponent as MessageIcon } from '../../../assets/icons/ic-comment.svg';
import ReactTooltip from 'react-tooltip';


type NoteType = "ERROR" | "MESSAGE";

export interface NoteProps {
    text: string;
    type: NoteType;
  }

const Note: React.FC<NoteProps> = (props) => {

  return (
      <div className="note-container">
       { props.text ?
       <>
          <div data-place="bottom" data-class="message" data-tip={props.text}> <MessageIcon className="message-icon"/></div>
          <ReactTooltip />
        </> : null
        }
      </div>

  );
}

export default Note;
