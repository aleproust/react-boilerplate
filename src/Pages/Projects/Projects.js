import React, { Component } from 'react';
import ExampleComponent from '../../Components/Example/Example'
import { connect } from 'react-redux';
import {listRepositories} from '../../Middleware/github.middleware';
class Projects extends Component {
    state = {
        projects: []
    }
    componentDidMount(){
        listRepositories(this.props.githubState.me).then(projects => this.setState({...this.state, projects}))
    }


    render(){
        
        
        const projectsDOM = this.state.projects.map((p, index) => (<h2 key={index}>{p.name}</h2>))
        return (<div>
                <ExampleComponent></ExampleComponent>
                <div>{ projectsDOM}</div>
            </div>
            
            )
    }
}

const mapStateToProps = state => {
    return {githubState: state.githubState}
  };
export default connect(mapStateToProps)(Projects);