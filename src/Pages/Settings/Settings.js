import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from "./../../Store/actions/user.actions";
import { withFirebase } from './../../Components/Firebase';
import { compose } from 'recompose';

class Settings extends Component {
    LogoutClick = () => {
        return this.props.firebase.signOut().then(() => {
            this.props.logout();
        })
    }
    render() {
        return <div>
            <h2>Settings</h2>
            <h4>{this.props.email}</h4>
            <button onClick={this.LogoutClick}>Logout</button>
        </div>

    }
}

const mapStateToProps = state => ({
    ...state.userState
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});
export default compose(connect(
    mapStateToProps,
    mapDispatchToProps), withFirebase)(Settings);