import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestBody extends Component {

	render() {
		return (
			<div id="allTabsContainer">
			    <ul className="nav nav-tabs" role="tablist"></ul>
			    <div className="tab-content">
			        <div id="verifyDsTab" role="tabpanel" className="tab-pane fade">
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
export default connect()(TestBody);