import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from './../../Components/Firebase';
import { logout } from "./../../Store/actions/user.actions";
declare var DAT;
class Settings extends Component {
    componentDidMount(){
        var container = document.getElementById( 'globe' );

       
        var globe = new DAT.Globe( container );
        
        // We're going to ask a file for the JSON data.
        var xhr = new XMLHttpRequest();
        
        // Where do we get the data?
        xhr.open( 'GET', '/globe/population909500.json', true );
        
        // What do we do when we have it?
        xhr.onreadystatechange = function() {
        
            // If we've received the data
            if ( xhr.readyState === 4 && xhr.status === 200 ) {
                debugger
                // Parse the JSON
                var data = JSON.parse( xhr.responseText );
        
                // Tell the globe about your JSON data
                for ( var i = 0; i < data.length; i ++ ) {
                    globe.addData( data[i][1], {format: 'magnitude', name: data[i][0]} );
                }
        
                // Create the geometry
                globe.createPoints();
        
                // Begin animation
                globe.animate();
        
            }
        
        };
        xhr.send( null );
    }
    LogoutClick = () => {
        return this.props.firebase.signOut().then(() => {
            this.props.logout();
        })
    }
    render() {
        return<div className="globe" id="globe"></div>
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