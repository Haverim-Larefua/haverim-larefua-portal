import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';
import UploadButton from '../UploadButton/UploadButton';
import { ReactComponent as AddUserIcon } from '../../../assets/icons/add-volunteer.svg';
// import logger from '../../../Utils/logger';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import {debounce} from 'lodash';
import SelectFilter from '../SelectFilter/SelectFilter';
import Option from "../../../models/Option";
import AppConstants from '../../../constants/AppConstants';

export interface ToolbarOption {
  searchable?: boolean;
  selectedValue?:string;
  title: string;
  name: string;
  values: Option<any>[];
  filter: (val:string) => void;
  bullets?: boolean;
  isDisabled?: boolean;
  showOptionAll?: boolean
}
export interface IToolbarProps {
  title: string;
  subTitle?: string;
  withOptions: boolean;
  options: ToolbarOption[];
  actionTitle?: string;
  action?: () => any;
  withSearch: boolean;
  search: (searchTerm: string) => void;
  searchPlaceholder?: string;
  uploadButton?: boolean;
  loading: boolean;
}


const Toolbar = ({search, uploadButton, actionTitle, action, withSearch, searchPlaceholder = "חיפוש", withOptions, options, subTitle, title}:IToolbarProps) => {
  const handleSearch = debounce(value => {
      search(value);
    }, AppConstants.searchDebounceTime);
  

    let button;
    if (actionTitle && action) {
      button = uploadButton 
      ? <UploadButton title={actionTitle} action={action}></UploadButton> 
      : <button className="ffh-toolbar__immediate_action" onClick={action}><AddUserIcon /> {actionTitle} </button>;
    }
    let searchFragment;
    if (withSearch) {
      searchFragment = (
          <div className="ffh-toolbar__search">
            <input className="ffh-toolbar__search-input" type="text" placeholder={searchPlaceholder}
                onChange={(event) => handleSearch(event.target.value)}/>
            <SearchIcon className="ffh-select-filter__input-icon" />
          </div>)
    }

    let optionsFragment;
    if (withOptions) {
      optionsFragment = (
                <div className="ffh-toolbar__filters">
                  {
                    options.map((opt) => {
                    return(
                        <span className={`ffh-toolbar__filter-container ${opt.name}-filter`} key={opt.name}>
                          <label className="ffh-toolbar__label">{opt.title}</label>
                          {opt.searchable ?
                          <SelectFilter showOptionAll={opt.showOptionAll}  onSelect={opt.filter} items={[...opt.values]} height='260px'/> :
                          <Dropdown showOptionAll={opt.showOptionAll} options={[...opt.values]} name={opt.name} filter={opt.filter} bullets={opt.bullets} isDisabled={opt.isDisabled}/>}
                        </span>)
                    })
                  }
                </div>)
    }

  return (
    <div className="ffh-toolbar">
      <div className="ffh-toolbar__title">
       {title}
       </div>
       <div className="ffh-toolbar__subtitle">
       {subTitle}
      </div>
       {optionsFragment}
       {searchFragment}
       {button}
    </div>);
  }


export default Toolbar;
