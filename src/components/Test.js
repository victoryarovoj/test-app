import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testInit } from '../actions/test-action';
import $ from 'jquery';

class sjwsa extends Component {
    constructor(props) {
        super(props);

    this.state = {
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



    console.log(this.state);



    // props.SignatureType = {};
    // props.SignatureType.ATTACHED = "attached";
    // props.SignatureType.DETACHED = "detached";

    // props.DataToSignQualifier = {};
    // props.DataToSignQualifier.NOT_SIGNED_BEFORE = "notSignedBefore";
    // props.DataToSignQualifier.ALREADY_SIGNED = "alreadySigned";

    // props.EmbedSertificateType = {};
    // props.EmbedSertificateType.SIGNER = "signerCert";
    // props.EmbedSertificateType.SIGNER_AND_CA_CERT = "signerAndCaCert";
    // props.EmbedSertificateType.SIGNER_CERT_AND_CA_INFO = "signerCertAndCaInfo";
    // props.EmbedSertificateType.NOTHING = "nothing";

    // props.SignatureVerifyOption = {};
    // props.SignatureVerifyOption.IGNORE = "ignore";
    // props.SignatureVerifyOption.VERIFY_IF_PRESENT = "verifyIfPresent";
    // props.SignatureVerifyOption.VERIFY_OR_FAIL_IF_NOT_PRESENT = "verifyOrFailIfNotPresent";

    // props.TextDataEncoding = {};
    // props.TextDataEncoding.UTF8 = "UTF-8";
    // props.TextDataEncoding.UTF16LE = "UTF-16LE";

    // props.TicketState = {};
    // props.TicketState.OPEN = "1";
    // props.TicketState.CLOSED = "0";

    // props.Enviroment = {};
    // props.Enviroment.SERVICE_BASE_URL = "https://local.cipher.kiev.ua:9091/api/v1";

    // props.MessageSeverity = {};
    // props.MessageSeverity.INFO = "INFO";
    // props.MessageSeverity.WARN = "WARNING";
    // props.MessageSeverity.ERROR = "ERROR";

    props.ServiceFeature = {};
    props.ServiceFeature.DS_CREATE_OPT = "DS_CREATE_OPT";
    props.ServiceFeature.DS_VERIFY_OPT = "DS_VERIFY_OPT";
    props.ServiceFeature.TS_CREATE_OPT = "TS_CREATE_OPT";
    props.ServiceFeature.TS_VERIFY_OPT = "TS_VERIFY_OPT";
    props.ServiceFeature.KEYS_GENERATION_OPT = "KEYS_GENERATION_OPT";
    props.ServiceFeature.START_KEYS_CHANGE_OPT = "START_KEYS_CHANGE_OPT";
    props.ServiceFeature.KEYS_CHANGE_OPT = "KEYS_CHANGE_OPT";
    props.ServiceFeature.VOID_AUTOSTART_OPT = "VOID_AUTOSTART_OPT";
    props.ServiceFeature.IIT_KEYS_OPT = "IIT_KEYS_OPT";
    props.ServiceFeature.CERT_SIGNATURE_INFO_OPT = "CERT_SIGNATURE_INFO_OPT";
    props.ServiceFeature.CERT_KEYAGREEMENT_INFO_OPT = "CERT_KEYAGREEMENT_INFO_OPT";
    props.ServiceFeature.CERT_INFO_OPT = "CERT_INFO_OPT";
    props.ServiceFeature.HTTP_PROXY_OPT = "HTTP_PROXY_OPT";
    props.ServiceFeature.ENCRYPT = "ENCRYPT";
    props.ServiceFeature.DECRYPT = "DECRYPT";

    props.Encoders = {};
    // props.Encoders[props.TextDataEncoding.UTF8] = new StringEncoder("UTF-8", true);
    // props.Encoders[props.TextDataEncoding.UTF16LE] = new StringEncoder("UTF-16LE", true);

    props.LogMessage = function (aMessage, aSeverity, aHttpStatusCode) {
        if (aSeverity == undefined) {
            aSeverity = props.MessageSeverity.INFO;
        }
        if (aHttpStatusCode == undefined) {
            aHttpStatusCode = 0;
        }
        this.message = aMessage;
        this.severity = aSeverity;
        if (aHttpStatusCode > 0) {
            this.httpStatusCode = aHttpStatusCode;
        }
    };

    props.consoleLogger = function (aLogMessage) {
        if (aLogMessage.message == undefined) {
            return;
        }
        var message;
        var d = new Date();
        var dateTimeString = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        message = dateTimeString + " ";
        if (aLogMessage.severity != undefined) {
            message = message + aLogMessage.severity + " ";
        }
        if (aLogMessage.httpStatusCode != undefined) {
            message = message + "HttpStatusCode: " + aLogMessage.httpStatusCode + " ";
        }
        message = message + aLogMessage.message;
        console.log(message);
    };

    props.Enviroment.logMessageListener = [props.consoleLogger];

    props.Enviroment.propagateLogMessage = function (aLogMessage) {
        if (!aLogMessage instanceof props.LogMessage) {
            return;
        }
        for (var i = 0; i < props.Enviroment.logMessageListener.length; i++) {
            props.Enviroment.logMessageListener[i](aLogMessage);
        }
    };

    props.Enviroment.addLogListener = function (aListener) {
        if (aListener instanceof Function) {
            props.Enviroment.logMessageListener.push(aListener);
        }
    };

    props.Enviroment.getServiceStatus = function () {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/status";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
                contentType: "text/plain",
                timeout: 10000
            }).done(function (jsonData, textStatus, xhr) {
                resolve();
            }).fail(function (xhr) {
                reject();
            });
        });
    };

    props.Enviroment.getServiceFeatures = function () {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/features";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
                contentType: "text/plain",
                timeout: 5000
            }).done(function (jsonResponse, textStatus, xhr) {
                resolve(jsonResponse);
            }).fail(function (xhr) {
                reject();
            });
        });
    }

    props.Enviroment.getKeyGenerationProfiles = function () {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/generator/keysProfiles";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    "Дані профайлів генерації ключів успішно отримані",
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve(jsonResponse);
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при отриманні профайлів генерації ключів." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        });
    }

    props.Enviroment.generateKeys = function (data) {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/generator/creator";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json", // expected format for response
                contentType: "application/json", // send as JSON
                cache: false,
                data: JSON.stringify(data)
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                    message.failureCouse = jsonResponse.failureCause;
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка в процесі генерації ключів." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject((message.failureCouse == undefined) ? message.message : message.message + "\n" + message.failureCouse);
                }
            });
        });
    }

    props.Enviroment.getCertificateInfo = function (keyType) {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/certificateInfo/" + keyType;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    "Дані сертифіката успішно отримані",
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve(jsonResponse);
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при отриманні даних сертифіката." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        });
    };


    props.Ticket = function () {
        this.signatureType = props.SignatureType.DETACHED;
        this.embedSignatureTs = false;
        this.embedDataTs = false;
        this.embedCertificateType = props.EmbedSertificateType.NOTHING;
        this.signatureTsVerifyOption = props.SignatureVerifyOption.IGNORE;
        this.dataTsVerifyOption = props.SignatureVerifyOption.IGNORE;
        this.dataToSignQualifier = props.DataToSignQualifier.NOT_SIGNED_BEFORE;
        this.uuid = null;
        this.rawData = null;
        this.metaData = null;
        this.dsData = null;
        this.tsData = null;
        this.ds = null;
        this.ts = null;
        this.signedData = null;
    };

    props.Ticket.prototype.isActive = function () {
        return !(this.uuid == null || this.uuid == undefined)
    };

    props.Ticket.prototype.open = function () {
        if (this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json", // expected format for response
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message + " UUID: " + jsonResponse.ticketUuid,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                linkedObject.uuid = jsonResponse.ticketUuid;
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при створенні сесії." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            })
        })
    };


    props.Ticket.prototype.close = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid;
        var linkedObject = this;
        $.ajax({
            url: requestUrl,
            type: "DELETE",
            dataType: "json" // expected format for response
        }).done(function (jsonResponse, textStatus, xhr) {
            var message = new props.LogMessage(
                jsonResponse.message + " UUID: " + jsonResponse.ticketUuid,
                props.MessageSeverity.INFO,
                xhr.status
            );
            props.Enviroment.propagateLogMessage(message);
            linkedObject.uuid = null;
        }).fail(function (xhr) {
            var message;
            try {
                var jsonResponse = JSON.parse(xhr.responseText);
                message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.ERROR,
                    xhr.status
                );
            } catch (e) {
                message = new props.LogMessage(
                    (xhr.responseText == undefined) ? "Помилка при видаленні сесії." : xhr.responseText,
                    props.MessageSeverity.ERROR,
                    xhr.status
                );
            } finally {
                props.Enviroment.propagateLogMessage(message);
            }
        });
    };

    props.Ticket.prototype.updateMetadata = function () {
        if (!this.isActive() || this.metaData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/metadata";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "PUT",
                dataType: "json", // expected format for response
                contentType: "application/json", // send as JSON
                cache: false,
                data: JSON.stringify({metaData: linkedObject.metaData})
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при завантаженні метаданих." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        });
    };

    props.Ticket.prototype.uploadData = function () {
        if (!this.isActive() || this.rawData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: 'POST',
                data: linkedObject.rawData,
                contentType: "application/octet-stream",
                processData: false
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при завантаженні даних cесії." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.createDs = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/creator";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при ініціації створення ЕЦП." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.downloadDsData = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (xhr.status == 200) {
                    linkedObject.ds = xhr.response;
                    var message = new props.LogMessage(
                        "Дані ЕЦП успішно отримані.",
                        props.MessageSeverity.INFO,
                        xhr.status
                    );
                    props.Enviroment.propagateLogMessage(message);
                    resolve();
                } else {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(response);
                            message = new props.LogMessage(
                                jsonResponse.message,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } catch (e) {
                            message = new props.LogMessage(
                                (xhr.responseText == undefined) ? "Помилка при отриманні даних ЕЦП." : xhr.responseText,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } finally {
                            props.Enviroment.propagateLogMessage(message);
                            reject();
                        }
                    };
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        })
    };

    props.Ticket.prototype.downloadSigneData = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/signedData";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function () {
                var message;
                if (xhr.status == 200) {
                    linkedObject.signedData = xhr.response;
                    message = new props.LogMessage(
                        "Дані з вбудованого цифрового підпису успішно отримані.",
                        props.MessageSeverity.INFO,
                        xhr.status
                    );
                    props.Enviroment.propagateLogMessage(message);
                    resolve(message);
                } else {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(response);
                            message = new props.LogMessage(
                                jsonResponse.message,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } catch (e) {
                            message = new props.LogMessage(
                                (xhr.responseText == undefined) ? "Помилка при отриманні даних з вбудованого цифрового підпису." : xhr.responseText,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } finally {
                            props.Enviroment.propagateLogMessage(message);
                            reject(message);
                        }
                    };
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        })
    };

    props.Ticket.prototype.setOption = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/option";
        var selectedOptions = {
            signatureType: this.signatureType,
            embedCertificateType: this.embedCertificateType,
            embedSignatureTs: this.embedSignatureTs,
            embedDataTs: this.embedDataTs,
            signatureTsVerifyOption: this.signatureTsVerifyOption,
            dataTsVerifyOption: this.dataTsVerifyOption,
            dataToSignQualifier: this.dataToSignQualifier
        };
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "PUT",
                dataType: "json", // expected format for response
                contentType: "application/json", // send as JSON
                cache: false,
                data: JSON.stringify(selectedOptions)
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при встановленні налаштувань сесії." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.uploadDsData = function () {
        if (!this.isActive() || this.dsData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "application/octet-stream",
                processData: false,
                data: linkedObject.dsData
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при завантаженні даних ЕЦП." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.verifyDs = function () {
        if (!this.isActive() || this.dsData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/verifier";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при перевірці ЕЦП." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.getVerifyDsResult = function () {
        if (!this.isActive() || this.dsData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/verifier";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve(jsonResponse.verifyResults);
            }).fail(function (xhr) {
                var message;
                var jsonResponse = null;
                try {
                    jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при отриманні результата перевірки ЕЦП." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject(jsonResponse.verifyResults);
                }
            });
        })
    };

    props.Ticket.prototype.createTs = function () {
        if (!this.isActive() || this.rawData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/creator";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при ініціації створення позначки часу." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.downloadTsData = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (xhr.status == 200) {
                    linkedObject.ts = xhr.response;
                    var message = new props.LogMessage(
                        "Дані позначки часу успішно отримані.",
                        props.MessageSeverity.INFO,
                        xhr.status
                    );
                    props.Enviroment.propagateLogMessage(message);
                    resolve();
                } else {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(response);
                            message = new props.LogMessage(
                                jsonResponse.message,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } catch (e) {
                            message = new props.LogMessage(
                                (xhr.responseText == undefined) ? "Помилка при отриманні даних позначки часу." : xhr.responseText,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } finally {
                            props.Enviroment.propagateLogMessage(message);
                            reject();
                        }
                    };
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        });
    };

    props.Ticket.prototype.uploadTsData = function () {
        if (!this.isActive() || this.tsData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "application/octet-stream",
                processData: false,
                data: linkedObject.tsData
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при завантаженні даних позначки часу." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.verifyTs = function () {
        if (!this.isActive() || this.tsData == null || this.rawData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/verifier";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при перевірці позначки часу." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.getVerifyTsResult = function () {
        if (!this.isActive() || this.tsData == null || this.rawData == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/verifier";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
                cache: false
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при отриманні результата перевірки позначки часу." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    // ----- encryption and decryption
    props.Ticket.prototype.uploadRecipientCertificate = function () {
        if (!this.isActive() || this.recipientCertificates == null) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor/certificates";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: 'POST',
                data: linkedObject.recipientCertificates,
                contentType: "application/octet-stream",
                processData: false
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при завантаженні сеотифікатів отримувачів шифрованих даних." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.encrypt = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка ініціації шифрування даних." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    props.Ticket.prototype.downloadEncryptedData = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (xhr.status == 200) {
                    linkedObject.encryptedData = xhr.response;
                    var message = new props.LogMessage(
                        "Шифровані дані успішно отримані.",
                        props.MessageSeverity.INFO,
                        xhr.status
                    );
                    props.Enviroment.propagateLogMessage(message);
                    resolve();
                } else {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(response);
                            message = new props.LogMessage(
                                jsonResponse.message,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } catch (e) {
                            message = new props.LogMessage(
                                (xhr.responseText == undefined) ? "Помилка при отриманні зашифрованих даних." : xhr.responseText,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } finally {
                            props.Enviroment.propagateLogMessage(message);
                            reject();
                        }
                    };
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        })
    };

    props.Ticket.prototype.downloadDecryptedData = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/decryptor/data";
        var linkedObject = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", requestUrl);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (xhr.status == 200) {
                    linkedObject.decryptedData= xhr.response;
                    var message = new props.LogMessage(
                        "Дешифровані дані успішно отримані.",
                        props.MessageSeverity.INFO,
                        xhr.status
                    );
                    props.Enviroment.propagateLogMessage(message);
                    resolve();
                } else {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var response = reader.result;
                        try {
                            var jsonResponse = JSON.parse(response);
                            message = new props.LogMessage(
                                jsonResponse.message,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } catch (e) {
                            message = new props.LogMessage(
                                (xhr.responseText == undefined) ? "Помилка при отриманні зашифрованих даних." : xhr.responseText,
                                props.MessageSeverity.ERROR,
                                xhr.status
                            );
                        } finally {
                            props.Enviroment.propagateLogMessage(message);
                            reject();
                        }
                    };
                    reader.readAsText(xhr.response);
                }
            };
            xhr.send();
        })
    };

    props.Ticket.prototype.decrypt = function () {
        if (!this.isActive()) {
            return;
        }
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/decryptor";
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка ініціації дешифрування даних." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };

    this.props.getCertificateInBase64 = function (keyType) {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/certificate/base64/" + keyType;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "GET",
                dataType: "json",
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    "Сертифікат у форматі base64 успішно отриманий.",
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve(jsonResponse);
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка при отриманні сертифікаа у форматі base64." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        });
    };

    this.props.setLanguage = function (aLanguageCode) {
        var requestUrl = props.Enviroment.SERVICE_BASE_URL + "/language/" + aLanguageCode;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: requestUrl,
                type: "POST",
                dataType: "json",
                contentType: "text/plain"
            }).done(function (jsonResponse, textStatus, xhr) {
                var message = new props.LogMessage(
                    jsonResponse.message,
                    props.MessageSeverity.INFO,
                    xhr.status
                );
                props.Enviroment.propagateLogMessage(message);
                resolve();
            }).fail(function (xhr) {
                var message;
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    message = new props.LogMessage(
                        jsonResponse.message,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } catch (e) {
                    message = new props.LogMessage(
                        (xhr.responseText == undefined) ? "Помилка встановлення мови сервісу." : xhr.responseText,
                        props.MessageSeverity.ERROR,
                        xhr.status
                    );
                } finally {
                    props.Enviroment.propagateLogMessage(message);
                    reject();
                }
            });
        })
    };
    }
    componentDidMount() {
        this.props.testInit();
    }
}


function mapStateToProps(state) {
    return {
        init: state.base.init
    }
}

const mapDispatchToProps = {
    testInit
};

export default connect(mapStateToProps, mapDispatchToProps)(sjwsa);
