import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const LeftMenu: React.FC = () => {
    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }
    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon icon-green">
                        <img src="https://www.haverim.org.il/_media_static/images/2/logo2.png" height="65px" width="75px" alt="חברים לרפואה"></img>
                    </div>
                </a>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">

                    <Link className="nav-link" to="Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">Shipments</div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/parcels`}>
                        <i className="fas fa-fw fa-truck"></i>
                        <span>Manage parcels</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">Messengers</div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/users`}>
                        <i className="fas fa-fw fa-users"></i>
                        <span>Users</span>
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
}

export default LeftMenu;