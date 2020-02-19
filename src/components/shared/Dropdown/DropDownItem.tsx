import React from 'react';


interface DropdownItemProp {
    name: string;
    value: string;
    checked: boolean;
    handleChange: (event: any) => void;
}

class DropdownItem extends React.Component<DropdownItemProp> {

    render() {
        return(
            <label className="ffh-dropdown__item">
                <input
                    type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={this.props.handleChange}
                />
                <div className="ffh-dropdown__item-title">{this.props.value}</div>
            </label>
        )
    }
}

export default DropdownItem;