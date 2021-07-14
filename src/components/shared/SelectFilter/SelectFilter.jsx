import React, { useEffect, useState} from 'react';
import './SelectFilter.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import AppConstants from "../../../constants/AppConstants";
import ClickOutsideHandler from '../../shared/ClickOutsideHandler/ClickOutsideHandler';



const SelectFilter = ({items, height = "160px", hideFilter = false, showOptionAll = true, onSelect, initialSelection = null}) => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const calculatedOptions = showOptionAll ? [{label: AppConstants.all, value: ""}, ...items] : items;
    const [selectedOption, setSelectedOption] = useState(showOptionAll ? calculatedOptions[0] : null);

    useEffect(function updateInitialSelection() {
        const initialSelectionOption = items?.find(item => item?.value === initialSelection);
        if (initialSelectionOption){
            setSelectedOption(initialSelectionOption);
        }
    }, [items, initialSelection])

    const toggleDropDown = (e) => {
        setDropDownVisible(!dropDownVisible);
    }

    const hideDropDown = () => {
        setSearchInput("");
        setDropDownVisible(false);
    }

    const selectItem = (option) => {
        hideDropDown();
        setSelectedOption(option);
        onSelect(option.value);
    }


    return (
        <ClickOutsideHandler onClickOutside={hideDropDown}>
            <div className="ffh-select-filter">
                <div className="ffh-select-filter__selected" onClick={toggleDropDown}>{selectedOption?.label}</div>
                {dropDownVisible &&
                    <div className="ffh-select-filter__dropdown" style={{ height }}>
                        {!hideFilter &&
                            <div className="ffh-select-fi lter__input-ph">
                                <SearchIcon className="ffh-select-filter__input-icon" />
                                <input type="text" className="ffh-select-filter__input" onChange={(e) => setSearchInput(e.target.value)} autoFocus /> 
                            </div>
                        }
                        <div className="ffh-select-filter__options">
                            {calculatedOptions.filter(item=>item.label.includes(searchInput)).map((item, i) => {
                                return (
                                    <div className="ffh-select-filter__option" key={i} onClick={() => selectItem(item)}>{item.label}</div>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            </div>
        </ClickOutsideHandler>
    )
};

export default SelectFilter;