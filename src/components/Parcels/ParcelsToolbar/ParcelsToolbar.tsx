import React, {ReactNode} from 'react';

import './ParcelsToolbar.scss';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { debounce } from 'lodash';
import UploadButton from '../../shared/UploadButton/UploadButton';
import Dropdown from '../../shared/Dropdown/Dropdown';
import SelectFilter from '../../shared/SelectFilter/SelectFilter';
import AppConstants from '../../../constants/AppConstants';
import Option from "../../../models/Option";

export interface ParcelsToolbarOption {
  searchable?: boolean;
  selectedValue?: string;
  title: string;
  name: string;
  values: Option<any>[];
  filter: (val: string) => void;
  bullets?: boolean;
  isDisabled?: boolean;
  showOptionAll?: boolean;
  searchComponent?: ReactNode;
}
export interface IParcelsToolbarProps {
  options: ParcelsToolbarOption[];
  importFromFileClick?: () => any;
  search: (searchTerm: string) => void;
  loading: boolean;
}


const ParcelsToolbar = ({ search, importFromFileClick, options }: IParcelsToolbarProps) => {
  const handleSearch = debounce(value => {
    search(value);
  }, AppConstants.searchDebounceTime);


  let button;
  if (importFromFileClick) {
    button = <UploadButton title={AppConstants.addFromFileUIName} action={importFromFileClick}></UploadButton>
  }
  const searchFragment = (
    <div className="ffh-toolbar__search">
      <input className="ffh-toolbar__search-input" type="text" placeholder={"חיפוש לפי שם, תעודת זהות וטלפון"}
        onChange={(event) => handleSearch(event.target.value)} />
      <SearchIcon className="ffh-select-filter__input-icon" />
    </div>)


  let optionsFragment = (
    <div className="ffh-toolbar__filters">
      {
        options.map((opt) => {
          return (
            <span className={`ffh-toolbar__filter-container ${opt.name}-filter`} key={opt.name}>
              <label className="ffh-toolbar__label">{opt.title}</label>
              {opt.searchable ? opt.searchComponent ? opt.searchComponent :
                <SelectFilter showOptionAll={opt.showOptionAll} onSelect={opt.filter} items={[...opt.values]} height='260px' /> :
                <Dropdown showOptionAll={opt.showOptionAll} options={[...opt.values]} name={opt.name} filter={opt.filter} bullets={opt.bullets} isDisabled={opt.isDisabled} />}
            </span>)
        })
      }
    </div>)

  return (
    <div className="ffh-toolbar">
      <div className="ffh-toolbar__title">   {AppConstants.parcelsUIName}   </div>
      {optionsFragment}
      {searchFragment}
      {button}
    </div>);
}


export default ParcelsToolbar;
