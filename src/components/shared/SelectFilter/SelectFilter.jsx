import React, { useState, useEffect } from 'react';
import './SelectFilter.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import AppConstants from "../../../constants/AppConstants";
import ClickOutsideHandler from '../../shared/ClickOutsideHandler/ClickOutsideHandler';



const SelectFilter = (props) => {
    const [listItems, setListItems] = useState([]);
    const [initialItems, setInitialItems] = useState([]);
    const [dropDownVisible, setDropDownVisible] = useState(false);


    useEffect(() => {
        setListItems(props.items);
        setInitialItems(props.items);
    }, [props])

    const filterItems = (e) => {
        setListItems(initialItems.filter(item => item.includes(e.target.value)));
    }

    const toggleDropDown = (e) => {
        setDropDownVisible(!dropDownVisible);
    }

    const hideDropDown = () => {
        setDropDownVisible(false);
    }

    const selectItem = (e) => {
        setDropDownVisible(!dropDownVisible);
        props.onSelect(e);
    }


    return (
        <ClickOutsideHandler onClickOutside={hideDropDown}>
            <div className="ffh-select-filter">
                <div className="ffh-select-filter__selected" onClick={toggleDropDown}>{props.selected ? props.selected : ''}</div>
                {dropDownVisible &&
                    <div className="ffh-select-filter__dropdown" style={{ height: props.height }}>
                        {!props.hideFilter &&
                            <div className="ffh-select-filter__input-ph">
                                <SearchIcon className="ffh-select-filter__input-icon" />
                                <input type="text" className="ffh-select-filter__input" onChange={filterItems} />
                            </div>
                        }
                        <div className="ffh-select-filter__options">
                            {props.showOptionAll &&
                                <div className="ffh-select-filter__option" onClick={selectItem}>{AppConstants.all}</div>
                            }
                            {listItems.map((item, i) => {
                                return (
                                    <div className="ffh-select-filter__option" key={i} onClick={selectItem}>{item}</div>
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