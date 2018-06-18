// import React, { Component } from 'react';
// import Header from './Header';
// import Uploader from './Uploader';
// import { createStore, applyMiddleware } from 'redux';
// import reducers from '../reducers';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';


// const store = createStore(reducers, applyMiddleware(thunk));

// class App extends Component {
// 	render() {
// 		return (
// 			<Provider store={store}>
// 				<div>
// 					<Header />
// 				    <Uploader />
// 				</div>
// 			</Provider>
// 		);
// 	}
// }

// export default App;

// <ul className="nav nav-tabs" role="tablist"></ul>
//     <div className="tab-content">
// 	    <ul className="nav nav-tabs" role="tablist">
// 	    	<li role="presentation">
// 	    		<a data-toggle="tab" href="#verifyDsTab" role="tab">
// 	    			{i18next.t("verifyDs" : "verifyDs")}
// 	    		</a>
// 	    	</li>
// 	    	<li role="presentation">
// 	    		<a data-toggle="tab" href="#createDsTab">
// 	    			{i18next.t("createDs" : "createDs")}
// 	    		</a>
// 	    	</li>
// 	    	<li role="presentation">
// 	    		<a className="dropdown-toggle" id="dropDownMenuItemsLabel" data-toggle="dropdown" aria-controls="dropDownMenuItemsContent" aria-expanded="false" role="button">
// 	    			<span className="caret">
// 	    			{i18next.t("anotherOperations" : "anotherOperations")}
// 	    			</span>
// 	    		</a>
// 	    		<ui className="dropdown-menu" aria-labelledby="dropDownMenuItemsLabel" id="dropDownMenuItemsContent">
// 	    			<li>
// 	    				<a data-toggle="tab" href="#certSignatureInfoTab">
// 	    					{i18next.t("signatureCertificate" : "signatureCertificate")}
// 	    				</a>
// 	    			</li>
// 	    			<li>
// 	    				<a data-toggle="tab" href="#certKeyAgreementInfoTab">
// 	    					{i18next.t("encryptionCertificate" : "encryptionCertificate")}
// 	    				</a>
// 	    			</li>
// 	    			<li>
// 	    				<a data-toggle="tab" href="#keyGenerationTab">
// 	    					{i18next.t("keysGeneration" : "keysGeneration")}
// 	    				</a>
// 	    			</li>
// 	    			<li role="presentation">
// 	    				<a data-toggle="tab" href="#encryptTab" aria-control="#encryptTab">
// 	    					{i18next.t("encrypt" : "encrypt")}
// 	    				</a>
// 	    			</li>
// 	    			<li role="presentation">
// 	    				<a data-toggle="tab" href="#decryptTab" aria-control="#decryptTab">
// 	    					{i18next.t("decrypt" : "decrypt")}
// 	    				</a>
// 	    			</li>
// 	    			<li role="presentation">
// 	    				<a data-toggle="tab" href="#tsTab" aria-control="#tsTab">
// 	    					{i18next.t("timestamp" : "timestamp")}
// 	    				</a>
// 	    			</li>
// 	    		</ui>
// 	    	</li>
// 	    </ul>
//     </div>