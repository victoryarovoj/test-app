import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction, getStatus, getFeatures, testInit } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import TestBody from '../components/TestBody';

var Translate = require('react-redux-i18n').Translate;
var Localize = require('react-redux-i18n').Localize;
var I18n = require('react-redux-i18n').I18n;

class Body extends Component {
	constructor(props) {
    	super(props);

    }

	render() {
		return (
			<div>
				<TestBody />
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        test: state.base.test,
        status: state.base.status,
        features: state.base.features,
        // locales: state.i18n.translations,
        context: state.base.context,
        dafaultState: state.dafaultState
    }
}

const mapDispatchToProps = {
    testAction,
    getStatus,
    getFeatures,
    testInit
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);