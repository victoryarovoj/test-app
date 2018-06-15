import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {
	render () {
		if (!this.props.active) {
			return (<div></div>);
		}
		return (
			<div>
				<h4>{this.props.active.caption}</h4>
				<ul>
					{this.props.active.fields.map((item, index) => 
            			<li key={index}>{item.name}:  {item.caption}</li>
            		)}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        active: state.activeProfile
    }
}

export default connect(mapStateToProps)(Details);