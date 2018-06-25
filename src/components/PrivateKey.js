import React, { Component } from 'react'
import { connect } from 'react-redux'
// import i18next from 'i18next'
import { bindActionCreators } from 'redux'
import { languageSwitchItem, getKeyProfilesFields, setSelectedContainer, setKCValue, availabelesContainers } from '../actions/test-action'

import Details from '../containers/Details'

class PrivateKey extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
    			listCSK: this.props.keyContainers || [],
    			keysProfiles: [],
    			selectedKeyContainer: this.props.selectedKey || "testIitCa",
    			selectedKeyValue: "testIitCa",
          selectedIndex: 5,
    			baseUrl: "https://local.cipher.kiev.ua:9090/api/v1/ticket/",
    			file: null,
          uuid: null,
          keyStorePassword: "",
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
      this.onDropdownSelected = this.onDropdownSelected.bind(this);
      this.onSelect = this.onSelect.bind(this)
	}


componentDidMount() {
    // return fetch("https://local.cipher.kiev.ua:9090/api/v1/certificateAuthority/supported", {
    //   method: 'GET'
    //   }).then((response) => {
      
    //   response.json().then((response) => {
    //   	var ca = response.ca;
    //   	console.log(ca)
    //   	this.setState({listCSK:ca});
    //     this.setState({selectedKey:ca[5].name});
    //   });
    // });
}

_renderSelect() {

    var optionsState = this.state.selectedKeyContainer
    var arr = [];
    if (this.state.listCSK.ca !== undefined) {
       arr = this.state.listCSK.ca;
    }
    

    function options(child, index) {
      
      return (
        <option key={index} value={child.id} selected={optionsState === child.id}>{child.name}</option>
      );
    }
    return (
        <select className="select" defaultValue={this.state.selectedKeyContainer} style={{textAlign: "center", textAlignLast: "center"}} onClick={this.onDropdownSelected}>
            {arr.map(options.bind(this))}          
        </select>
    );
  }

onFormSubmit() {
    this.setState({keyStorePassword:this.password.value});
    // this.createSession();
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
  }

  confirm() {
      // this.setState({caId:this.state.selectedKeyContainer})
      // this.setState({privateKeyContainerPass:this.password.value})
      // this.setState({privateKeyFileContainer:this.state.file})
      this.props.actions.setKCValue(this.state.selectedKeyContainer, this.password.value, this.state.file)
      this.getCertData()
  }

  onPassChange(e) {
    // this.setState({keyStorePassword:e.target.value})
  }

  onSelect() {

  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    console.log("THE VAL", e.target.selectedIndex);
    this.props.actions.setSelectedContainer(e.target.value)
}

getCertData () {
    var uid, urlKey, deleteSession, checkInfo, createSession,
        url = this.state.baseUrl, sentKC, dsData, _this, urlSession,
        pass = this.state.keyStorePassword, sendSessionData;

    _this = this

    deleteSession = function () {
        return fetch(url + uid, {
          method: "DELETE",
          dataType: "json",
          cache: "no-cache",
        }).then((response) => {
          response.json().then((response) => {
            console.log(response);
          });
      });
    }

    sendSessionData = function (){
      var selectedOptions, url;
        selectedOptions = {
          "signatureTsVerifyOption": "IGNORE",
          "embedSignatureTs": "false",
          "embedCertificateType": "NOTHING",
          "signatureType": "DETACHED",
          "dataTsVerifyOption": "IGNORE",
          "embedDataTs": "false",
          "dataToSignQualifier": "NOT_SIGNED_BEFORE",
          "duplicateSign": "true",
          "caId": "testIitCa"
          
      }

      urlSession = "https://local.cipher.kiev.ua:9090/api/v1/ticket/" + uid + "/option";
        return fetch(urlSession, {
          method: 'PUT',
          dataType: "json",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedOptions)
        }).then((response) => {
          response.json().then((response) => {
            console.log(response);
            sentKC();
          });
      });
    }

    checkInfo = function (){
      var checkUrl = url + uid + "/keyStore/certificate/info/signature"

      return fetch(checkUrl, {
        method: 'PUT',
        dataType: "json",
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({keyStorePassword: _this.password.value})
      }).then((response) => {
        console.log(response);
        response.json().then((response) => {
          console.log(response);
          window.setTimeout(deleteSession, 2500);
          // deleteSession();
        });
      });
    }

    sentKC = function (){
      urlKey = url + uid +  "/keyStore"
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", urlKey);
      xhr.setRequestHeader("Content-type", "application/octet-stream");
      xhr.onload = function() {
        console.log(xhr);
          if (xhr.status === 200) {
            dsData = xhr.response;
            checkInfo()
            console.log(dsData);
          }
      };
      xhr.send(_this.state.file);
    }
    

    createSession = function (){
      return fetch(url, {
          method: 'POST',
          dataType: "json"
        },).then(response => {
      if (response.ok) {
          response.json().then(json => {
            uid = json.ticketUuid;
            console.log(json.message);
            sendSessionData();
          });
        }
      });
    }
    createSession();
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
	    body: JSON.stringify({keyStorePassword : this.state.keyStorePassword})
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
        console.log(ca);
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
              console.log(message);
			    } catch (e) {
			        // message = (xhr.responseText == undefined) ? "Ошибка при получении списка подключенных защищенных носителей." : xhr.responseText;
			    }
	      }
	    };
	    xhr.send();
	}

	render() {
		return (
			<div className="row" style={{padding: "10px"}}>
			  	<div className="col-4">
			  		<div className="card">
					    <div className="card-header">
					      	session param
					    </div>
			    		<div className="card-body">
			      			<div className="col-10">
			      				<h6 className="card-title">key activation period</h6>
                      <div className="col-6">
					          	  <input type="text" />.
                      </div>
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
				            	{this._renderSelect()}
								<p>
									<select className="select" defaultValue={this.state.defaultKeyValues[0]}>
									  {this.state.defaultKeyValues.map(function(n, index) { 
									      return (<option key={index} value={index}>{n}</option>);
									  })}
									</select>
								</p>
								<p>
									<input type="file" onChange={this.onChange} />
								</p>
								<p>
									<input ref={x => this.password = x} type="password" onChange={this.onPassChange} />
								</p>
				            	
				            	<ul>
				            		{this.state.keysProfiles.map((item, index) => 
				            			<li onClick={() => this.props.actions.getKeyProfilesFields(item)} key={item.id}>{item.caption}</li>
				            		)}
				            	</ul>
				            	<button onClick={this.getCA.bind(this)}>getCA</button>
				            	<button onClick={this.getKeysProfiles.bind(this)}>getKeysProfiles</button>
				            	<button onClick={this.confirm.bind(this)}>Confirm</button>
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
        dafaultState: state.dafaultState,
        keyContainers: state.keyContainers,
        selectedKey: state.selectedContainer,
        clientKCState: state.clientKCState
    }
}

const mapDispatchToProps = (dispatch) => {
    const actions = {
	    languageSwitchItem,
	    getKeyProfilesFields,
      availabelesContainers,
      setSelectedContainer,
      setKCValue
    };
    return {
       actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKey);