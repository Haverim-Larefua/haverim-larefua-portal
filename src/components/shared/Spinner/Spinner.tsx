import React from 'react';
import { ReactComponent as Icon} from '../../../assets/icons/bike.svg';
import './Spinner.scss';

export class Spinner extends React.Component {
  render() {
    return(
      <Icon className="spinner-icon"/>
    );
  }
}