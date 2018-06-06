import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction, getStatus } from '../actions/test-action';

class Header extends Component {
	componentDidMount() {
		this.props.testAction();
		this.props.getStatus();
	}

	render() {
		console.log(this.props.status);
		return (
			<div align="center">
				<h1>Header {this.props.test}</h1>
				<hr />
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        test: state.base.test,
        status: state.base.status
    };
}

const mapDispatchToProps = {
    testAction,
    getStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);