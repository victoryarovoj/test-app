import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import Tabs from './Tabs';
import Pane from './Tab';
import Uploader from '../containers/Uploader'
import PrivateKey from './PrivateKey'

class TestBody extends Component {

	render() {
		return (
			<div>
				<div id="allTabsContainer">
				<Tabs selected={0}>
				  <Pane label="PrivateKey" role="presentation">
				    <PrivateKey />
				  </Pane>
				  <Pane label={i18next.t("verifyDs" : "verifyDs")} className="tab-content">
				    <TestBody />
				  </Pane>
				  <Pane label={i18next.t("createDs" : "createDs")} className="tab-content">
				    <Uploader />
				  </Pane>
				</Tabs>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
    return {
        dafaultState: state.dafaultState
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
	    languageSwitchItem
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestBody);