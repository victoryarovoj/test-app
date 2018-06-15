import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { bindActionCreators } from 'redux';
import { languageSwitchItem, getKeyProfilesFields } from '../actions/test-action';

import Details from '../containers/Details'

class PrivateKey extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      listCSK: [],
	      keysProfiles: []
	    }
	}


getCA() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/certificateAuthority/supported", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var ca = response.ca;
      	this.setState({listCSK:ca});
      });
    });
  }

  getKeysProfiles() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/generator/keysProfiles", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var profiles = response;
      	this.setState({keysProfiles:profiles});
      	console.log(profiles);
      });
    });
  }

    getData(){
	    var url, message;
	    url = "https://local.cipher.kiev.ua:9091/api/v1/token/connected"

	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", url);
	    xhr.setRequestHeader("Content-type", "application/json");
	    xhr.onload = function() {
	      console.log(xhr);
	        if (xhr.status === 200) {
	          var dsData = xhr.response;
	          console.log(dsData);
	        } else {
	          try {
			        var jsonResponse = JSON.parse(xhr.responseText);
			        message = jsonResponse.message;
			    } catch (e) {
			        message = (xhr.responseText == undefined) ? "Ошибка при получении списка подключенных защищенных носителей." : xhr.responseText;
			    }
	      }
	    };
	    xhr.send();
	}

	render() {
		return (
			<div className="row">
			  	<div className="col-4">
			  		<div className="card">
					    <div className="card-header">
					      	session param
					    </div>
			    		<div className="card-body">
			      			<div className="col-10">
			      				<h6 className="card-title">key activation period</h6>
					          	<input type="text" />
					      	</div>
					    </div>
					</div>
					</div>
					<div className="col-8">
						<div className="card">
						    <div className="card-header">
						        key params
						    </div>
				      	<div className="card-body">
				       		<div className="col-10">
				            	<h5 className="card-title">key activation period</h5>
				            	<ul>
				            		{this.state.listCSK.map((item) => 
				            			<li key={item.id}>{item.name}</li>
				            		)}
				            	</ul>
				            	<ul>
				            		{this.state.keysProfiles.map((item, index) => 
				            			<li onClick={() => this.props.actions.getKeyProfilesFields(item)} key={item.id}>{item.caption}</li>
				            		)}
				            	</ul>
				            	<button onClick={this.getCA.bind(this)}>getCA</button>
				            	<button onClick={this.getKeysProfiles.bind(this)}>getKeysProfiles</button>
				            	<button onClick={this.getData.bind(this)}>getData</button>
				        	</div>
				        </div>
				    </div>
				    <Details />
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
	    languageSwitchItem,
	    getKeyProfilesFields
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKey);