import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next'
import { languageSwitchItem, connectionStatus, availabelesContainers } from '../actions/test-action';
import { bindActionCreators } from 'redux';
// import TestBody from './TestBody'
import Downloads from './Download'

import logo from '../img/sjwsa-client-logo.png'


class TestHeader extends Component {

	constructor(props) {
		super(props);

		this.state={
			connected: this.props.connectionStatus
		}
	}

	componentDidMount() {
		let _this = this
		this.checkConnection = () => {
			_this.props.actions.connectionStatus()
			_this.setState({connected: _this.props.connectionStatus});
			setTimeout(this.checkConnection, 10000);
		}

		this.checkConnection();
		this.props.actions.availabelesContainers()
		

		
	}

    changeLang(lang){
		var availableLanguege = ["en", "uk", "pl"];
        this.props.actions.languageSwitchItem('en', lang, availableLanguege);
        console.log(i18next.language);
        
    }

    _renderServiceConnectionStatus() {
    	if (this.props.connectionStatus) {
			return (
				<div className="serviceConnected" id="serviceConnectionStatus" style={{textAlign:"center"}}>
	            	{i18next.t("serviceConnected" : "serviceConnected")}
	            </div>
		    );
		} else {
			return (
	            <div className="serviceDisconnected" id="serviceConnectionStatus" style={{textAlign:"center"}}>
			        {i18next.t("serviceNotConnected" : "serviceNotConnected")}
	            </div>
			);
		}
	}

	render() {
		return (
			<div>			
				<div className="row mtb-default">
			        <div className="col-md-1 text-left">
			            <img src={logo} width="64" height="64" alt="Logo" />
			        </div>
			        <div className="col-md-8 text-left text-muted">
			            <h3 className="mtb-default" id="clientForService">{i18next.t("clientForService" : "clientForService")}</h3>
			            <span id="titleCipherBis">{i18next.t("titleCipherBis" : "titleCipherBis")}</span>
			        </div>
			        <div className="col-md-3  text-center text-muted">
			        	{this._renderServiceConnectionStatus()}
			        </div>
			    </div>
			    <div className="row mtb-default">
			        <div id="languageButtonLine" className="col-md-12 text-md-right">
			        	<button className="btn btn-default" style={{marginLeft: "7px"}} onClick={this.changeLang.bind(this, "uk")}>УКР</button>
						<button className="btn btn-default" style={{marginLeft: "7px"}} onClick={this.changeLang.bind(this, "pl")}>PLN</button>
						<button className="btn btn-default" style={{marginLeft: "7px"}} onClick={this.changeLang.bind(this, "en")}>ENG</button>
			        </div>
			    </div>
			    <hr />
			    <div id="topScreen">
			        <Downloads open={this.props.connectionStatus} />
			    </div>			    
			</div>
		);
	}
}

function mapStateToProps(state) {
    return {
        dafaultState: state.dafaultState,
        connectionStatus: state.connectionStatus,
        availabelesContainers: availabelesContainers
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
	    languageSwitchItem,
	    connectionStatus,
	    availabelesContainers
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestHeader);