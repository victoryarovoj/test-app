import i18next from 'i18next'

export const testAction = () => (dispatch) => {
    dispatch({
        type: 'TEST_ACTION',
        payload: 123
    })
}

export const getStatus = () => (dispatch) => {
	fetch("https://local.cipher.kiev.ua:9091/api/v1/status", {
			method: 'GET'
		}).then((response) => {

		response.json().then((response) => {
				dispatch({
			    type: 'GET_STATUS',
			    payload: response
			})
		});
    });
}

export const connectionStatus = () => (dispatch) => {
    var readyStateChanged, url, xhr, reponseStatus;
        
        url = "https://local.cipher.kiev.ua:9090/api/v1/status"
        xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Content-type", "application/json");

        readyStateChanged = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    reponseStatus = true;
                } else {
                    reponseStatus = false;
                }
                dispatch({
                    type: 'CONNECTION_STATUS',
                    payload: reponseStatus
                })

            }
        };

        readyStateChanged = readyStateChanged.bind(this);

        xhr.onreadystatechange = readyStateChanged;
        xhr.send();
}

export const availabelesContainers = () => (dispatch) => {
    return fetch("https://local.cipher.kiev.ua:9090/api/v1/certificateAuthority/supported", {
      method: 'GET'
      }).then((response) => {
      
      response.json().then((response) => {
            dispatch({
                type: 'AVAILABELES_CONTAINERS',
                payload: response
            })
      });
    });
}

export const setKCValue = (caId, privateKeyContainerPass, privateKeyFileContainer) => (dispatch) => {
    dispatch({
        type: 'SET_PK_VALUE',
        payload: {caId, privateKeyContainerPass, privateKeyFileContainer}
    })
}

export const setSelectedContainer = (container) => (dispatch) => {
    dispatch({
        type: 'SELECTED_CONTAINER',
        payload: container
    })
}

export const getFeatures = () => (dispatch) => {
	return fetch("https://local.cipher.kiev.ua:9091/api/v1/features", {
      method: 'GET'
      	}).then((response) => {
      		response.json().then((response) => {
				dispatch({
			    type: 'GET_FEATURES',
			    payload: response
			})
		});
    });
}

export const getLanguage = () => (dispatch) => {
    var url = window.location.search;
    var re = /\?.*language=([\w]{2})/;
    var res = url.match(re);
    var lang = "uk";
        if (res) {
            lang =res[1];
        }

        //console.log("discovered language: " + lang);

    return dispatch({
        type: 'GET_LANGUAGE',
        payload: lang
    })
}

export const getLocaleResourcePath = (lng) => (dispatch) => {
    var baseUrl = window.location.pathname;
    var path;

    if (baseUrl.match(new RegExp("instances"))) {
        path = "../locales/{{lng}}/{{ns}}.json";
    } else {
        path = "locales/{{lng}}/{{ns}}.json";
    }

    return dispatch({
        type: 'GET_LOCALE_RESOURCE_PATH',
        payload: path
    })
}

export const getKeyProfilesFields = (profile) => (dispatch) => {

    return dispatch({
        type: 'GET_KEY_PROFILES_FIELDS',
        payload: profile
    })
}

export const languageSwitchItem = (aDisplayTitle, aLanguageCode, aItems) => (dispatch) => {
    this.items = aItems;
    this.displayTitle = aDisplayTitle;
    this.languageCode = aLanguageCode;

    i18next.changeLanguage(this.languageCode);

    return dispatch({
        type: 'LANGUAGE_SWITCH_ITEM',
        payload: this.items
    })
}

export const testInit = () => (dispatch) => {
	dispatch({
        type: 'TEST_INIT',
        payload: {
        SignatureType: {
            ATTACHED: "attached",
            DETACHED: "detached"
        },
        DataToSignQualifier: {
            NOT_SIGNED_BEFORE: "notSignedBefore",
            ALREADY_SIGNED:"alreadySigned"
        },
        EmbedSertificateType: {
            SIGNER: "signerCert",
            SIGNER_AND_CA_CERT: "signerAndCaCert",
            SIGNER_CERT_AND_CA_INFO: "signerCertAndCaInfo",
            NOTHING: "nothing"
        },
        SignatureVerifyOption: {
            IGNORE: "ignore",
            VERIFY_IF_PRESENT: "verifyIfPresent",
            VERIFY_OR_FAIL_IF_NOT_PRESENT: "verifyOrFailIfNotPresent"
        },
        TextDataEncoding: {
            UTF8: "UTF-8",
            UTF16LE: "UTF-16LE"
        },
        TicketState: {
            OPEN: "1",
            CLOSED: "0"
        },
        Enviroment: {
            SERVICE_BASE_URL: "https://local.cipher.kiev.ua:9091/api/v1"
        },
        MessageSeverity: {
            INFO: "INFO",
            WARN: "WARNING",
            ERROR: "ERROR"
        },
        ServiceFeature: {
            DS_CREATE_OPT: "DS_CREATE_OPT",
            DS_VERIFY_OPT: "DS_VERIFY_OPT",
            TS_CREATE_OPT: "TS_CREATE_OPT",
            TS_VERIFY_OPT: "TS_VERIFY_OPT",
            KEYS_GENERATION_OPT: "KEYS_GENERATION_OPT",
            START_KEYS_CHANGE_OPT: "START_KEYS_CHANGE_OPT",
            KEYS_CHANGE_OPT: "KEYS_CHANGE_OPT",
            VOID_AUTOSTART_OPT: "VOID_AUTOSTART_OPT",
            IIT_KEYS_OPT: "IIT_KEYS_OPT",
            CERT_SIGNATURE_INFO_OPT: "CERT_SIGNATURE_INFO_OPT",
            CERT_KEYAGREEMENT_INFO_OPT: "CERT_KEYAGREEMENT_INFO_OPT",
            CERT_INFO_OPT: "CERT_INFO_OPT",
            HTTP_PROXY_OPT: "HTTP_PROXY_OPT",
            ENCRYPT: "ENCRYPT",
            DECRYPT: "DECRYPT"
        }
    }
    })
}