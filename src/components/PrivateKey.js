import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { languageSwitchItem } from '../actions/test-action';
import { bindActionCreators } from 'redux';

class PrivateKey extends Component {


getCA() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/certificateAuthority/supported", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var ca = response.ca;
        console.log(ca);
      });
    });
  }

  getKeysProfiles() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/generator/keysProfiles", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var profiles = response;
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
				            	<button onClick={this.getCA.bind(this)}>getCA</button>
				            	<button onClick={this.getKeysProfiles.bind(this)}>getKeysProfiles</button>
				            	<button onClick={this.getData.bind(this)}>getData</button>
				        	</div>
				        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKey);