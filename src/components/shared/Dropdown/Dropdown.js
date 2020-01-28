import React from 'react';
import './Dropdown.scss';


class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
       city: ''
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.togleDropDown = this.togleDropDown.bind(this);
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
    const {name, value} = event.target
    this.setState({
        [name]: value
    });
    this.togleDropDown();
}

  render() {
    return (
        <div  className="fhh-dropdown" >
            { this.state.displayMenu ? (<div  className="fhh-dropdown__screen" onClick={this.togleDropDown}></div>) : ''}
         <div className="fhh-dropdown__button" onClick={this.showDropdownMenu}>{this.state.city ? this.state.city: 'בחר'}</div>
          { this.state.displayMenu ? (
          <div className="fhh-dropdown__items-container">
            <label className="fhh-dropdown__item">
                    <input
                        type="radio"
                        name="city"
                        value="באר שבע"
                        checked={this.state.city === 'באר שבע'}
                        onChange={this.handleChange}
                    />
                    <div className="fhh-dropdown__item-title">באר שבע</div>
            </label>
            <label className="fhh-dropdown__item">
                    <input
                        type="radio"
                        name="city"
                        value="הרצלייה"
                        checked={this.state.city === 'הרצלייה'}
                        onChange={this.handleChange}
                    />
                    <div className="fhh-dropdown__item-title">הרצלייה</div>
            </label>
            <label className="fhh-dropdown__item">
                    <input
                        type="radio"
                        name="city"
                        value="עכו"
                        checked={this.state.city === 'עכו'}
                        onChange={this.handleChange}
                    />
                    <div className="fhh-dropdown__item-title">עכו</div>
            </label>
            <label className="fhh-dropdown__item">
                    <input
                        type="radio"
                        name="city"
                        value="חיפה"
                        checked={this.state.city === 'חיפה'}
                        onChange={this.handleChange}
                    />
                    <div className="fhh-dropdown__item-title">חיפה</div>
            </label>
          </div>
        ) : ''
        }

       </div>

    );
  }
}

export default Dropdown;