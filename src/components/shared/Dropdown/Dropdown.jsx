import React, {useState } from 'react';
import DropdownItem from './DropDownItem';
import './Dropdown.scss';

const Dropdown = (props) => {

  const [displayMenu, setDisplayMenu] = useState(false);
  const [chosenOption, setChosenOption] = useState('');

  const togleDropDown = () => {
    setDisplayMenu(!displayMenu);
}

  const showDropdownMenu = (event) => {
  event.preventDefault();
  setDisplayMenu(true)
}

const handleChange = (event) => {
  setChosenOption(event.target.value);
  togleDropDown();
}

const DropDownItems = props.options.map((option)=>
<DropdownItem name="{props.name}"
   value={option}
   checked={chosenOption === option}
   handleChange={handleChange}>
</DropdownItem>)


  return (

    <div className="fhh-dropdown" >
      {displayMenu ? (<div className="fhh-dropdown__screen" onClick={togleDropDown}></div>) : ''}
      <div className="fhh-dropdown__button" onClick={showDropdownMenu}>{chosenOption ? chosenOption : 'בחר'}</div>
      {displayMenu ? (
        <div className="fhh-dropdown__items-container">
          {DropDownItems}
        </div>
      ) : ''
      }
    </div>
  );
}

export default Dropdown;
