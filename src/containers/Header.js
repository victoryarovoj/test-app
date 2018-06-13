import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction, getStatus, getFeatures, testInit, getLanguage, getLocaleResourcePath, languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import TestHeader from '../components/Header';
import TestBody from '../components/TestBody';

class Header extends Component {

	componentDidMount() {
		var availableLanguege = [];
		this.props.actions.languageSwitchItem('укр', 'uk', availableLanguege);
		// this.props.testAction();
		// this.props.getStatus();
		// this.props.getFeatures();
		// this.props.testInit();
		// this.props.getLanguage();
		// this.props.getLocaleResourcePath(this.props.getLanguage());
	}
	// <TestHeader />

	changeLang(lang){
		var availableLanguege = [];
        this.props.actions.languageSwitchItem('eng', lang, availableLanguege);
        
    }

	render() {
		return (
			<div className="container" style={{width: "970px"}}>
				<TestHeader />
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
        locales: state.i18n,
        localesReducer: state.localesReducer,
        context: state.base.context,
        dafaultState: state.dafaultState
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
        testAction,
	    getStatus,
	    getFeatures,
	    testInit,
	    getLanguage,
	    getLocaleResourcePath,
	    languageSwitchItem
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);