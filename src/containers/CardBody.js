import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next'

class CardBody extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	fileInput: null,
	    	fileWithDS: null,
			uuid: null,
			baseUrl: "https://local.cipher.kiev.ua:9090/api/v1/ticket/",
			blobData: null
	    }

	    this.onFormSubmit = this.onFormSubmit.bind(this);

	    this.createSession = this.createSession.bind(this);
	    this.sendData = this.sendData.bind(this);

	    this.onChange = this.onChange.bind(this);
	    this.sendSessionData = this.sendSessionData.bind(this);

	    this.verifyData = this.verifyData.bind(this);
	    this.getVerifiedData = this.getVerifiedData.bind(this);


    	this.sendKeyData = this.sendKeyData.bind(this);

	    this.deleteSession = this.deleteSession.bind(this);
	}

	onChange(e) {
	    this.setState({fileInput:e.target.files[0]});
	}

	onChangeDS(e) {
	    this.setState({fileWithDS:e.target.files[0]});
	}

	onFormSubmit() {
	    this.createSession();
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

sendKeyData(){
    var url, dsData, _this, checkInfo;

    checkInfo = function (){
      var url = _this.state.baseUrl + _this.state.uuid + "/keyStore/certificate/info/keyAgreement"

      return fetch(url, {
        method: 'PUT',
        dataType: "json",
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({keyStorePassword: _this.props.clientKCState.privateKeyContainerPass})
      }).then((response) => {
        console.log(response);
        response.json().then((response) => {
        	_this.verifyData();
          console.log(response);
        });
      });
    }

    url = this.state.baseUrl + this.state.uuid + "/keyStore"
    _this = this
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-type", "application/octet-stream");
    xhr.onload = function() {
      console.log(xhr);
        if (xhr.status === 200) {
          dsData = xhr.response;
          checkInfo()
          
          console.log(dsData);
        }
    };
    xhr.send(this.props.clientKCState.privateKeyFileContainer);

  }

	sendData(){
		var url, dsData, _this;
		url = this.state.baseUrl + this.state.uuid + "/data"
		_this = this
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "application/octet-stream");
		xhr.onload = function() {
		  console.log(xhr);
		    if (xhr.status === 200) {
		      dsData = xhr.response;
		      _this.sendKCData();
		      console.log(dsData);
		    }
		};
		xhr.send(this.state.fileInput);

	}

	sendKCData() {
		var url, dsData, _this;
		var xhr = new XMLHttpRequest();
	    url = this.state.baseUrl + this.state.uuid + "/ds/data";
	    _this = this
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "application/octet-stream");
		xhr.onload = function() {
		  console.log(xhr);
		    if (xhr.status === 200) {
		      dsData = xhr.response;
		      _this.sendSessionData();
		      console.log(dsData);
		    }
		};
		xhr.send(this.state.fileWithDS);
	}

  

sendSessionData(){
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

  verifyData(){
    var url;

    url = this.state.baseUrl + this.state.uuid + "/ds/verifier"
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        }
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
          this.getVerifiedData();
        });
    });
  }

   getVerifiedData(){
    var url;

    url = this.state.baseUrl + this.state.uuid + "/ds/verifier"
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
          this.deleteSession();
        });
    });
  }

  deleteSession() {
  	var url;

    url = this.state.baseUrl + this.state.uuid
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

	render () {
		return (
	      <div>
	          <div className="container">
	            <div className="row" style={{padding: "10px"}}>
	              <div className="col-4">
	              <div className="card">
	                <div className="card-header">
	                  Options
	                </div>
	                <div className="card-body">
	                  <div className="col-md-6">
	                      <label><input type="checkbox" /> Option 1</label>
	                      <label><input type="checkbox" /> Option 2</label>
	                      <label><input type="checkbox" /> Option 3</label>
	                  </div>
	                  </div>
	                 </div>
	              </div>
	              <div className="col-8">
	                <div className="card">
	                  <div className="card-header">
	                    File
	                  </div>
	                  <div className="card-body">
	                    <div className="col-10">
	                        <h5 className="card-title">Verify</h5>
	                        <input type="file" onChange={this.onChange} />
	                        <input type="file" onChangeDS={this.onChangeDS} />
	                        <button  onClick={this.onFormSubmit}>Verify</button>
	                    </div>
	                    </div>
	                   </div>
	                  
	                </div>
	            </div>
	          </div>
	        </div>
	    )
	}
}

function mapStateToProps(state) {
    return {
        clientKCState: state.clientKCState
    }
}

export default connect(mapStateToProps)(CardBody);