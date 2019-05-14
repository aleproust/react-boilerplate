import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header/Header';
import Settings from "./Pages/Settings/Settings"
import Projects from "./Pages/Projects/Projects"
import Infrastructure from "./Pages/Infrastructure/Infrastructure"
import * as ROUTES from "./Constants/routes";
import  { FirebaseContext } from './Components/Firebase';
const INITIAL_STATE = {
  username: '',
  email:'',
  other: {}
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  LoginClick(firebase) {
    //implement login
    return firebase.loginWithGithub().then(result => console.log(result))
    
  }
  render() {
    return (
      <div className="App">
        
        <FirebaseContext.Consumer>{firebase => (
          <Router>
          <Header loginClicked={() =>this.LoginClick(firebase)} username={this.state.username}></Header>
            <Route exact path={ROUTES.PROJECTS} component={Projects} />
          <Route path={ROUTES.INFRASTRUCTURE} component={Infrastructure} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          </Router>)
        }
          </FirebaseContext.Consumer>
       

        {/* <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SETTINGS} component={SettingsPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
      </div>
    );
  } 

}
export default App;