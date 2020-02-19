import React, {ButtonHTMLAttributes} from "react";
import "./Button.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export class Button extends React.Component<IButton> {
    render() {
        return (
            <button
                className="ffa-button"
                id={this.props.id}
                name={this.props.name}
                onClick={this.props.onClick}>
                    {this.props.children}
            </button>
        )
    }
}
