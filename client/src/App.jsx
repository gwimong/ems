import React, { Component } from "react";
import { Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";

import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./route/Routes";
import { SessionService } from "services";
import { LoginContext } from "contexts/login.context";
import LoginProvider from "providers/login.provider";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {

  constructor(props) {
    super(props);

    this.login = (loginUser) => {
      this.setState(state => ({
        isAuthenticated: true,
        authenticatedUser: loginUser
      }));
    }

    this.logout = () => {
      this.setState({
        isAuthenticated: false,
        authenticatedUser: null,
      });
    }

    this.session = () => {
      SessionService.getSession().then(res => {
        this.setState({
          isAuthenticated: true,
          authenticatedUser: res.data.loginUser,
        });
      }).catch(err => {
        console.log(err);
        this.setState({
          isAuthenticated: false,
          authenticatedUser: null,
        })
      });
    }

    this.state = {
      isAuthenticated: true,
      authenticatedUser: null,
      login: this.login,
      logout: this.logout,
      session: this.session
    };

    this.state.session();
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </LoginContext.Provider>
    );
  }
}