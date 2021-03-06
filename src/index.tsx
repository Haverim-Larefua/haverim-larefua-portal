import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './components/App/App';
import * as serviceWorker from './serviceWorker_with_own_push';

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register();
