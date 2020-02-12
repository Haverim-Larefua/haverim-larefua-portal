import React, { Component, Fragment } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';
import UploadButton from '../UploadButton/UploadButton';
// import logger from '../../../Utils/logger';

export interface ToolbarOption {
  title: string;
  name: string;
  values: string[];
  filter: (val:string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
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

  state = {
    searchInputTerm: "",
  };

  handleKeyDown = (e: any) => {
    this.setState({ searchInputTerm: e.target.value });
    if (e.key === "Enter") {
      this.props.search(e.target.value);
    }
  };

  render() {
    let button;
    if (this.props.uploadButton === true) {
      button = <UploadButton title={this.props.actionTitle} action={this.props.action}></UploadButton>;
    } else {
      button = <button className="fhh-toolbar__immediate_action" onClick={this.props.action}> {this.props.actionTitle} </button>
    }

    let searchFragment;
    if (this.props.withSearch) {
      searchFragment = (
          <div className="fhh-toolbar__search">
            <input className="fhh-toolbar__search-input" type="text" placeholder="חיפוש"
                onKeyDown={this.handleKeyDown}/>
          </div>)
    } else {
      searchFragment = '';
    }

    let optionsFragment;
    if (this.props.withOptions) {
      optionsFragment = (
                <div className="fhh-toolbar__filters">
                  {
                    this.props.options.map((opt) => {
                    return(
                        <Fragment key={opt.title}>
                          <label className="fhh-toolbar__label">{opt.title}</label>
                          <Dropdown options={[...opt.values]} name={opt.name} filter={opt.filter} bullets={opt.bullets} isDisabled={opt.isDisabled}> </Dropdown>
                        </Fragment>)
                    })
                  }
                </div>)
    } else {
      optionsFragment = '';
    }

  return (
    <div className="fhh-toolbar">
      <div className="fhh-toolbar__title">
       {this.props.title}
       </div>
       <div className="fhh-toolbar__subtitle">
       {this.props.subTitle}
      </div>
       {searchFragment}
       {optionsFragment}
       {button}
    </div>);
  }
}

export default Toolbar;