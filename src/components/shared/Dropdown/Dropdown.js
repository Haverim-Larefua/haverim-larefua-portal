import React from 'react';
import './Dropdown.scss';


class Dropdown extends React.Component {
constructor(props){
 super(props);

 this.state = {
       displayMenu: false,
       name: '',
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.togleDropDown = this.togleDropDown.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
};

togleDropDown() {
    this.setState(prevState=>({
        displayMenu: !prevState.displayMenu
    }))
}

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true });
  }
  
  handleChange(event) {

  }

  handleClick(event) {
    const {name, value} = event.target
    if (this.state[this.props.name] === value) {
      // clicking selected item - deselect it
      this.setState({[name]: ''});
      this.props.filter('');
    } else {
      // selecting different item
      this.setState({[name]: value});
      this.props.filter(value);
    }
    this.togleDropDown();
  }

  render() {
    return (
        <div  className="fhh-dropdown" >
            { this.state.displayMenu ? (<div  className="fhh-dropdown__screen" onClick={this.togleDropDown}></div>) : ''}
         <div className="fhh-dropdown__button" onClick={this.showDropdownMenu}>{this.state[this.props.name] ? this.state[this.props.name]: 'בחר'}</div>
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
                  onClick={this.handleClick}
                 />
              <div className="fhh-dropdown__item-title">{item}</div>
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