import React, { Component } from 'react';
import { withFirebase } from './../../Components/Firebase';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

class Home extends Component {
    state = {
        workspaces: []
    }
    async componentDidMount() {
        this.props.firebase.db.collection('workspaces').where(`roles.${this.props.userState.uid}`, '==', 'admin').onSnapshot((snapshot) => {
            const temp = []
            snapshot.forEach((s) => {
                temp.push(s.data())
            })
            this.setState({ workspaces: temp })
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        var w = { name: e.target.name.value }
        var roles = {};
        roles[this.props.userState.uid] = 'admin';
        var min = Math.ceil(10000);
        var max = Math.floor(100000);
        var r = Math.floor(Math.random() * (max - min + 1)) + min;
        this.props.firebase.db.collection('workspaces').add(
            {
                ...w,
                roles,
                uid: `${w.name}-${r}`
            })
    }
    render() {
        return <div>
            <h1>Workspaces list</h1>
            {this.state.workspaces.map((w) => {
                return <h2 key={w.uid}><Link style={{color:"black"}} to={`/workspaces/${w.uid}/`}>
                {w.name}
                </Link></h2>
            })}
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Input
                        name="name"
                        placeholder="Workspace name"
                    />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

const mapStateToProps = ({ userState }) => ({
    userState
});
const mapDispatchToProps = dispatch => ({
});
export default compose(connect(
    mapStateToProps,
    mapDispatchToProps), withFirebase)(Home);