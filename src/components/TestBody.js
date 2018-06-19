import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem, connectionStatus } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import Tabs from './Tabs';
import Pane from './Tab';
import Ts from './Ts';
import Uploader from '../containers/Uploader'
import PrivateKey from './PrivateKey'

class TestBody extends Component {

	render() {
		if (this.props.connectionStatus) {
			return (<div></div>);
		}
		return (
			<div>
				<div id="allTabsContainer">
				<Tabs selected={1}>
				  <Pane label="PrivateKey" role="presentation">
				    <PrivateKey />
				  </Pane>
				  <Pane label={i18next.t("verifyDs" : "verifyDs")} className="tab-content">
				    <Ts />
				  </Pane>
				  <Pane label={i18next.t("createDs" : "createDs")} className="tab-content">
				    <Uploader />
				  </Pane>
				  	<a className="dropdown-toggle" id="dropDownMenuItemsLabel" data-toggle="dropdown" aria-controls="dropDownMenuItemsContent" aria-expanded="false" role="button">
	    				<span className="caret">
							{i18next.t("anotherOperations" : "anotherOperations")}
						</span>
					</a>
				</Tabs>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
    return {
        dafaultState: state.dafaultState,
        connection: state.connectionStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
	    languageSwitchItem,
	    connectionStatus
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestBody);