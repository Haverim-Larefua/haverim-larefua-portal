import React, {InputHTMLAttributes} from  "react" ;
import "./Input.scss";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    required?: boolean;
    placeholder?: string;
}

export class Input extends React.Component<IInput> {
    render() {
        return (
            <div className='ffh-form-field'>
                <label htmlFor={this.props.name} className="ffh-form-label">{this.props.label}</label>
                <input className="ffh-form-input" type={this.props.type} id={this.props.id} name={this.props.name} required={this.props.required} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default Input;

