import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
	render() {
		return (
			<div align="center">
				<h1>Header</h1>
			</div>
		);
	}
}

export default connect()(Header);