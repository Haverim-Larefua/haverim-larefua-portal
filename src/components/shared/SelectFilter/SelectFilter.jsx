import React, { useState, useEffect } from 'react';
import './SelectFilter.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';



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
        props.onSelect(e);
    }


    return (
        <div className="ffh-select-filter">
            <div className="ffh-select-filter__selected" onClick={toggleDropDown}>{props.selected? props.selected : ''}</div>
            {dropDownVisible &&
            <div className="ffh-select-filter__dropdown">
                <div className="ffh-select-filter__input-ph">
                <SearchIcon className="ffh-select-filter__input-icon" />
                <input type="text" className="ffh-select-filter__input" onChange={filterItems} />
                </div>

            <div className="ffh-select-filter__options">

                {listItems.map((item, i) => {
                    return (
                        <div className="ffh-select-filter__option" key={i} onClick={toggleDropDown}>{item}</div>
                    )
                })
                }
            </div>
            </div>
            }
        </div>
    )
}

export default SelectFilter;