import React, { Component } from 'react';
import { connect } from 'react-redux';

class Downloads extends Component {
	render () {
		if (!this.props.open) {
			return (<div></div>);
		}
		return (
			<div>
				<div className="col-xs-10 col-xs-offset-1">
		            <h3 className="text-center">
		                <small>
		                    <span id="downloadJwsaByRef"></span><br />
		                    <p>downloadJwsaByRef</p>
		                </small>
		            </h3>
		        </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        connected: state.activeProfile
    }
}

export default connect(mapStateToProps)(Downloads);