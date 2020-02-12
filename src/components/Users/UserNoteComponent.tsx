import React, { Component } from "react";
import "./UserNoteComponent.scss";
import ActionButton from "../shared/ActionButton/ActionButton";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as NotifyIcon } from "../../assets/icons/imsg.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";


const uuidv4 = require('uuid/v4');

export interface UserNoteComponentProps {
  note: string;
  itemId: string;
  action: (id: number, name: string) => void;
}

class UserNoteComponent extends Component<UserNoteComponentProps> {

  constructor(props: UserNoteComponentProps) {
    super(props);
    this.onButtonClicked = this.onButtonClicked.bind(this)
;  }

  public onButtonClicked(e: any): void {
    console.log("[UserNoteComponent] onButtonClicked ", e, e.currentTarget.id, e.currentTarget.name);
    //take out the _uuid from e.currentTarget.id
    const id =  e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_uuid:'));
    this.props.action(id, e.currentTarget.name);
  }

  render() {
    return (
      <div className="note_container" id={`${this.props.itemId}_uuid:${uuidv4()}`}>
        <span className="note_text"> {this.props.note} </span>
        <div className="buttons_container">
          <ActionButton
            name="notify"
            action={this.onButtonClicked}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<NotifyIcon />}
          />
          <ActionButton
            name="delete"
            action={this.onButtonClicked}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<DeleteIcon />}
          />
          <ActionButton
            name="edit"
            action={this.onButtonClicked}
            itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
            icon={<EditIcon />}
          />
        </div>
      </div>
    );
  }
}

export default UserNoteComponent;
