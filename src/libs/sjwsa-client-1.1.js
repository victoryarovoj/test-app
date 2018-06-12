/**
 * Created by admin on 28.11.2016.
 */

export const sjwsa = (context) => {
    var getServiceStatus;
    context.SignatureType = {};
    context.SignatureType.ATTACHED = "attached";
    context.SignatureType.DETACHED = "detached";

    context.DataToSignQualifier = {};
    context.DataToSignQualifier.NOT_SIGNED_BEFORE = "notSignedBefore";
    context.DataToSignQualifier.ALREADY_SIGNED = "alreadySigned";

    context.EmbedSertificateType = {};
    context.EmbedSertificateType.SIGNER = "signerCert";
    context.EmbedSertificateType.SIGNER_AND_CA_CERT = "signerAndCaCert";
    context.EmbedSertificateType.SIGNER_CERT_AND_CA_INFO = "signerCertAndCaInfo";
    context.EmbedSertificateType.NOTHING = "nothing";

    context.SignatureVerifyOption = {};
    context.SignatureVerifyOption.IGNORE = "ignore";
    context.SignatureVerifyOption.VERIFY_IF_PRESENT = "verifyIfPresent";
    context.SignatureVerifyOption.VERIFY_OR_FAIL_IF_NOT_PRESENT = "verifyOrFailIfNotPresent";

    context.TextDataEncoding = {};
    context.TextDataEncoding.UTF8 = "UTF-8";
    context.TextDataEncoding.UTF16LE = "UTF-16LE";

    context.TicketState = {};
    context.TicketState.OPEN = "1";
    context.TicketState.CLOSED = "0";

    context.Enviroment = {};
    context.Enviroment.SERVICE_BASE_URL = "https://local.cipher.kiev.ua:9091/api/v1";

    context.MessageSeverity = {};
    context.MessageSeverity.INFO = "INFO";
    context.MessageSeverity.WARN = "WARNING";
    context.MessageSeverity.ERROR = "ERROR";

    context.ServiceFeature = {};
    context.ServiceFeature.DS_CREATE_OPT = "DS_CREATE_OPT";
    context.ServiceFeature.DS_VERIFY_OPT = "DS_VERIFY_OPT";
    context.ServiceFeature.TS_CREATE_OPT = "TS_CREATE_OPT";
    context.ServiceFeature.TS_VERIFY_OPT = "TS_VERIFY_OPT";
    context.ServiceFeature.KEYS_GENERATION_OPT = "KEYS_GENERATION_OPT";
    context.ServiceFeature.START_KEYS_CHANGE_OPT = "START_KEYS_CHANGE_OPT";
    context.ServiceFeature.KEYS_CHANGE_OPT = "KEYS_CHANGE_OPT";
    context.ServiceFeature.VOID_AUTOSTART_OPT = "VOID_AUTOSTART_OPT";
    context.ServiceFeature.IIT_KEYS_OPT = "IIT_KEYS_OPT";
    context.ServiceFeature.CERT_SIGNATURE_INFO_OPT = "CERT_SIGNATURE_INFO_OPT";
    context.ServiceFeature.CERT_KEYAGREEMENT_INFO_OPT = "CERT_KEYAGREEMENT_INFO_OPT";
    context.ServiceFeature.CERT_INFO_OPT = "CERT_INFO_OPT";
    context.ServiceFeature.HTTP_PROXY_OPT = "HTTP_PROXY_OPT";
    context.ServiceFeature.ENCRYPT = "ENCRYPT";
    context.ServiceFeature.DECRYPT = "DECRYPT";

    context.Encoders = {};
    // context.Encoders[context.TextDataEncoding.UTF8] = new StringEncoder("UTF-8", true);
    // context.Encoders[context.TextDataEncoding.UTF16LE] = new StringEncoder("UTF-16LE", true);

    context.LogMessage = function (aMessage, aSeverity, aHttpStatusCode) {
        if (aSeverity == undefined) {
            aSeverity = context.MessageSeverity.INFO;
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

    context.consoleLogger = function (aLogMessage) {
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

    context.Enviroment.logMessageListener = [context.consoleLogger];

    context.Enviroment.propagateLogMessage = function (aLogMessage) {
        if (!aLogMessage instanceof context.LogMessage) {
            return;
        }
        for (var i = 0; i < context.Enviroment.logMessageListener.length; i++) {
            context.Enviroment.logMessageListener[i](aLogMessage);
        }
    };

    context.Enviroment.addLogListener = function (aListener) {
        if (aListener instanceof Function) {
            context.Enviroment.logMessageListener.push(aListener);
        }
    };

    getServiceStatus = function () {
        return fetch("https://local.cipher.kiev.ua:9091/api/v1/status", {
          method: 'GET'
          }).then((response) => {
          
          response.json().then((response) => {
            console.log(response);
          });
        });
    };

    // context.Enviroment.getServiceFeatures = function () {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/features";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //             contentType: "text/plain",
    //             timeout: 5000
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             resolve(jsonResponse);
    //         }).fail(function (xhr) {
    //             reject();
    //         });
    //     });
    // }

    // context.Enviroment.getKeyGenerationProfiles = function () {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/generator/keysProfiles";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 "Дані профайлів генерації ключів успішно отримані",
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve(jsonResponse);
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при отриманні профайлів генерації ключів." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     });
    // }

    // context.Enviroment.generateKeys = function (data) {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/generator/creator";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json", // expected format for response
    //             contentType: "application/json", // send as JSON
    //             cache: false,
    //             data: JSON.stringify(data)
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //                 message.failureCouse = jsonResponse.failureCause;
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка в процесі генерації ключів." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject((message.failureCouse == undefined) ? message.message : message.message + "\n" + message.failureCouse);
    //             }
    //         });
    //     });
    // }

    // context.Enviroment.getCertificateInfo = function (keyType) {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/certificateInfo/" + keyType;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 "Дані сертифіката успішно отримані",
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve(jsonResponse);
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при отриманні даних сертифіката." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     });
    // };


    context.Ticket = function () {
        this.signatureType = context.SignatureType.DETACHED;
        this.embedSignatureTs = false;
        this.embedDataTs = false;
        this.embedCertificateType = context.EmbedSertificateType.NOTHING;
        this.signatureTsVerifyOption = context.SignatureVerifyOption.IGNORE;
        this.dataTsVerifyOption = context.SignatureVerifyOption.IGNORE;
        this.dataToSignQualifier = context.DataToSignQualifier.NOT_SIGNED_BEFORE;
        this.uuid = null;
        this.rawData = null;
        this.metaData = null;
        this.dsData = null;
        this.tsData = null;
        this.ds = null;
        this.ts = null;
        this.signedData = null;
    };

    // context.Ticket.prototype.isActive = function () {
    //     return !(this.uuid == null || this.uuid == undefined)
    // };

    // context.Ticket.prototype.open = function () {
    //     if (this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json", // expected format for response
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message + " UUID: " + jsonResponse.ticketUuid,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             linkedObject.uuid = jsonResponse.ticketUuid;
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при створенні сесії." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         })
    //     })
    // };


    // context.Ticket.prototype.close = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid;
    //     var linkedObject = this;
    //     $.ajax({
    //         url: requestUrl,
    //         type: "DELETE",
    //         dataType: "json" // expected format for response
    //     }).done(function (jsonResponse, textStatus, xhr) {
    //         var message = new context.LogMessage(
    //             jsonResponse.message + " UUID: " + jsonResponse.ticketUuid,
    //             context.MessageSeverity.INFO,
    //             xhr.status
    //         );
    //         context.Enviroment.propagateLogMessage(message);
    //         linkedObject.uuid = null;
    //     }).fail(function (xhr) {
    //         var message;
    //         try {
    //             var jsonResponse = JSON.parse(xhr.responseText);
    //             message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.ERROR,
    //                 xhr.status
    //             );
    //         } catch (e) {
    //             message = new context.LogMessage(
    //                 (xhr.responseText == undefined) ? "Помилка при видаленні сесії." : xhr.responseText,
    //                 context.MessageSeverity.ERROR,
    //                 xhr.status
    //             );
    //         } finally {
    //             context.Enviroment.propagateLogMessage(message);
    //         }
    //     });
    // };

    // context.Ticket.prototype.updateMetadata = function () {
    //     if (!this.isActive() || this.metaData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/metadata";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "PUT",
    //             dataType: "json", // expected format for response
    //             contentType: "application/json", // send as JSON
    //             cache: false,
    //             data: JSON.stringify({metaData: linkedObject.metaData})
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при завантаженні метаданих." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     });
    // };

    // context.Ticket.prototype.uploadData = function () {
    //     if (!this.isActive() || this.rawData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: 'POST',
    //             data: linkedObject.rawData,
    //             contentType: "application/octet-stream",
    //             processData: false
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при завантаженні даних cесії." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.createDs = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/creator";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при ініціації створення ЕЦП." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.downloadDsData = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", requestUrl);
    //         xhr.responseType = "blob";
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 linkedObject.ds = xhr.response;
    //                 var message = new context.LogMessage(
    //                     "Дані ЕЦП успішно отримані.",
    //                     context.MessageSeverity.INFO,
    //                     xhr.status
    //                 );
    //                 context.Enviroment.propagateLogMessage(message);
    //                 resolve();
    //             } else {
    //                 var reader = new FileReader();
    //                 reader.onload = function () {
    //                     var response = reader.result;
    //                     try {
    //                         var jsonResponse = JSON.parse(response);
    //                         message = new context.LogMessage(
    //                             jsonResponse.message,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } catch (e) {
    //                         message = new context.LogMessage(
    //                             (xhr.responseText == undefined) ? "Помилка при отриманні даних ЕЦП." : xhr.responseText,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } finally {
    //                         context.Enviroment.propagateLogMessage(message);
    //                         reject();
    //                     }
    //                 };
    //                 reader.readAsText(xhr.response);
    //             }
    //         };
    //         xhr.send();
    //     })
    // };

    // context.Ticket.prototype.downloadSigneData = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/signedData";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", requestUrl);
    //         xhr.responseType = "blob";
    //         xhr.onload = function () {
    //             var message;
    //             if (xhr.status == 200) {
    //                 linkedObject.signedData = xhr.response;
    //                 message = new context.LogMessage(
    //                     "Дані з вбудованого цифрового підпису успішно отримані.",
    //                     context.MessageSeverity.INFO,
    //                     xhr.status
    //                 );
    //                 context.Enviroment.propagateLogMessage(message);
    //                 resolve(message);
    //             } else {
    //                 var reader = new FileReader();
    //                 reader.onload = function () {
    //                     var response = reader.result;
    //                     try {
    //                         var jsonResponse = JSON.parse(response);
    //                         message = new context.LogMessage(
    //                             jsonResponse.message,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } catch (e) {
    //                         message = new context.LogMessage(
    //                             (xhr.responseText == undefined) ? "Помилка при отриманні даних з вбудованого цифрового підпису." : xhr.responseText,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } finally {
    //                         context.Enviroment.propagateLogMessage(message);
    //                         reject(message);
    //                     }
    //                 };
    //                 reader.readAsText(xhr.response);
    //             }
    //         };
    //         xhr.send();
    //     })
    // };

    // context.Ticket.prototype.setOption = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/option";
    //     var selectedOptions = {
    //         signatureType: this.signatureType,
    //         embedCertificateType: this.embedCertificateType,
    //         embedSignatureTs: this.embedSignatureTs,
    //         embedDataTs: this.embedDataTs,
    //         signatureTsVerifyOption: this.signatureTsVerifyOption,
    //         dataTsVerifyOption: this.dataTsVerifyOption,
    //         dataToSignQualifier: this.dataToSignQualifier
    //     };
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "PUT",
    //             dataType: "json", // expected format for response
    //             contentType: "application/json", // send as JSON
    //             cache: false,
    //             data: JSON.stringify(selectedOptions)
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при встановленні налаштувань сесії." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.uploadDsData = function () {
    //     if (!this.isActive() || this.dsData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "application/octet-stream",
    //             processData: false,
    //             data: linkedObject.dsData
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при завантаженні даних ЕЦП." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.verifyDs = function () {
    //     if (!this.isActive() || this.dsData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/verifier";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при перевірці ЕЦП." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.getVerifyDsResult = function () {
    //     if (!this.isActive() || this.dsData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ds/verifier";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //             cache: false
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve(jsonResponse.verifyResults);
    //         }).fail(function (xhr) {
    //             var message;
    //             var jsonResponse = null;
    //             try {
    //                 jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при отриманні результата перевірки ЕЦП." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject(jsonResponse.verifyResults);
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.createTs = function () {
    //     if (!this.isActive() || this.rawData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/creator";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при ініціації створення позначки часу." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.downloadTsData = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", requestUrl);
    //         xhr.responseType = "blob";
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 linkedObject.ts = xhr.response;
    //                 var message = new context.LogMessage(
    //                     "Дані позначки часу успішно отримані.",
    //                     context.MessageSeverity.INFO,
    //                     xhr.status
    //                 );
    //                 context.Enviroment.propagateLogMessage(message);
    //                 resolve();
    //             } else {
    //                 var reader = new FileReader();
    //                 reader.onload = function () {
    //                     var response = reader.result;
    //                     try {
    //                         var jsonResponse = JSON.parse(response);
    //                         message = new context.LogMessage(
    //                             jsonResponse.message,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } catch (e) {
    //                         message = new context.LogMessage(
    //                             (xhr.responseText == undefined) ? "Помилка при отриманні даних позначки часу." : xhr.responseText,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } finally {
    //                         context.Enviroment.propagateLogMessage(message);
    //                         reject();
    //                     }
    //                 };
    //                 reader.readAsText(xhr.response);
    //             }
    //         };
    //         xhr.send();
    //     });
    // };

    // context.Ticket.prototype.uploadTsData = function () {
    //     if (!this.isActive() || this.tsData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "application/octet-stream",
    //             processData: false,
    //             data: linkedObject.tsData
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при завантаженні даних позначки часу." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.verifyTs = function () {
    //     if (!this.isActive() || this.tsData == null || this.rawData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/verifier";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при перевірці позначки часу." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.getVerifyTsResult = function () {
    //     if (!this.isActive() || this.tsData == null || this.rawData == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/ts/verifier";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //             cache: false
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при отриманні результата перевірки позначки часу." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // // ----- encryption and decryption
    // context.Ticket.prototype.uploadRecipientCertificate = function () {
    //     if (!this.isActive() || this.recipientCertificates == null) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor/certificates";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: 'POST',
    //             data: linkedObject.recipientCertificates,
    //             contentType: "application/octet-stream",
    //             processData: false
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при завантаженні сеотифікатів отримувачів шифрованих даних." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.encrypt = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка ініціації шифрування даних." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Ticket.prototype.downloadEncryptedData = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/encryptor/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", requestUrl);
    //         xhr.responseType = "blob";
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 linkedObject.encryptedData = xhr.response;
    //                 var message = new context.LogMessage(
    //                     "Шифровані дані успішно отримані.",
    //                     context.MessageSeverity.INFO,
    //                     xhr.status
    //                 );
    //                 context.Enviroment.propagateLogMessage(message);
    //                 resolve();
    //             } else {
    //                 var reader = new FileReader();
    //                 reader.onload = function () {
    //                     var response = reader.result;
    //                     try {
    //                         var jsonResponse = JSON.parse(response);
    //                         message = new context.LogMessage(
    //                             jsonResponse.message,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } catch (e) {
    //                         message = new context.LogMessage(
    //                             (xhr.responseText == undefined) ? "Помилка при отриманні зашифрованих даних." : xhr.responseText,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } finally {
    //                         context.Enviroment.propagateLogMessage(message);
    //                         reject();
    //                     }
    //                 };
    //                 reader.readAsText(xhr.response);
    //             }
    //         };
    //         xhr.send();
    //     })
    // };

    // context.Ticket.prototype.downloadDecryptedData = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/decryptor/data";
    //     var linkedObject = this;
    //     return new Promise(function (resolve, reject) {
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", requestUrl);
    //         xhr.responseType = "blob";
    //         xhr.onload = function () {
    //             if (xhr.status == 200) {
    //                 linkedObject.decryptedData= xhr.response;
    //                 var message = new context.LogMessage(
    //                     "Дешифровані дані успішно отримані.",
    //                     context.MessageSeverity.INFO,
    //                     xhr.status
    //                 );
    //                 context.Enviroment.propagateLogMessage(message);
    //                 resolve();
    //             } else {
    //                 var reader = new FileReader();
    //                 reader.onload = function () {
    //                     var response = reader.result;
    //                     try {
    //                         var jsonResponse = JSON.parse(response);
    //                         message = new context.LogMessage(
    //                             jsonResponse.message,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } catch (e) {
    //                         message = new context.LogMessage(
    //                             (xhr.responseText == undefined) ? "Помилка при отриманні зашифрованих даних." : xhr.responseText,
    //                             context.MessageSeverity.ERROR,
    //                             xhr.status
    //                         );
    //                     } finally {
    //                         context.Enviroment.propagateLogMessage(message);
    //                         reject();
    //                     }
    //                 };
    //                 reader.readAsText(xhr.response);
    //             }
    //         };
    //         xhr.send();
    //     })
    // };

    // context.Ticket.prototype.decrypt = function () {
    //     if (!this.isActive()) {
    //         return;
    //     }
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/ticket/" + this.uuid + "/decryptor";
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка ініціації дешифрування даних." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
    // };

    // context.Enviroment.getCertificateInBase64 = function (keyType) {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/certificate/base64/" + keyType;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "GET",
    //             dataType: "json",
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 "Сертифікат у форматі base64 успішно отриманий.",
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve(jsonResponse);
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка при отриманні сертифікаа у форматі base64." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     });
    // };

    // context.Enviroment.setLanguage = function (aLanguageCode) {
    //     var requestUrl = context.Enviroment.SERVICE_BASE_URL + "/language/" + aLanguageCode;
    //     return new Promise(function (resolve, reject) {
    //         $.ajax({
    //             url: requestUrl,
    //             type: "POST",
    //             dataType: "json",
    //             contentType: "text/plain"
    //         }).done(function (jsonResponse, textStatus, xhr) {
    //             var message = new context.LogMessage(
    //                 jsonResponse.message,
    //                 context.MessageSeverity.INFO,
    //                 xhr.status
    //             );
    //             context.Enviroment.propagateLogMessage(message);
    //             resolve();
    //         }).fail(function (xhr) {
    //             var message;
    //             try {
    //                 var jsonResponse = JSON.parse(xhr.responseText);
    //                 message = new context.LogMessage(
    //                     jsonResponse.message,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } catch (e) {
    //                 message = new context.LogMessage(
    //                     (xhr.responseText == undefined) ? "Помилка встановлення мови сервісу." : xhr.responseText,
    //                     context.MessageSeverity.ERROR,
    //                     xhr.status
    //                 );
    //             } finally {
    //                 context.Enviroment.propagateLogMessage(message);
    //                 reject();
    //             }
    //         });
    //     })
}