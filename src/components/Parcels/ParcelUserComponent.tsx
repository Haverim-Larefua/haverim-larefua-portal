import React, { Component } from "react";
import ActionButton from "../shared/ActionButton/ActionButton";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as AssignIcon} from '../../assets/icons/add-volunteer.svg';
import { ParcelUtil } from "../../Utils/Parcel/ParcelUtil";
import "./ParcelUserComponent.scss";

const uuidv4 = require('uuid/v4');

export interface ParcelUserComponentProps {
    name: string;
    itemId: string;
    status: string;
    action: (id: number, name: string) => void;
  }

class ParcelUserComponent extends Component<ParcelUserComponentProps> {

    constructor(props: ParcelUserComponentProps) {
      super(props);
      this.onButtonClicked = this.onButtonClicked.bind(this)
  ;  }
  
    public onButtonClicked(e: any): void {
      //take out the _uuid from e.currentTarget.id
      const id =  e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_uuid:'));
      this.props.action(id, e.currentTarget.name);
    }
  
    render() {
      const status = ParcelUtil.parcelUIStatusValueToEnum(this.props.status);
      return (
        <div className="name_container" id={`${this.props.itemId}_uuid:${uuidv4()}`}>
          <span className="name_text"> {this.props.name} </span>
          <div className="buttons_container">
          {!this.props.name && 
              <ActionButton
                  name="assign"
                  action={this.onButtonClicked}
                  itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
                  icon={<AssignIcon/>}
              />
          }
          {(true || (status ===  'ready' || status === 'exception')) && 
            <ActionButton
              name="delete"
              action={this.onButtonClicked}
              itemIdentifier={`${this.props.itemId}_uuid:${uuidv4()}`}
              icon={<DeleteIcon />}
            />
          }
          </div>
        </div>
      );
    }
  }
  
  export default ParcelUserComponent;