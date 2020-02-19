import React, { Component } from 'react';
import './ActionButton.scss';

interface ActionButtonProps {
    itemIdentifier: string;
    name: string;
    icon: any;
    action: (e: any)=> void;
}

export interface ActionOnlyProps {
    action: (e: any)=> {};
    id: string;
}

class ActionButton extends Component<ActionButtonProps> {

    render() {
        return (
            <button
                id={this.props.itemIdentifier}
                name={this.props.name}
                className="ffh-action-button"
                onClick={this.props.action}>
                {this.props.icon}
            </button>
        )
    }
}

export default ActionButton;