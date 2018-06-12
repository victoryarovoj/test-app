import React, { Component } from 'react';
import Header from './Header';
import Uploader from './Uploader';
import '../css/sjwsa-client-0.1.css'

class App extends Component {
	render() {
		return (
			<div>
				<Header />
			    <Uploader />
			</div>
		);
	}
}

export default App;