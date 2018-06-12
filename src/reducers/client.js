export default function () {
	return {
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
}