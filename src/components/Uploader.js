import React from 'react';
import { connect } from 'react-redux';

class Uploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file:null
    }

    this.uuid;
    this.onLoad = this.onLoad.bind(this)

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.sendSessionData = this.sendSessionData.bind(this)
    this.createData = this.createData.bind(this)
    this.getData = this.getData.bind(this)
    this.setMetaData = this.setMetaData.bind(this)
    // this.deleteSession = this.deleteSession.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.onLoad();
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    var url;
    console.log(this.uuid);

    const formData = new FormData();
    formData.append('file', file);
    url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/data"

      return fetch(url, {
          method: 'POST',
            contentType: false,
          processData: false,
          data: formData
          }).then((response) => {
            console.log(response);
            
            this.setMetaData();
            response.json().then((response) => {
              console.log(response);
            });
      });
    }

  createData(){
    var url;
    console.log(this.uuid);

    url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/ds/creator"

    return fetch(url, {
        method: 'POST',
          dataType: "json",
            headers: {
                'Content-Type': "text/plain"
            }
        }).then((response) => {
          console.log(response);
          
          response.json().then((response) => {
            console.log(response);
            this.getData();
          });
    });
  }

  setMetaData(){
    var url;
    console.log(this.uuid);

    url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/metadata"

    return fetch(url, {
          method: 'PUT',
          dataType: "json",
          data: JSON.stringify({metaData: "test-file.txt"})
        }).then((response) => {
          
          response.json().then((response) => {
            console.log(response);
            this.sendSessionData();
          });
    });
  }

  getData(){
    var url, message;
    url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/ds/data";

    // return fetch(url, {
    //       method: 'GET',
    //       dataType: "application/octet-stream",
    //       cache: 'no-cache'
    //     }).then((response) => {
          
    //       response.json().then((response) => {
    //         console.log(response);
    //       });
    // });

    var xhr = new XMLHttpRequest();
    var requestUrl = url;
    xhr.open("GET", requestUrl);
    xhr.responseType = "blob";
    xhr.onload = function() {
      console.log(xhr);
        if (xhr.status == 200) {
            var dsData = xhr.response;
            message = "Данные ЭЦП успешно получены.";
            this.deleteSession();
        }
    };
    xhr.send();
  }

  deleteSession(){
    var url;
      url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid;

      return fetch(url, {
          method: "DELETE",
          dataType: "json",
          cache: "no-cache",
        }).then((response) => {
          console.log(response);
          response.json().then((response) => {
            console.log(response);
          });
    });
  }

  sendSessionData(){
  var selectedOptions, url;
    selectedOptions = {
      "dataToSignQualifier": "notSignedBefore",
      "signatureTsVerifyOption": "IGNORE",
       "embedSignatureTs": "true",
       "embedCertificateType": "signerAndCaCert",
       "signatureType": "DETACHED",
       "dataTsVerifyOption": "IGNORE",
       "embedDataTs": "true",
       "dataToSignQualifier": "ALREADY_SIGNED",
       "duplicateSign": "false"
  }
    url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/option";

      return fetch(url, {
        method: 'PUT',
          dataType: "json",
          body: JSON.stringify(selectedOptions),
          headers: {
              'Content-Type': 'application/json'
          }
          }).then((response) => {
            response.json().then((response) => {
              console.log(response.settedOptions);
              console.log(response);
              this.createData();
            });
      });
    }

    onChange(e) {
      this.setState({uuid: this.uuid});
    }

    onLoad(){
      return fetch("https://local.cipher.kiev.ua:9091/api/v1/ticket", {
      method: 'POST',
      dataType: "json"
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.uuid = json.ticketUuid;
          this.fileUpload(this.state.file).then((response)=>{
            console.log(response.message);
          })
          // this.fileUpload();
          console.log(json);
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" onChange={this.onChange} />
              <button type="submit">Upload</button>
            </form>
          </div>
          <button onClick={this.deleteSession.bind(this)}>Delete</button>
      </div>
      )
    }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file:null
  //   }

  //   this.onFormSubmit = this.onFormSubmit.bind(this)
  //   this.onChange = this.onChange.bind(this)
  //   this.fileUpload = this.fileUpload.bind(this)
  // }

  // onFormSubmit(e){
  //   e.preventDefault() // Stop form submit

  //   this.fileUpload(this.state.file).then((response)=>{
  //     console.log(response.data);
  //   })
  // }
  // onChange(e) {
  //   this.setState({file:e.target.files[0]})
  // }

  // fileUpload(file){
  //   var url;
  //   console.log('uuid', this.props.uuid);

  //   const formData = new FormData();
  //   formData.append('file', file);
  //   url = "https://local.cipher.kiev.ua:9091/api/v1/ticket/" + this.uuid + "/data"

  //   return fetch("https://local.cipher.kiev.ua:9091/api/v1/ticket/2e4bb73e-0c52-4c7e-aaaa-9b33c67178f6/data", {
  //         type: "POST",
  //         contentType: false,
  //         processData: false,
  //         data: formData
  //       }).then((response) => {
  //         response.json().then((response) => {
  //           console.log(response);
  //         });
  //   });
  // }

  // render() {
  //   return (
  //     <form onSubmit={this.onFormSubmit}>
  //       <h1>File Upload</h1>
  //       <input type="file" onChange={this.onChange} />
  //       <button type="submit">Upload</button>
  //     </form>
  //  )
  // }
}

export default connect(
  state => ({
    tracks: state.tracks
  }),
  dispatch => ({
    onAddTrack: (trackName) => {
      dispatch({ type: 'ADD_TRACK', payload: trackName});
    }
  })
)(Uploader);