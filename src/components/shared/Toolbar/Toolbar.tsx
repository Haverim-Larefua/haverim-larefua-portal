import React, { Component, Fragment } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';
import UploadButton from '../UploadButton/UploadButton';
import { ReactComponent as AddUserIcon } from '../../../assets/icons/add-volunteer.svg';
// import logger from '../../../Utils/logger';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import {debounce} from 'lodash';
import SelectFilter from '../SelectFilter/SelectFilter';
import Option from "../../../models/Option";

export interface ToolbarOption {
  searchable?: boolean;
  selectedValue?:string;
  title: string;
  name: string;
  values: Option<any>[];
  filter: (val:string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
  showOptionAll?: boolean
}
export interface IToolbarProps {
  title: string;
  subTitle: string;
  withOptions: boolean;
  options: ToolbarOption[];
  actionTitle: string;
  action: () => {};
  withSearch: boolean;
  search: (searchTerm: string) => {};
  uploadButton: boolean;
}
export interface IToolbarState {
}

class  Toolbar extends Component<IToolbarProps, IToolbarState> {
  handleSearch = debounce(value => {
      this.props.search(value);
    }, 800);
  

  render() {
    let button;
    if (this.props.uploadButton === true) {
      button = <UploadButton title={this.props.actionTitle} action={this.props.action}></UploadButton>;
    } else {
      button = <button className="ffh-toolbar__immediate_action" onClick={this.props.action}><AddUserIcon /> {this.props.actionTitle} </button>
    }

    let searchFragment;
    if (this.props.withSearch) {
      searchFragment = (
          <div className="ffh-toolbar__search">
            <input className="ffh-toolbar__search-input" type="text" placeholder="חיפוש"
                onChange={(event) => this.handleSearch(event.target.value)}/>

            <SearchIcon className="ffh-select-filter__input-icon" />

          </div>)
    } else {
      searchFragment = '';
    }

    let optionsFragment;
    if (this.props.withOptions) {
      optionsFragment = (
                <div className="ffh-toolbar__filters">
                  {
                    this.props.options.map((opt) => {
                    return(
                        <Fragment key={opt.title}>
                          <label className="ffh-toolbar__label">{opt.title}</label>
                          {opt.searchable ?
                          <SelectFilter showOptionAll={opt.showOptionAll}  onSelect={opt.filter} items={[...opt.values]} height='260px'/> :
                          <Dropdown showOptionAll={opt.showOptionAll} options={[...opt.values]} name={opt.name} filter={opt.filter} bullets={opt.bullets} isDisabled={opt.isDisabled}/>}
                        </Fragment>)
                    })
                  }
                </div>)
    } else {
      optionsFragment = '';
    }

  return (
    <div className="ffh-toolbar">
      <div className="ffh-toolbar__title">
       {this.props.title}
       </div>
       <div className="ffh-toolbar__subtitle">
       {this.props.subTitle}
      </div>
       {optionsFragment}
       {searchFragment}
       {button}
    </div>);
  }
}

export default Toolbar;
