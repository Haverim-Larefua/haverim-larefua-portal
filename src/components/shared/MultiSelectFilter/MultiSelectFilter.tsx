import React, {useEffect, useState} from "react";
import "./MultiSelectFilter.scss";
import {ReactComponent as SearchIcon} from "../../../assets/icons/search.svg";
import {ReactComponent as CheckBoxOn} from "../../../assets/icons/checkbox-on.svg";
import {ReactComponent as CheckBoxOff} from "../../../assets/icons/checkbox-off.svg";
import {ReactComponent as CheckBoxDeselect} from "../../../assets/icons/checkbox-deselect.svg";
import {ReactComponent as CollapseDefault} from "../../../assets/icons/chevron-collapse-default.svg";

import AppConstants from "../../../constants/AppConstants";
import ClickOutsideHandler from "../ClickOutsideHandler/ClickOutsideHandler";

export interface IMultiItemsData {
  data?:  IMultiItemsData[];
  title: string;
  collapse: boolean;
  checked: boolean;
  id? : number;
}

export interface IMultiItems {
  data:  IMultiItemsData[];
}

const multiItemsData: IMultiItems = {
  data: [{
    title: "אזור מרכז",
    collapse: false,
    checked: false,
    data: [{
      title: "פתח תקוה",
      collapse: false,
      checked: false,
      data: [{
        title: "מגשימים ",
        id: 1,
        collapse: false,
        checked: false,
      }
      ]
    }, {
      title: "בני ברק",
      id: 3,
      collapse: false,
      checked: false,
    }
    ],
  }],
};

const MultiSelectFilter = ({
  items,
  height = "160px",
  hideFilter = false,
  showOptionAll = true,
  onSelect,
  initialSelection = null,
}: any) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [multiItems, setMultiItems] = useState<IMultiItems>(multiItemsData)

  const calculatedOptions = showOptionAll ? [{label: AppConstants.all, value: ""}, ...items] : items;
  const [selectedOption, setSelectedOption] = useState(showOptionAll ? calculatedOptions[0] : null);

  useEffect(
    function updateInitialSelection() {
      const initialSelectionOption = items?.find((item: any) => item?.value === initialSelection);
      if (initialSelectionOption) {
        setSelectedOption(initialSelectionOption);
      }
    },
    [items, initialSelection]
  );

  const toggleDropDown = (e: any) => {
    setDropDownVisible(!dropDownVisible);
  };

  const hideDropDown = () => {
    setSearchInput("");
    setDropDownVisible(false);
  };

  const selectItem = (option: any) => {
    hideDropDown();
    setSelectedOption(option);
    onSelect(option.value);
  };

  const collapse = (parent: any, item: any) => {
    item.collapse = !item.collapse;
    setMultiItems(prev => ({...prev, parent}));
  }

  function setChecked(data: IMultiItemsData[], checkedOnOf: boolean): void {
    if (!data || data.length === 0) {
      return;
    }


    data.forEach(element => {
      element.checked = checkedOnOf;
      if(element.data) {
      setChecked(element.data, checkedOnOf);
    }
    });

  }

  const checked = (parent: IMultiItems, item: IMultiItemsData, checkedOnOf: boolean) => {
    item.checked = checkedOnOf;
    if(item.data) {
          setChecked(item.data, checkedOnOf)
    }
    setMultiItems(prev => ({...prev, parent}));
  }

  const checkedBox = (parent: any, item: any) => {
    if (item.checked) {

      if (item.data && item.data.length > 0) {
        return (<CheckBoxDeselect onClick={(e) => checked(parent, item, false)}></CheckBoxDeselect>)
      }
      return (<CheckBoxOn onClick={(e) => checked(parent, item, false)}></CheckBoxOn>)
    }

    return (<CheckBoxOff onClick={(e) => checked(parent, item, true)}></CheckBoxOff>)
  }

  const dropDownOneLevel = (parent: IMultiItems, itemsData: IMultiItemsData[], level: number) => (<div className="ffh-select-filter__options">
    {itemsData.map((item: IMultiItemsData, i: number): JSX.Element => (
      <div key={level + " " + i}>
        <div className={level === 0 ? "ffh-select-filter__option first_level" : "ffh-select-filter__option"} onClick={() => selectItem(item)}>
          <div className="select-title">
            <div>{checkedBox(parent, item)}</div>
            <div>{item.title}</div>
          </div>

          <div><CollapseDefault onClick={() => collapse(parent, item)} className={item.collapse ? "rotate" : ""}></CollapseDefault></div>
        </div>
        <div className="netest-data">
          {item.data && item.collapse ? dropDownOneLevel(parent, item.data, level + 1) : null}
        </div>
      </div>
    ))}
  </div>);

  return (
    <ClickOutsideHandler onClickOutside={() => hideDropDown()}>
      <div className="ffh-select-filter">
        <div className="ffh-select-filter__selected" onClick={(e) => toggleDropDown(e)}>
          {selectedOption?.label}
        </div>
        <div className="ffh-select-filter__dropdown" style={{height}}>
          {dropDownOneLevel(multiItems, multiItems.data, 0)}
          <div className="buttom_actions">
            <div onClick={() => multiItems.data && checked(multiItems, multiItems.data[0], false)}  key="clear">נקה</div>
            <div onClick={() => hideDropDown()} className="choose_action" key="choose">בחירה</div>
          </div>
        </div>
      </div>
    </ClickOutsideHandler>
  );
};



export default MultiSelectFilter;
