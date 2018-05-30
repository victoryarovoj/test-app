import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      uuid: null,
      baseUrl: "https://local.cipher.kiev.ua:9091/api/v1/ticket/"
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
    var formData = new FormData();
    formData.append('uploadTicketData', this.state.file);
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
    xhr.send('uploadTicketData': formData);
    this.setMetaData();
  }

  setMetaData(){
    var url;

    url = this.state.baseUrl + this.state.uuid + "/metadata"
      return fetch(url, {
        method: 'PUT',
        dataType: "json",
        data: JSON.stringify({metaData: "testData"})
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
         "embedSignatureTs": "true",
         "embedCertificateType": "signerAndCaCert",
         "signatureType": "DETACHED",
         "dataTsVerifyOption": "IGNORE",
         "embedDataTs": "true",
         "dataToSignQualifier": "ALREADY_SIGNED",
         "duplicateSign": "false"
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
          this.createDS();
        });
    });
  }

  createDS(){
    var url;
    url = this.state.baseUrl + this.state.uuid + "/ds/creator"

    return fetch(url, {
      method: 'POST',
      dataType: "json",
      headers: {
          'Content-Type': "text/plain"
      }
    }).then((response) => {
      response.json().then((response) => {
        console.log(response);
        this.getDSData();
      });
    });
  }

  getDSData(){
    var url, message, deleteSession;

    url = this.state.baseUrl + this.state.uuid;

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

  getStatus() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/status", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
        console.log(response);
      });
    });
  }

  getFeatures() {
    return fetch("https://local.cipher.kiev.ua:9091/api/v1/features", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
        console.log(response);
      });
    });
  }

  render() {
    return (
      <div>
          <div className="container">
            <div className="row">
              <div className="col-4">
              <div className="card">
                <div className="card-header">
                  Options
                </div>
                <div className="card-body">
                  <div className="col-6">
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
                  <button onClick={this.getFeatures.bind(this)}>getFeatures</button>
                  
                </div>
            </div>
          </div>
        </div>
      )
    }
}

export default Uploader;