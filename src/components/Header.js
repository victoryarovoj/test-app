import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../img/sjwsa-client-logo.png'

class TestHeader extends Component {
	constructor(props) {
    	super(props);
    }

    // showLang () {
    // 	return this.props.locales.map ((translation) => {
    // 		return (
    // 			<button className="btn btn-default" style={{marginLeft: "7px"}} text={translation}></button>
    // 		);
    // 	});
    // }

    // {this.showLang()}

    // <span id="titleCipherBis" style={{padding: "10px"}}>{this.props.locales.common.titleCipherBis}</span>
    // <span id="serviceNotConnected">{this.props.locales.common.serviceNotConnected}</span>
    // <a href="jnlp/sjwsa-cipher.jnlp" id="personalDsService">{this.props.locales.common.personalDsService}</a>
	render() {
		
		return (
			<div className="container" style={{width: "970px"}}>
			    <div className="row mtb-default">
			        <div className="col-xs-1 text-left">
			            <img src={logo} width="64" height="64" alt="Logo" />
			        </div>
			        <div className="col-xs-8 text-left">
			            <h3 className="mtb-default" id="clientForService"></h3>
			            
			        </div>
			        <div className="col-xs-3 text-center text-muted">
			            <div className="serviceDisconnected" id="serviceConnectionStatus" align="right">
			                
			            </div>
			        </div>
			    </div>
			    <div className="row">
			        <div id="languageButtonLine" className="col-xs-12 text-right">
			        	
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
        locales: state.i18n,
        dafaultState: state.dafaultState
    }
}

export default connect(mapStateToProps)(TestHeader);