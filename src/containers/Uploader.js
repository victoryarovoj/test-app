import React from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uuid: null,
      baseUrl: "https://local.cipher.kiev.ua:9090/api/v1/ticket/",
      fileName: null,
      blobData: null
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.createSession = this.createSession.bind(this);
    this.sendData = this.sendData.bind(this);

    this.onChange = this.onChange.bind(this);
    this.sendSessionData = this.sendSessionData.bind(this);

    this.createDS = this.createDS.bind(this);
    this.getDSData = this.getDSData.bind(this);

    this.setMetaData = this.setMetaData.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.createSession();
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
    this.setState({fileName: e.target.files[0].name});
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
          _this.sendSessionData();
          console.log(dsData);
        }
    };
    xhr.send(this.state.file);
    
  }

  setMetaData(){
    var url;

    url = this.state.baseUrl + this.state.uuid + "/metadata"
      return fetch(url, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({metaData: this.state.fileName})
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
          this.sendSessionData();
        });
    });
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
        "caId": this.props.clientKCState.caId
        
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
          _this.createDS();
          console.log(dsData);
        }
    };
    xhr.send(this.props.clientKCState.privateKeyFileContainer);

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
      body: JSON.stringify({keyStorePassword: this.props.clientKCState.privateKeyContainerPass})
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


  

  
  // sendSessionData(){
  //   var selectedOptions, url;
  //     selectedOptions = {
  //       "signatureTsVerifyOption": "IGNORE",
  //       "embedSignatureTs": "true",
  //       "embedCertificateType": "signerAndCaCert",
  //       "signatureType": "DETACHED",
  //       "dataTsVerifyOption": "IGNORE",
  //       "embedDataTs": "true",
  //       "dataToSignQualifier": "ALREADY_SIGNED",
  //       "duplicateSign": "false"
  //   }

  //   url = this.state.baseUrl + this.state.uuid + "/option";
  //     return fetch(url, {
  //       method: 'PUT',
  //       dataType: "json",
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(selectedOptions)
  //     }).then((response) => {
  //       response.json().then((response) => {
  //         console.log(response);
  //         this.createDS();
  //       });
  //   });
  // }

  // createDS(){
  //   var url;
  //   url = this.state.baseUrl + this.state.uuid + "/ds/creator"

  //   return fetch(url, {
  //     method: 'POST',
  //     dataType: "json",
  //     headers: {
  //         'Content-Type': "text/plain"
  //     }
  //   }).then((response) => {
  //     response.json().then((response) => {
  //       console.log(response);
  //       this.getDSData();
  //     });
  //   });
  // }

  // getDSData(){
  //   var url, message, deleteSession, setBlobData, localThis;

  //   url = this.state.baseUrl + this.state.uuid;
  //   localThis = this;

  //   deleteSession = function() {
  //       return fetch(url, {
  //         method: "DELETE",
  //         dataType: "json",
  //         cache: "no-cache",
  //       }).then((response) => {
  //         response.json().then((response) => {
  //           console.log(response);
  //         });
  //     });
  //   }

    

  //   var xhr = new XMLHttpRequest();
  //   var requestUrl = url  + "/ds/data";
  //   xhr.open("GET", requestUrl);
  //   xhr.responseType = "blob";
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //         var dsData = xhr.response;
  //         message = "Данные ЭЦП успешно получены.";
  //         console.log(message);
  //         console.log(dsData);
  //         deleteSession();
  //         setBlobData(dsData);
  //     } else {
  //         var reader = new FileReader();
  //         reader.onload = function() {
  //             var response = reader.result;
  //             console.log(response);
  //             try {
  //                 var jsonResponse = JSON.parse(xhr.responseText);
  //                 message = jsonResponse.message;
  //             } catch (e) {
  //                 message = (xhr.responseText === undefined) ? "Ошибка при получении данных ЭЦП." : xhr.responseText;
  //             }
  //         }
  //         reader.readAsText(xhr.response);
  //     }
  //   };
  //   xhr.send();
  // }

  getStatus() {
    fetch("https://local.cipher.kiev.ua:9091/api/v1/status", {
        method: 'GET'
      }).then((response) => {

      response.json().then((response) => {
        console.log(response);
        return response;
      });
    });
  }

  

  getFeatures() {
    var uid, deleteSession, checkInfo, createSession,
        url = this.state.baseUrl,
        pass = this.props.clientKCState.privateKeyContainerPass,
        signature = this.props.clientKCState.caId;

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

    checkInfo = function (){
      var checkUrl = url + uid + "/keyStore/certificateInfo/detached"

      return fetch(checkUrl, {
        method: 'PUT',
        dataType: "json",
        headers: {
              'Content-Type': 'application/json'
        },
        body: JSON.stringify({keyStorePassword: pass})
      }).then((response) => {
        response.json().then((response) => {
          console.log(response);
          deleteSession();
        });
      });
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
            checkInfo();
          });
        }
      });
    }
    createSession();
  }

  getBlobData() {
    var saveBlob = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (blob, fileName) {
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    saveBlob(this.state.blobData, this.state.fileName + ".p7s");
  }

  render() {
    
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
                        <h5 className="card-title">File for create digital stamp</h5>
                        <input type="file" onChange={this.onChange} />
                        <button onClick={this.createSession.bind(this)}>Upload</button>
                    </div>
                    </div>
                   </div>
                  <button type="button" onClick={this.getStatus.bind(this)}>getStatus</button>

                  <button onClick={this.getBlobData.bind(this)}>getBlobData</button>
                  
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
                  // <button onClick={this.getFeatures.bind(this)}>certInfo</button>

export default connect(mapStateToProps)(Uploader);