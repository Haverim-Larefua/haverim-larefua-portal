import React, { useEffect, useState } from "react";
import "./Dropdown.scss";
import Option from "../../../models/Option";
import AppConstants from "../../../constants/AppConstants";

export interface IDropdownProps {
  options: Option<any>[];
  name: string;
  filter?: (val: string) => void;
  onSelection?: (val: string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
  showOptionAll?: boolean;
  defaultValue?: Option<any>;
}

export default function Dropdown({
  options,
  onSelection,
  filter,
  isDisabled,
  name,
  bullets,
  showOptionAll = true,
  defaultValue,
}: IDropdownProps) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const calculatedOptions = showOptionAll ? [{ label: AppConstants.all, value: "" }, ...options] : [...options];
  const [selectedOption, setSelectedOption] = useState(defaultValue ? defaultValue : calculatedOptions[0]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue, options, showOptionAll]);

  const toggleDropDown = () => {
    setDisplayMenu((prevState) => !prevState);
  };

  const handleChange = (option: Option<any>) => {
    setSelectedOption(option);
    onSelection && onSelection(option.value);
    filter && filter(option.value);
    toggleDropDown();
  };

  return (
    <div className={`ffh-dropdown ${isDisabled ? "disabled" : ""}`}>
      {displayMenu ? <div className="ffh-dropdown__screen" onClick={toggleDropDown}></div> : ""}
      <div className="ffh-dropdown__button" onClick={toggleDropDown}>
        {selectedOption.label}
      </div>
      {displayMenu ? (
        <div className="ffh-dropdown__items-container">
          {calculatedOptions.map((item) => {
            return (
              <label className="ffh-dropdown__item" key={item.value}>
                <input
                  type="radio"
                  name={name}
                  value={item.label}
                  checked={selectedOption.value === item.value}
                  onChange={() => handleChange(item)}
                />
                <div className="ffh-dropdown__item-title">
                  {bullets && <span className={`ffh-dropdown__pointer ${item.value}`}></span>}
                  {item.label}
                </div>
              </label>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
