import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Uploader from './Uploader';

class App extends Component {
	render() {
		return (
			<div align="center">
				<Header />
			    <Uploader />
			</div>
		);
	}
}

export default connect()(App);