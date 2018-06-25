import React, { Component } from 'react';
import CardBody from '../containers/CardBody'


class Ts extends Component {

    render() {
        return (
            <div className="container">
	            <div className="row" style={{padding: "10px"}}>
	                <CardBody data={"ping"}/>
	            </div>
	        </div>
        );
    }
}

export default Ts;
