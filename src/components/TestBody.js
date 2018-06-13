import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';

class TestBody extends Component {
	constructor(props) {
    	super(props);

    }

	render() {
		return (
			<div id="allTabsContainer">
			    <ul className="nav nav-tabs" role="tablist"></ul>
			    <div className="tab-content">
			        <div id="verifyDsTab" role="tabpanel" className="tab-pane fade">
			        <a className="data-toggle tab">{i18next.t("verifyDsTab" : "verifyDsTab")}</a>
			        </div>
			        <div id="createDsTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="tsTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="certSignatureInfoTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="certKeyAgreementInfoTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="keyGenerationTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="decryptTab" role="tabpanel" className="tab-pane fade">
			        </div>
			        <div id="encryptTab" role="tabpanel" className="tab-pane fade">
			        </div>
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