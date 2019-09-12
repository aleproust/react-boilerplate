import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withFirebase } from './../../Components/Firebase';
import { logout } from "./../../Store/actions/user.actions";
import Globe from 'globe.gl';
import * as d3 from 'd3';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
    componentDidMount(){
        const myGlobe = Globe();
        myGlobe(this.myRef.current)
        .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
              .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
              .hexBinPointWeight('pop')
              .hexAltitude(d => d.sumWeight * 6e-8)
              .hexBinResolution(4)
              .hexTopColor(d => weightColor(d.sumWeight))
              .hexSideColor(d => weightColor(d.sumWeight))
              .hexBinMerge(true)
              .pointsMerge(false)
              .pointsTransitionDuration(5000)
              .enablePointerInteraction(false)
                        
          myGlobe.controls().autoRotate = true;
          myGlobe.controls().autoRotateSpeed = 0.01;

          fetch('https://vasturiano.github.io/globe.gl/example/datasets/world_population.csv').then(res => res.text())
          .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
          .then(data => myGlobe.hexBinPointsData(data));
        
        // We're going to ask a file for the JSON data.
        var xhr = new XMLHttpRequest();
        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
        .domain([0, 1e7]);
  
        // Where do we get the data?
        // xhr.open( 'GET', 'https://vasturiano.github.io/globe.gl/example/datasets/world_population.csv', true );
        
        // // What do we do when we have it?
        // xhr.onreadystatechange = () => {
        
        //     // If we've received the data
        //     if ( xhr.readyState === 4 && xhr.status === 200 ) {
        //         debugger
                
        //         // Parse the JSON
        //         var data = JSON.parse( xhr.responseText );
        //         // const gData = data[0][1].map(([lat, lng, size])=> ({lat, lng, size, color:'red'}))
        //         const N = 300;
        //         const gData = [...Array(N).keys()].map(() => ({
        //             lat: (Math.random() - 0.5) * 180,
        //             lng: (Math.random() - 0.5) * 360,
        //             size: Math.random() / 3,
        //             color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        //           }));

        
        //     }
        
        // };
        // xhr.send( null );
    }
    LogoutClick = () => {
        return this.props.firebase.signOut().then(() => {
            this.props.logout();
        })
    }
    render() {
        return <div ref={this.myRef}></div>
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