import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import "./admin.scss";
import Header from "../shared/Header/Header";
import Toolbar from "../shared/Toolbar/Toolbar";
import Table from "../shared/Table/Table";

const Admin: React.FC = () => {
  return (
    <Fragment>
      {/* <Notifications /> */}
      <div className="fhh-portal">
        <Header></Header>
        {/* <Toolbar></Toolbar> */}
        <Table></Table>
      </div>
    </Fragment>
  );
}

export default Admin;