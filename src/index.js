import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import StudentLayout from "layouts/Student.js";
import CompanyLayout from "layouts/Company.js";
import AdminLayout from "layouts/Admin.js";
import LoginLayout from "layouts/Login.js";
import StudentsList from "./views/StudentsList.js";
import AddUserLayout from "layouts/AddUser.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/s" render={(props) => <StudentLayout {...props} />} />
      <Route path="/c" render={(props) => <CompanyLayout {...props} />} />
      <Route path="/a" render={(props) => <AdminLayout {...props} />} />
      <Route path="/login" render={(props) => <LoginLayout {...props} />} />
      <Route path="/adduser" render={(props) => <AddUserLayout {...props} />} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
);
