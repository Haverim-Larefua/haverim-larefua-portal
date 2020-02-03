import React, { Component, Fragment } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';
import UploadButton from '../UploadButton/UploadButton';

export interface ToolbarOption {
  title: string;
  name: string;
  values: string[];
  filter: (val: string) => {};
  bullets?: boolean;
  isDisabled?: boolean;
}
export interface Props {
  title: string;
  options: ToolbarOption[];
  actionTitle: string;
  action: () => {};
  search: (searchTerm: string) => {};
  uploadButton: boolean;

}
export interface State {
}

class  Toolbar extends Component<Props, State> {

  state = {
    searchInputTerm: "",
  };

  handleKeyDown = (e: any) => {
    this.setState({ searchInputTerm: e.target.value });
    if (e.key === "Enter") {
      this.props.search(e.target.value);
    }
  };

  handleChange = (e: any) => {
    this.setState({ searchInputTerm: e.target.value });
  };


  render() {
    let button;
    if (this.props.uploadButton) {
      button = <UploadButton title={this.props.actionTitle} action={this.props.action}></UploadButton>;
    } else {
      button = <button className="fhh-toolbar__action" onClick={this.props.action}> {this.props.actionTitle} </button>
    }

  return (
    <div className="fhh-toolbar">
      <div className="fhh-toolbar__title">
      {this.props.title}
      </div>
      <div className="fhh-toolbar__search">
        <input className="fhh-toolbar__search-input" type="text" placeholder="חיפוש"
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}/>
      </div>
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
      </div>
       {button}

    </div>);
  }
}

export default Toolbar;