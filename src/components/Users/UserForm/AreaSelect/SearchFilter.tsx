import React from 'react';
import {ReactComponent as SearchIcon} from "../../../../assets/icons/search.svg";

interface ISearchFilterProps {
    onSearch: Function;
    value: string;
}

const SearchFilter = ({onSearch, value}:ISearchFilterProps) => {

    return (
        <div className="ffh-select-area-filter">
            <SearchIcon className="ffh-select-area-filter__input-icon" />
            <input type="text" className="ffh-select-area-filter__input" onChange={(e) => onSearch(e.target.value)} autoFocus value={value}/>
        </div>
    )

};

export default SearchFilter;
