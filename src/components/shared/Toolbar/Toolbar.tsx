import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Toolbar.scss';


const Toolbar: React.FC = () => {
  return (
    <div className="fhh-toolbar">
      <div className="fhh-toolbar__title">
        שליחים
</div>
      <div className="fhh-toolbar__search">
        <input className="fhh-toolbar__search-input" type="text" placeholder="חיפוש" />
      </div>
      <div className="fhh-toolbar__filters">
        <label className="fhh-toolbar__label">ימי חלוקה</label>
        <Dropdown></Dropdown>
        <label className="fhh-toolbar__label">עיר חלוקה</label>
        <Dropdown></Dropdown>
      </div>
      <button className="fhh-toolbar__action">
        הוספת שליח
</button>
    </div>);
}

export default Toolbar;