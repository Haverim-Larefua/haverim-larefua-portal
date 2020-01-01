import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import LeftMenu from "../shared/LeftMenu/LeftMenu";
import TopMenu from "../shared/TopMenu/TopMenu";
import Dashboard from "../Dashboard/Dashboard";
import Packages from "../Packages/Packages";

const Admin: React.FC = () => {
    return (
        <Fragment>
          {/* <Notifications /> */}
          <LeftMenu />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopMenu />
              <div className="container-fluid">
                <Switch>
                  <Route path={`/packages`}><Packages /></Route>
                  {/* <Route path={`/products`}><Products /></Route>
                  <Route path={`/orders`}><Orders /></Route> */}
                  <Route path="/"><Dashboard /></Route>
                </Switch>
              </div>
            </div>
          </div>
        </Fragment>
      );
  }
  
  export default Admin;