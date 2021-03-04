import React, { useEffect, useState } from "react";
import "./MultiSelectFilter.scss";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg";
import { ReactComponent as CheckBoxOn } from "../../../assets/icons/checkbox-on.svg";
import { ReactComponent as CheckBoxOff } from "../../../assets/icons/checkbox-off.svg";
import { ReactComponent as CheckBoxDeselect } from "../../../assets/icons/checkbox-deselect.svg";
import { ReactComponent as CollapseDefault } from "../../../assets/icons/chevron-collapse-default.svg";

import AppConstants from "../../../constants/AppConstants";
import ClickOutsideHandler from "../ClickOutsideHandler/ClickOutsideHandler";

const multiItemsData = {
    data: [ {
        type: "EREA",
        title: "אזור מרכז",
        id: 1,
        collapse: false,
        data: [ {
            type: "CITY",
            title: "פתח תקוה",
            id: 2,
            collapse: false,
            data: [ {
                type: "SUB_CITY",
                title: "מגשימים ",
                id: 4,
                collapse: false,
              }
            ]
        }, {
            type: "CITY",
            title:  "בני ברק",
            id: 3,
            collapse: false,
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
}) => {
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [multiItems, setMultiItems] = useState(multiItemsData)

  const calculatedOptions = showOptionAll ? [{ label: AppConstants.all, value: "" }, ...items] : items;
  const [selectedOption, setSelectedOption] = useState(showOptionAll ? calculatedOptions[0] : null);

  useEffect(
    function updateInitialSelection() {
      const initialSelectionOption = items?.find((item) => item?.value === initialSelection);
      if (initialSelectionOption) {
        setSelectedOption(initialSelectionOption);
      }
    },
    [items, initialSelection]
  );

  const toggleDropDown = (e) => {
    setDropDownVisible(!dropDownVisible);
  };

  const hideDropDown = () => {
    setSearchInput("");
    setDropDownVisible(false);
  };

  const selectItem = (option) => {
    hideDropDown();
    setSelectedOption(option);
    onSelect(option.value);
  };

  const collapse = (parent, item) => {
    item.collapse = !item.collapse;
  //  setMultiItems(parent);
  }

  const dropDownOneLevel = (parent, items, level) => (<div className="ffh-select-filter__options">
            {items.map((item, i) => (
                <>
              <div className="ffh-select-filter__option" key={level + " " + i} onClick={() => selectItem(item)}>
                <div><CheckBoxOff></CheckBoxOff></div>
                <div>{item.title}</div>
                <div><CollapseDefault onClick={() => collapse(parent, item)} className={item.collapse ? "rotate": ""}></CollapseDefault></div>
              </div>
              <div>
               {item.data && item.collapse? dropDownOneLevel(parent, item.data, level + 1) : null}
              </div>
              </>
            ))}
          </div>);

  return (
    <ClickOutsideHandler onClickOutside={hideDropDown}>
      <div className="ffh-select-filter">
        <div className="ffh-select-filter__selected" onClick={toggleDropDown}>
          {selectedOption?.label}
        </div>
        <div className="ffh-select-filter__dropdown" style={{ height }}>
        {dropDownOneLevel(multiItems.data, multiItems.data, 0)}
        </div>
      </div>
    </ClickOutsideHandler>
  );
};



export default MultiSelectFilter;
