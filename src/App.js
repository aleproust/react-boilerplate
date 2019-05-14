import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header/Header';
import Settings from "./Pages/Settings/Settings"
import Projects from "./Pages/Projects/Projects"
import Infrastructure from "./Pages/Infrastructure/Infrastructure"
import * as ROUTES from "./Constants/routes";
import  { withFirebase } from './Components/Firebase';

const INITIAL_STATE = {
  avatar: '',
  email:'',
  uid: '',
  accessToken: ''
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(({email, photoURL, uid}) => {
      const authUser = {
        email,
        avatar: photoURL,
        uid:uid
      }
      authUser.email
        ? this.setState({ ...authUser })
        : this.setState({ ...INITIAL_STATE });
    });
  }

  LoginClick() {
    return this.props.firebase.auth.loginWithGithub().then(({avatar, email, uid, accessToken }) => {
      this.setState({...this.state, avatar, email, uid, accessToken})
    })
    
  }
  render() {
    return (
      <div className="App">
          <Router>
            <Header loginClicked={() =>this.LoginClick()} avatar={this.state.avatar}></Header>
            <Route exact path={ROUTES.PROJECTS} component={Projects} />
            <Route path={ROUTES.INFRASTRUCTURE} component={Infrastructure} />
            <Route path={ROUTES.SETTINGS} component={Settings} />
          </Router>
        
       

        {/* <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SETTINGS} component={SettingsPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
      </div>
    );
  } 

}
export default withFirebase(App);