const defaultState = {
    caId: null,
    privateKeyContainerPass: null,
    privateKeyFileContainer: null,
    pksc: null,
    baseUrl: "https://local.cipher.kiev.ua:9090/api/v1/",
    ticket: {
        ticketOptions: {
            signatureType: "DETACHED",
            embedSignatureTs: "true",
            embedDataTs: "true",
            embedCertificateType: "signerAndCaCert",
            signatureTsVerifyOption: "IGNORE",
            dataTsVerifyOption: "IGNORE",
            dataToSignQualifier: "ALREADY_SIGNED"
        },
        uuid: null,
        rawData: null,
        metaData: null,
        dsData: null,
        tsData: null,
        ds: null,
        ts: null,
        signedData: null
    },
    blobData: null
}

const clientKCState = (state = defaultState, { type, payload }) => {

    switch (type) {
    	case 'SET_PK_VALUE': {
		    return {
		        ...state,
		        caId: payload.caId,
                privateKeyContainerPass: payload.privateKeyContainerPass,
                privateKeyFileContainer: payload.privateKeyFileContainer

		    }
		}

        default:
            return state;
    }

}

export default clientKCState


