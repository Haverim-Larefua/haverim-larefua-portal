import React, { Component } from "react";
import "./UserNoteComponent.scss";
import ActionButton from "../shared/ActionButton/ActionButton";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as NotifyIcon } from "../../assets/icons/imsg.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";


const uuidv4 = require('uuid/v4');

export interface UserNoteComponentProps {
  note: string;
  itemId: number;
  action: (id: number, name: string) => void;
}

class UserNoteComponent extends Component<UserNoteComponentProps> {

  constructor(props: UserNoteComponentProps) {
    super(props);
;  }



  render() {
    return (
      <div className="note_container" id={`${this.props.itemId}_uuid:${uuidv4()}`}>
        <span className="note_text"> {this.props.note} </span>
        <div className="buttons_container">
          <ActionButton
            name="notify"
            action={() => this.props.action(this.props.itemId, "notify")}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<NotifyIcon />}
          />
          <ActionButton
            name="delete"
            action={() => this.props.action(this.props.itemId, "delete")}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<DeleteIcon />}
          />
          <ActionButton
            name="edit"
            action={() => this.props.action(this.props.itemId, "edit")}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<EditIcon />}
          />
        </div>
      </div>
    );
  }
}

export default UserNoteComponent;
