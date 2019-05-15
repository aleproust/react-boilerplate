import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { withFirebase } from './Components/Firebase';
import Header from './Components/Header/Header';
import * as ROUTES from "./Constants/routes";
import Infrastructure from "./Pages/Infrastructure/Infrastructure";
import Projects from "./Pages/Projects/Projects";
import Settings from "./Pages/Settings/Settings";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { login, logout } from "./Store/actions/user.actions";



class App extends Component {

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.props.login({ email:authUser.email,
          avatar: authUser.photoURL,
          uid:authUser.uid,
          isAuthenticated: true })
        : this.props.logout();
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  LoginClick() {
    return this.props.firebase.loginWithGithub().then(({avatar, email, uid, accessToken }) => {
      this.props.login({avatar, email, uid, accessToken });
    })
    
  }
  render() {
    return (
      <div className="App">
          <Router>
            <Header isAuthenticated={this.props.userState.isAuthenticated} loginClicked={() =>this.LoginClick()} avatar={this.props.userState.avatar}></Header>
            <section className="container">
              <Route exact path={ROUTES.PROJECTS} component={Projects} />
              <Route path={ROUTES.INFRASTRUCTURE} component={Infrastructure} />
              <Route path={ROUTES.SETTINGS} component={Settings} />
            </section>
          </Router>
      </div>
    );
  } 

}
const mapStateToProps = ({userState}) => ({
  userState
});
const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout())
});
export default compose(connect(
  mapStateToProps,
  mapDispatchToProps),withFirebase)(App);