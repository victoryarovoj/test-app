import React, { Component } from 'react';


class Ts extends Component {

    render() {
        return (
            
            <div className="row">
                <span>verifyDS</span>
                <div className="col-xs-4 mtb-default">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div className="panel-title" id="dsvDsVerifyParamsTitle"></div>
                        </div>
                        <div id="dsvLeftParamArea" className="panel-body">
                            <div>
                                <label data-toggle="collapse" href="#dsvLeftParamAreaDsType"
                                       aria-expanded="true" aria-controls="dsvLeftParamAreaDsType" role="button">
                                    <span className="glyphicon glyphicon-menu-down" aria-hidden="true"/>
                                    <span id="dsvDsTypeTitle"></span>
                                </label>
                                <div id="dsvLeftParamAreaDsType" className="collapse in">
                                    <div className="form-group">
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvAttachedDsLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvSignatureType" value="attached" />
                                                <span id="dsvAttachedDsTitle"></span>
                                            </label>
                                        </div>
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvDetachedDsLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvSignatureType" value="detached" checked />
                                                <span id="dsvDetachedDsTitle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label data-toggle="collapse" href="#dsvLeftParamAreaDsTsCheck"
                                       aria-expanded="false" aria-controls="dsvLeftParamAreaDsTsCheck" role="button">
                                    <span className="glyphicon glyphicon-menu-right" aria-hidden="true"/>
                                    <span id="dsvTsVerifyMode"></span>
                                </label>
                                <div id="dsvLeftParamAreaDsTsCheck" className="collapse">
                                    <div className="form-group">
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvIgnoreTsLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionDs" value="ignore" />
                                                <span id="dsvIgnoreTsTitle"></span>
                                            </label>
                                        </div>
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvVerifyTsIfPresentLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionDs" value="verifyIfPresent" checked />
                                                <span id="dsvVerifyTsIfPresentTitle"></span>
                                            </label>
                                        </div>
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvVerifyTsErrorIfNotPresentLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionDs" value="verifyOrFailIfNotPresent" />
                                                <span id="dsvVerifyTsErrorIfNotPresentTitle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label data-toggle="collapse" href="#dsvLeftParamAreaDataTsCheck"
                                       aria-expanded="false" aria-controls="dsvLeftParamAreaDataTsCheck" role="button">
                                    <span className="glyphicon glyphicon-menu-right" aria-hidden="true"/>
                                    <span id="dsvDataVerifyTsMode"></span>
                                </label>
                                <div id="dsvLeftParamAreaDataTsCheck" className="collapse">
                                    <div className="form-group">
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvDataIgnoreTsLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionData" value="ignore" />
                                                <span id="dsvDataIgnoreTsTitle"></span>
                                            </label>
                                        </div>
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvDataVerifyTsIfPresentLabel" data-placement="top" data-toggle="tooltip"
                                                   className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionData" value="verifyIfPresent" checked />
                                                <span id="dsvDataVerifyTsIfPresentTitle"></span>
                                            </label>
                                        </div>
                                        <div className="radio ml-tool-panel">
                                            <label id="dsvDataVerifyTsErrorIfNotPresentLabel" data-placement="top"
                                                   data-toggle="tooltip" className="grey-tooltip">
                                                <input type="radio" name="dsvTsCheckOptionData" value="verifyOrFailIfNotPresent" />
                                                <span id="dsvDataVerifyTsErrorIfNotPresentTitle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dsvDataPanelHolder" className="col-xs-8 mtb-default panel-group" role="tablist">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="dsvFilePanelHeading">
                            <div className="panel-title" data-toggle="collapse" data-parent="#dsvDataPanelHolder"
                                 href="#dsvFilePanelBody"
                                 aria-controls="dsvFilePanelBody" aria-expanded="true" role="button">
                                <span id="dsvFileArea"></span>
                            </div>
                        </div>
                        <div id="dsvFilePanelBody" className="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="dsvFilePanelHeading">
                            <div className="panel-body">
                                <div className="form-group">
                                    <div id="dsvFileForDsGroup">
                                        <label id="dsvFileForVerifyingLabel" className="mtb-default grey-tooltip" data-placement="top"
                                               data-toggle="tooltip">
                                            <span id="dsvFileForVerifyingTitle"></span>
                                        </label>
                                        <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                                            <div className="form-control" data-trigger="fileinput">
                                                <i className="glyphicon glyphicon-file fileinput-exists"></i>
                                                <span className="fileinput-filename"></span>
                                            </div>
                                            <span className="input-group-addon btn btn-default btn-file">
                                                    <span id="dsvChooseFileForVerifying" className="fileinput-new"></span>
                                                    <span id="dsvChangeFileForVerifying" className="fileinput-exists"></span>
                                                    <input type="file" id="dsvFileForDs" />
                                                </span>
                                            <a id="dsvCleanupFileForVerifying" href="#"
                                               className="input-group-addon btn btn-default fileinput-exists"
                                               data-dismiss="fileinput"></a>
                                        </div>
                                    </div>
                                    <label id="dsvFileWithDsLabel" className="mtb-default grey-tooltip" data-placement="top"
                                           data-toggle="tooltip">
                                        <span id="dsvFileWithDsTitle"></span>
                                    </label>
                                    <div className="fileinput fileinput-new input-group" data-provides="fileinput">
                                        <div className="form-control" data-trigger="fileinput">
                                            <i className="glyphicon glyphicon-file fileinput-exists"></i>
                                            <span className="fileinput-filename"></span>
                                        </div>
                                        <span className="input-group-addon btn btn-default btn-file">
                                                    <span id="dsvChooseFileWithDs" className="fileinput-new"></span>
                                                    <span id="dsvChangeFileWithDs" className="fileinput-exists"></span>
                                                    <input type="file" id="dsvDsFile" />
                                                </span>
                                        <a id="dsvEraseFileWithDs" href="#"
                                           className="input-group-addon btn btn-default fileinput-exists"
                                           data-dismiss="fileinput"></a>
                                    </div>
                                </div>

                                <div id="dsvVerifyResultsFileDs"/>

                                <button type="button" className="btn btn-default" id="dsvPerformFileDs" disabled></button>
                                <button type="button" className="btn btn-default" id="dsvSaveDataFromSignedFile" disabled></button>
                                <button type="button" className="btn btn-default" id="dsvResetFieldsFileDs"></button>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="dsvTextPanelHeading">
                            <div className="panel-title" data-toggle="collapse" data-parent="#dsvDataPanelHolder"
                                 href="#dsvTextPanelBody"
                                 aria-expanded="false" aria-controls="dsvTextPanelBody" role="button">
                                <span id="dsvTextDataArea"></span>
                            </div>
                        </div>
                        <div id="dsvTextPanelBody" className="panel-collapse collapse" role="tabpanel"
                             aria-labelledby="dsvTextPanelHeading">
                            <div className="panel-body">
                                <div className="form-inline">
                                    <label id="dsvTextEncoding"></label>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="dsvEncodingForText" value="UTF-16LE" checked />
                                            <span id="dsvUtf16LeEncoding"></span>
                                        </label>
                                        <label>
                                            <input type="radio" name="dsvEncodingForText" value="UTF-8" />
                                            <span id="dsvUtf8Encoding"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group" id="dsvTextForDsGroup">
                                    <label id="dsvTextDataFoVerifyingLabel" for="dsvTextForDs" className="mtb-default grey-tooltip"
                                           data-placement="top"
                                           data-toggle="tooltip">
                                        <span id="dsvTextDataFoVerifyingTitle"></span>
                                    </label>
                                    <textarea id="dsvTextForDs" rows="2" className="form-control"></textarea>
                                </div>
                                <div className="form-group">
                                    <label id="dsvDsBase64Label" for="dsvDsBase64" className="mtb-default grey-tooltip"
                                           data-placement="top"
                                           data-toggle="tooltip">
                                        <span id="dsvDsBase64Title"></span>
                                    </label>
                                    <textarea id="dsvDsBase64" rows="3" className="form-control"></textarea>
                                </div>
                                <div className="form-group" id="dsvDataFromSignedTextGroup">
                                    <label id="dsvDataFromSignedTextLabel" for="dsvDataFromSignedText"
                                           className="mtb-default grey-tooltip" data-placement="top"
                                           data-toggle="tooltip">
                                        <span id="dsvDataFromSignedTextTitle"></span>
                                    </label>
                                    <textarea id="dsvDataFromSignedText" rows="2" className="form-control"></textarea>
                                </div>

                                <div id="dsvVerifyResultsTextDs"/>

                                <button type="button" className="btn btn-default" id="dsvPerformTextDs" disabled></button>
                                <button type="button" className="btn btn-default" id="dsvResetFieldsDsText"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ts;
