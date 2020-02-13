import React from 'react';
import './Dropdown.scss';
import AppConstants from '../../../constants/AppConstants';


interface IDropdownProps {
  options: string[];
  name: string;
  filter?: (val: string) => {};
  onSelection?: (val: string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
}

interface IDropdownState {
  displayMenu: boolean;
  [key: string]: any;
}

class Dropdown extends React.Component<IDropdownProps, IDropdownState> {

  constructor(props: IDropdownProps){
    super(props);

    this.state = {
       displayMenu: false,
       [this.props.name]: this.props.options[0]
     };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  toggleDropDown() {
    this.setState(prevState=>({
        displayMenu: !prevState.displayMenu
    }))
  }

  showDropdownMenu(event: any) {
    event.preventDefault();
    this.setState({ displayMenu: true });
  }

  handleChange(event: any) {
    const {name, value} = event.target;
    this.props.onSelection && this.props.onSelection(event);
    let newValue: string;
    value === AppConstants.all ? newValue = '' : newValue = value;
    this.setState({[name]: newValue});
    this.props.filter && this.props.filter(newValue);
    this.toggleDropDown();
  }

  render() {
    return (
        <div  className={`fhh-dropdown ${this.props.isDisabled ? 'disabled' : ''}`} >
            { this.state.displayMenu ? (<div  className="fhh-dropdown__screen" onClick={this.toggleDropDown}></div>) : ''}
         <div className="fhh-dropdown__button" onClick={this.toggleDropDown}>{this.state[this.props.name] ? this.state[this.props.name] : AppConstants.all}</div>
          { this.state.displayMenu ? (
          <div className="fhh-dropdown__items-container">
              {this.props.options.map(item => {
              return (
              <label className="fhh-dropdown__item" key={item}>
                 <input
                  type="radio"
                  name={this.props.name}
                  value={item}
                  checked={this.state[this.props.name] === item}
                  onChange={this.handleChange}

                 />
              <div className="fhh-dropdown__item-title">
                {this.props.bullets ? <span className="fhh-dropdown__pointer"></span> : ''}
                {item}
                </div>
             </label>)
            })}
          </div>
        ) : ''
        }

       </div>

    );
  }
}

export default Dropdown;
