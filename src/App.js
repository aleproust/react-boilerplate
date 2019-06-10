import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { withFirebase } from './Components/Firebase';
import Header from './Components/Header/Header';
import * as ROUTES from "./Constants/routes";
import Infrastructure from "./Pages/Infrastructure/Infrastructure";
import Projects from "./Pages/Projects/Projects";
import Settings from "./Pages/Settings/Settings";
import Workspaces from "./Pages/Workspaces/Workspaces";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { login, logout } from "./Store/actions/user.actions";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Landing from './Pages/Landing/Landing';
import { setGithubToken,  resumeGithubToken, initGithubApi} from "./Store/actions/github.actions";


class App extends Component {
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if(authUser){
        this.props.resumeGithubToken()
        this.props.login({ email:authUser.email,
                          avatar: authUser.photoURL,
                          uid:authUser.uid,
                          isAuthenticated: true })
      }
      else{
        this.props.logout();
      }
     
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  LoginClick() {
    return this.props.firebase.loginWithGithub().then(({avatar, email, uid, accessToken }) => {
      this.props.login({avatar, email, uid, accessToken });
      this.props.setGithubToken(accessToken)
    })
  }
  render() {
    const userState = this.props.userState;
    return (
      <div className="App">
        <Router>
          <Header isLoaded={userState.isLoaded} isAuthenticated={userState.isAuthenticated} loginClicked={() => this.LoginClick()} avatar={userState.avatar}></Header>
          <PrivateRoute exact isLoaded={userState.isLoaded} isAuthenticated={userState.isAuthenticated} path={ROUTES.PROJECTS} component={Projects} />
          <PrivateRoute exact isLoaded={userState.isLoaded} isAuthenticated={userState.isAuthenticated} path={ROUTES.INFRASTRUCTURE} component={Infrastructure} />
          <PrivateRoute exact isLoaded={userState.isLoaded} isAuthenticated={userState.isAuthenticated} path={ROUTES.SETTINGS} component={Settings} />
          <PrivateRoute exact isLoaded={userState.isLoaded} isAuthenticated={userState.isAuthenticated} path={ROUTES.WORKSPACES} component={Workspaces} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
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
  logout: () => dispatch(logout()),
  setGithubToken: (token)=> {
    dispatch(setGithubToken(token))
    dispatch(initGithubApi())
  },
  resumeGithubToken: () => {
    dispatch(resumeGithubToken())
    dispatch(initGithubApi())
  }
});
export default compose(connect(
  mapStateToProps,
  mapDispatchToProps), withFirebase)(App);