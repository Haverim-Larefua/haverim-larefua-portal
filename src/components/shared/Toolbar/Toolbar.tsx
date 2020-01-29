import React, { Component, Fragment } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';

export interface ToolbarOption {
  title: string;
  name: string;
  values: string[];
}
export interface Props {
  title: string;
  options: ToolbarOption[];
  actionTitle: string;
  action: () => {};
  search: (searchTerm: string) => {};
}
export interface State { 
}
 
class  Toolbar extends Component<Props, State> {
  
  state = {
    searchInputTerm: "",
  };

  handleKeyDown = (e: any) => {
    this.setState({ searchInputTerm: e.target.value });
    if (e.key === "Enter" && e.target.value.length > 0) {
      this.props.search(e.target.value);
    }
  };

  handleChange = (e: any) => {
    this.setState({ searchInputTerm: e.target.value });
  };


  render() { 
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
                <Dropdown options={[...opt.values]} name={opt.name}></Dropdown>
              </Fragment>)
          })
       }
      </div>
      <button className="fhh-toolbar__action" onClick={this.props.action}> {this.props.actionTitle} </button>
    </div>);
  }
}

export default Toolbar;