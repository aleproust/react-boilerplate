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
        const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
        .domain([0, 1e7]);
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
              .pointsTransitionDuration(1000)
              .enablePointerInteraction(false)
                        
          myGlobe.controls().autoRotate = true;
          myGlobe.controls().autoRotateSpeed = 0.01;

          fetch('https://vasturiano.github.io/globe.gl/example/datasets/world_population.csv').then(res => res.text())
          .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
          .then(data => myGlobe.hexBinPointsData(data));
        
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