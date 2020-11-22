import React, { useState} from 'react';
import './SelectFilter.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import AppConstants from "../../../constants/AppConstants";
import ClickOutsideHandler from '../../shared/ClickOutsideHandler/ClickOutsideHandler';



const SelectFilter = ({items, selected, height = "160px", hideFilter = false, showOptionAll = true, onSelect}) => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const [searchInput, setSearchInput] = useState("");

 

    const toggleDropDown = (e) => {
        setDropDownVisible(!dropDownVisible);
    }

    const hideDropDown = () => {
        setDropDownVisible(false);
    }

    const selectItem = (value = "") => {
        setDropDownVisible(!dropDownVisible);
        onSelect(value);
    }


    return (
        <ClickOutsideHandler onClickOutside={hideDropDown}>
            <div className="ffh-select-filter">
                <div className="ffh-select-filter__selected" onClick={toggleDropDown}>{selected?.length > 0 ? selected:  AppConstants.all}</div>
                {dropDownVisible &&
                    <div className="ffh-select-filter__dropdown" style={{ height }}>
                        {!hideFilter &&
                            <div className="ffh-select-filter__input-ph">
                                <SearchIcon className="ffh-select-filter__input-icon" />
                                <input type="text" className="ffh-select-filter__input" onChange={(e) => setSearchInput(e.target.value)} /> 
                            </div>
                        }
                        <div className="ffh-select-filter__options">
                            {showOptionAll &&
                                <div className="ffh-select-filter__option" onClick={() => selectItem()}>{AppConstants.all}</div>
                            }
                            {items.filter(item=>item.label.includes(searchInput)).map((item, i) => {
                                return (
                                    <div className="ffh-select-filter__option" key={i} onClick={() => selectItem(item.value)}>{item.label}</div>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            </div>
        </ClickOutsideHandler>
    )
}

export default SelectFilter;