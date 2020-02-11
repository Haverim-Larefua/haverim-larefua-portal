import React, {useState } from 'react';
import DropdownItem from './DropDownItem';
import './Dropdown.scss';

interface DropdownProps {
  options: string[];
  name: string;
  filter: (val: string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = (props) => {

  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [chosenOption, setChosenOption] = useState<string>('');

  const toggleDropDown = () => {
    setDisplayMenu(!displayMenu);
}

  const showDropdownMenu = (event:any) => {
  event.preventDefault();
  setDisplayMenu(true)
}

const handleChange = (event:any) => {
  setChosenOption(event.target.value);
  toggleDropDown();
}

const DropDownItems = props.options.map((option)=>
  <DropdownItem name="{props.name}"
    value={option}
    checked={chosenOption === option}
    handleChange={handleChange}>
  </DropdownItem>)


  return (
    <div className="fhh-dropdown" >
      {displayMenu ? (<div className="fhh-dropdown__screen" onClick={toggleDropDown}></div>) : ''}
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
