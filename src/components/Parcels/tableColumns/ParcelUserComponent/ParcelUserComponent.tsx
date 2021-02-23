import React from "react";
import ActionButton from "../../../shared/ActionButton/ActionButton";
import { ReactComponent as DeleteIcon } from "../../../../assets/icons/delete.svg";
import { ReactComponent as AssignIcon} from '../../../../assets/icons/add-volunteer.svg';
import {connect} from "react-redux";
import "./ParcelUserComponent.scss";
import { AppState } from "../../../../redux/rootReducer";
import User from "../../../../models/User";
import Note from "../../../shared/Note/Note";

const uuidv4 = require('uuid/v4');

export interface ParcelUserComponentProps {
    allUsersById: { [id in number]: User };
    userId: number;
    itemId: string;
    status: string;
     action: (id: number, name: string) => void;
     comments: string;
  }

const ParcelUserComponent = ({allUsersById, userId, itemId, status, action, comments}:ParcelUserComponentProps) => {
   const userDetails = allUsersById[userId];

    function onButtonClicked(e: any): void {
      const id =  e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_uuid:'));
      action(id, e.currentTarget.name);
    }

      return (
        <div className="name_container" id={`${itemId}_uuid:${uuidv4()}`}>
        <span className="name_text"> {`${userDetails?.firstName ?? ""} ${userDetails?.lastName ?? ""}`} </span>
        <div className="buttons-note-container">
        <div className="buttons_container">
        {!userId &&
            <ActionButton
                name="assign"
                action={onButtonClicked}
                itemIdentifier={`${itemId}_uuid:${uuidv4()}`}
                icon={<AssignIcon/>}
            />
        }
        {status ===  'ready' &&
          <ActionButton
            name="delete"
            action={onButtonClicked}
            itemIdentifier={`${itemId}_uuid:${uuidv4()}`}
            icon={<DeleteIcon />}
          />
        }
        </div>
        <div className="note">
        < Note text = { comments } type = "MESSAGE" / >
        </div></div>
        </div>
      );
    }


  const mapPropsToState = (appState: AppState) => (
    {
      allUsersById: appState.user.allUsersById
    }
  )
  export default connect(mapPropsToState)(ParcelUserComponent);
