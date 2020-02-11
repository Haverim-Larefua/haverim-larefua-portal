import React, {ChangeEvent, InputHTMLAttributes} from "react";
import "./Input.scss";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export class Input extends React.Component<IInput> {
    render() {
        return (
            <fieldset className='fieldset'>
                <label htmlFor={this.props.name} className="label">{this.props.label}</label>
                <input className="input" type={this.props.type} id={this.props.id} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
            </fieldset>
        )
    }
}
