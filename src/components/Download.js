import React, { Component } from 'react';
import { connect } from 'react-redux';

class Downloads extends Component {
	render () {
		if (!this.props.open) {
			return (<div></div>);
		}
		return (
			<div id="topScreen">
		        <div class="col-xs-10 col-xs-offset-1">
		            <h3 class="text-center">
		                <small>
		                    <span id="downloadJwsaByRef"></span><br/>
		                    <a href="jnlp/sjwsa-dev-preview.jnlp" id="personalDsService"></a>
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