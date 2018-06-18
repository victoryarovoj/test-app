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
			keysProfiles: [],
			selectedKey: "",
			selectedKeyValue: null,
			baseUrl: "https://local.cipher.kiev.ua:9090/api/v1/ticket/",
			file: null,
      		uuid: null,
			defaultKeyValues:[
					"[файл на диску]",
				"active",
			  	"pasive"
			]
	    }

	    this.onFormSubmit = this.onFormSubmit.bind(this);
	    this.onDropdownSelected = this.onDropdownSelected.bind(this);

	    this.createSession = this.createSession.bind(this);
	    this.sendData = this.sendData.bind(this);

	    this.onChange = this.onChange.bind(this);
	    this.sendSessionData = this.sendSessionData.bind(this);

	    this.createDS = this.createDS.bind(this);
	    this.getDSData = this.getDSData.bind(this);

	    this.sendKeyData = this.sendKeyData.bind(this);
	}


componentDidMount() {
    return fetch("https://local.cipher.kiev.ua:9090/api/v1/certificateAuthority/supported", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var ca = response.ca;
      	console.log(ca)
      	this.setState({listCSK:ca});
      });
    });
}

onFormSubmit(e) {
    e.preventDefault();

    this.createSession();
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
    
    
  }

  onDropdownSelected(e) {
    
    this.setState({selectedKey: e.target.value});

    //here you will see the current selected value of the select input
}

createSession(){
	return fetch(this.state.baseUrl, {
	    method: 'POST',
	    dataType: "json"
	  },).then(response => {
	if (response.ok) {
	    response.json().then(json => {
	      this.setState({uuid:json.ticketUuid});
	      console.log(json.message);
	      this.sendData();
	    });
	  }
	});
}

sendData(){
    var url, dsData;
    url = this.state.baseUrl + this.state.uuid + "/data"

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-type", "application/octet-stream");
    xhr.onload = function() {
      console.log(xhr);
        if (xhr.status === 200) {
          dsData = xhr.response;
          console.log(dsData);
        }
    };
    xhr.send(this.state.file);
    this.sendSessionData();
}

sendSessionData(){
    var selectedOptions, url;
      selectedOptions = {
        "signatureTsVerifyOption": "IGNORE",
         "embedSignatureTs": "true",
         "embedCertificateType": "signerAndCaCert",
         "signatureType": "DETACHED",
         "dataTsVerifyOption": "IGNORE",
         "embedDataTs": "true",
         "dataToSignQualifier": "ALREADY_SIGNED",
         "duplicateSign": "false",
         "caId": this.state.selectedKey
    }

    url = this.state.baseUrl + this.state.uuid + "/option";
      return fetch(url, {
        method: 'PUT',
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedOptions)
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
          this.sendKeyData();
        });
    });
  }

sendKeyData(){
    var url, dsData;
    url = this.state.baseUrl + this.state.uuid + "/keyStore"

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-type", "application/octet-stream");
    xhr.onload = function() {
      console.log(xhr);
        if (xhr.status === 200) {
          dsData = xhr.response;
          console.log(dsData);
        }
    };
    xhr.send(this.state.file);
    this.createDS();
  }

createDS(){
    var url;
    url = this.state.baseUrl + this.state.uuid + "/ds/creator"

    return fetch(url, {
      method: 'POST',
      dataType: "json",
      headers: {
            'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({keyStorePassword : "12345677"})
    }).then((response) => {
      response.json().then((response) => {
        console.log(response);
        this.getDSData();
      });
    });
  }

  getDSData(){
    var url, message, deleteSession, setBlobData, localThis;

    url = this.state.baseUrl + this.state.uuid;
    localThis = this;

    deleteSession = function() {
        return fetch(url, {
          method: "DELETE",
          dataType: "json",
          cache: "no-cache",
        }).then((response) => {
          response.json().then((response) => {
            console.log(response);
          });
      });
    }

    setBlobData = function(data) {
      // return this.setState({blobData:data});
      localThis.setState({blobData:data});

    }

    var xhr = new XMLHttpRequest();
    var requestUrl = url  + "/ds/data";
    xhr.open("GET", requestUrl);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (xhr.status === 200) {
          var dsData = xhr.response;
          message = "Данные ЭЦП успешно получены.";
          console.log(message);
          console.log(dsData);
          deleteSession();
          setBlobData(dsData);
      } else {
          var reader = new FileReader();
          reader.onload = function() {
              var response = reader.result;
              console.log(response);
              try {
                  var jsonResponse = JSON.parse(xhr.responseText);
                  message = jsonResponse.message;
              } catch (e) {
                  message = (xhr.responseText === undefined) ? "Ошибка при получении данных ЭЦП." : xhr.responseText;
              }
          }
          reader.readAsText(xhr.response);
      }
    };
    xhr.send();
  }

getCA() {
    return fetch("https://local.cipher.kiev.ua:9090/api/v1/certificateAuthority/supported", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var ca = response.ca;
      	this.setState({listCSK:ca});

      });
    });
  }

  getKeysProfiles() {
    return fetch("https://local.cipher.kiev.ua:9090/api/v1/generator/keysProfiles", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
      	var profiles = response;
      	this.setState({keysProfiles:profiles});
      	console.log(profiles);
      	console.log("THE VAL", this.state.selectedKey);
      });
    });
  }

    getData(){
	    var url, message;
	    url = "https://local.cipher.kiev.ua:9090/api/v1/token/connected"

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
				            	<h5 className="card-title">key props</h5>
				            	<select className="select" style={{textAlign: "center", textAlignLast: "center"}} onChange={this.onDropdownSelected}>
								  {this.state.listCSK.map(function(n) { 
								      return (<option value={n.id}>{n.name}</option>);
								  })}
								</select>
								<p>
									<select className="select" onChange={this.state.defaultKeyValues}>
									  {this.state.defaultKeyValues.map(function(n, index) { 
									      return (<option value={index}>{n}</option>);
									  })}
									</select>
								</p>
								<p>
									<input type="file" onChange={this.onChange} />
								</p>
								<p>
									<input type="password" />
								</p>
				            	
				            	<ul>
				            		{this.state.keysProfiles.map((item, index) => 
				            			<li onClick={() => this.props.actions.getKeyProfilesFields(item)} key={item.id}>{item.caption}</li>
				            		)}
				            	</ul>
				            	<button onClick={this.getCA.bind(this)}>getCA</button>
				            	<button onClick={this.getKeysProfiles.bind(this)}>getKeysProfiles</button>
				            	<button onClick={this.getData.bind(this)}>getData</button>
				            	<button onClick={this.createSession.bind(this)}>Upload</button>
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