import React, { Component } from 'react';
import Header from './Header';
import TestBody from '../components/TestBody';


class App extends Component {
	 // <Uploader />
	render() {
		return (
			<div  className="container" style={{width: "970px"}}>
				<Header />
				<TestBody />
			</div>
		);
	}
}

export default App;