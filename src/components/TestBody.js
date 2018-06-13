import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';

class TestBody extends Component {

	render() {
		return (
			<div id="allTabsContainer">
			    <ul className="nav nav-tabs" role="tablist"></ul>
			    <div className="tab-content">
				    <ul className="nav nav-tabs" role="tablist">
				    	<li className="active" role="presentation">
				    		<a data-toggle="tab" href="#verifyDsTab" aria-controls="verifyDsTab" role="tab" aria-expanded="true">
				    			{i18next.t("verifyDs" : "verifyDs")}
				    		</a>
				    	</li>
				    	<li role="presentation">
				    		<a data-toggle="tab" href="#createDsTab" aria-expanded="true">
				    			{i18next.t("createDs" : "createDs")}
				    		</a>
				    	</li>
				    	<li className="dropdown" role="presentation">
				    		<a className="dropdown-toggle" id="dropDownMenuItemsLabel" data-toggle="dropdown" aria-controls="dropDownMenuItemsContent" aria-expanded="false" role="button">
				    			<span className="caret">
				    			{i18next.t("anotherOperations" : "anotherOperations")}
				    			</span>
				    		</a>
				    		<ui className="dropdown-menu" aria-labelledby="dropDownMenuItemsLabel" id="dropDownMenuItemsContent">
				    			<li>
				    				<a data-toggle="tab" href="#certSignatureInfoTab">
				    					{i18next.t("signatureCertificate" : "signatureCertificate")}
				    				</a>
				    			</li>
				    			<li>
				    				<a data-toggle="tab" href="#certKeyAgreementInfoTab">
				    					{i18next.t("encryptionCertificate" : "encryptionCertificate")}
				    				</a>
				    			</li>
				    			<li>
				    				<a data-toggle="tab" href="#keyGenerationTab">
				    					{i18next.t("keysGeneration" : "keysGeneration")}
				    				</a>
				    			</li>
				    			<li role="presentation">
				    				<a data-toggle="tab" href="#encryptTab" aria-control="#encryptTab">
				    					{i18next.t("encrypt" : "encrypt")}
				    				</a>
				    			</li>
				    			<li role="presentation">
				    				<a data-toggle="tab" href="#decryptTab" aria-control="#decryptTab">
				    					{i18next.t("decrypt" : "decrypt")}
				    				</a>
				    			</li>
				    			<li role="presentation">
				    				<a data-toggle="tab" href="#tsTab" aria-control="#tsTab">
				    					{i18next.t("timestamp" : "timestamp")}
				    				</a>
				    			</li>
				    		</ui>
				    	</li>
				    </ul>
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