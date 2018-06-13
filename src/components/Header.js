import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next'
import { languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';
import logo from '../img/sjwsa-client-logo.png'

class TestHeader extends Component {
	constructor(props) {
    	super(props);

    }

    changeLang(lang){
		var availableLanguege = ["en", "uk", "pl"];
        this.props.actions.languageSwitchItem('eng', lang, availableLanguege);
        
    }

	render() {
		return (
			<div>
			    <div className="row mtb-default">
			        <div className="col-xs-1 text-left">
			            <img src={logo} width="64" height="64" alt="Logo" />
			        </div>
			        <div className="col-xs-8 text-left">
			            <h3 className="mtb-default" id="clientForService"></h3>
			 			{i18next.t("clientForService" : "clientForService")}
			 			<div className="col-xs-8 text-left">
				            <h3 className="mtb-default" id="titleCipherBis"></h3>
				 			<p>{i18next.t("titleCipherBis" : "titleCipherBis")}</p>
				        </div>
			        </div>
			        
			        <div className="col-xs-3 text-center text-muted">
			            <div className="serviceDisconnected" id="serviceConnectionStatus" align="right">
			                {i18next.t("serviceNotConnected" : "serviceNotConnected")}
			            </div>
			        </div>
			    </div>
			    <div className="row">
			        <div id="languageButtonLine" className="col-xs-12 text-right">
			        	<button onClick={this.changeLang.bind(this, "uk")}>setLng</button>
						<button onClick={this.changeLang.bind(this, "pl")}>setLng</button>
						<button onClick={this.changeLang.bind(this, "en")}>setLng</button>
			        </div>
			    </div>
			    <hr style={{marginTop: "7px", marginBottom: "7px"}} />
			    <div id="topScreen">
			        <div className="col-xs-10 col-xs-offset-1">
			            <h3 className="text-center">
			                <small>
			                    <span id="downloadJwsaByRef"></span><br />
			                    
			                </small>
			            </h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestHeader);