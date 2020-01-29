import React, { Component } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';

export interface Props {
  title: string;
  actionTitle: string;
  action: () => {};
}
export interface State { 
}
 
class  Toolbar extends Component<Props, State> {
  
  cities = ['באר שבע', 'תל אביב', 'הרצלייה', 'חיפה', 'עכו', 'ערד', 'תל שבע'];
  days = ['א','ב','ג','ד','ה','ו','ש','כל השבוע'];

  render() { 
  return (
    <div className="fhh-toolbar">
      <div className="fhh-toolbar__title">
      {this.props.title}
      </div>
      <div className="fhh-toolbar__search">
        <input className="fhh-toolbar__search-input" type="text" placeholder="חיפוש" />
      </div>
      <div className="fhh-toolbar__filters">
        <label className="fhh-toolbar__label">ימי חלוקה</label>
        <Dropdown options={this.days} name="days"></Dropdown>
        <label className="fhh-toolbar__label">עיר חלוקה</label>
        <Dropdown options={this.cities} name="cities"></Dropdown>
      </div>
      <button className="fhh-toolbar__action" onClick={this.props.action}> {this.props.actionTitle} </button>
    </div>);
  }
}

export default Toolbar;