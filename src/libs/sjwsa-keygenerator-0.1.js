/**
 * Created by admin on 13.02.2017.
 */

if (sjwsa == undefined) {
    var sjwsa = {};
}
sjwsa.keyGenerator = {};

(function (context) {

    context.possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    context.keyGenerateFormResetButton = null;
    context.keyGeneratingFormCaptchaUpdateButton = null;
    context.captchaLength = 5;

    context.profiles = {};

    context.setProfiles = function (aProfiles) {
        for (var i = 0; i < aProfiles.length; i++) {
            context.profiles[aProfiles[i].oid] = aProfiles[i];
        }
    };

    context.getProfiles = function () {
        return context.profiles;
    };

    context.generateRandomText = function (length) {
        var resultText = "";
        for (var i = 0; i < length; i++) {
            resultText += context.possibleCharacters.charAt(Math.floor(Math.random() * context.possibleCharacters.length));
        }
        return resultText;
    };

    context.resetKeyGenerationFormFields = function () {
        if (context.keyGenerateFormResetButton) {
            keyGenerateFormResetButton.click();
        }
        context.updateKeyGenerationFormCaptcha();
    }

    context.updateKeyGenerationFormCaptcha = function () {
        if (context.keyGeneratingFormCaptchaUpdateButton) {
            context.keyGeneratingFormCaptchaUpdateButton.click();
        }
    }

    context.keyGeneratioFormBuilder = {
        idPrefix: "SJWSA_",
        buildInputField: function (elementDescription) {
            var divGroupItem = $("<div></div>").addClass("form-group  no-margin");
            var divInputItem = $("<div></div>").addClass("col-xs-9");
            var divErrorText = $("<div></div>").addClass("help-block with-errors col-xs-offset-3 col-xs-9");
            var inputId = elementDescription.name;
            var inputItemDefinition = (elementDescription.optional == true) ? "<input>" : "<input required>";
            var inputItem = $(inputItemDefinition)
                .addClass("form-control")
                .attr("type", "text")
                .attr("id", inputId)
                .attr("data-required-error", i18next.t("keygen:needToBeFilledField"));
            if (elementDescription.name.toUpperCase().includes("COUNTRY")) {
                inputItem.val(elementDescription.default ? elementDescription.default.toUpperCase() : "");
            }

            var labelItem = $("<label></label>")
                .addClass("control-label col-xs-3")
                .attr("for", inputId)
                .text(i18next.t("keygen:" + elementDescription.name) + ((elementDescription.optional == true) ? ":" : "*:"));
            divGroupItem.append(labelItem);
            divInputItem.append(inputItem);
            divGroupItem.append(divInputItem);
            divGroupItem.append(divErrorText);
            return divGroupItem;
        },
        buildButtons: function () {
            var divGroupItem = $("<div></div>").addClass("form-group");
            var divItem = $("<div></div>").addClass("col-xs-offset-3 col-xs-10");
            var buttonGenerateItem = $("<button></button>")
                .attr("id", "keyGenerateFormGenerateButton")
                .attr("type", "submit")
                .addClass("btn btn-default margin-right-7")
                .text(i18next.t("keygen:generateKeys"));
            var buttonResetItem = $("<button></button>")
                .attr("id", "keyGenerateFormResetButton")
                .addClass("btn btn-default margin-right-7")
                .text(i18next.t("keygen:clearFields"));
            buttonResetItem.click(function () {
                var parentForm = $(this).closest("form").first();
                parentForm.validator("destroy");
                parentForm.find("input").each(function () {
                    $(this).val("");
                });
                parentForm.validator();
                return false;
            });
            context.keyGenerateFormResetButton = buttonResetItem;
            return divGroupItem.append(divItem.append(buttonGenerateItem).append(buttonResetItem));
        },
        buildFormElement: function () {
            return $("<form></form>")
                .attr("data-toggle", "validator")
                .attr("role", "form")
                .addClass("form-horizontal");
        },
        buildProfileSelect: function () {
            var divItem = $("<div></div>").addClass("form-group");
            var inputId = "keyGenerationProfileId";
            var selectItem = $("<select></select>").addClass("form-control").attr("id", inputId);
            var labelItem = $("<label></label>")
                .addClass("control-label")
                .attr("for", inputId)
                .text(i18next.t("keygen:keysGenerationProfile") + ":");
            for (var p in context.profiles) {
                var opt = $("<option></option>")
                    .attr("value", p)
                    .text(i18next.t("keygen:" + context.profiles[p].caption));
                selectItem.append(opt);
            }
            divItem.append(labelItem);
            divItem.append(selectItem);
            return divItem;
        },
        buildClientSideCaptcha: function () {
            var divGroupItem = $("<div></div>").addClass("form-group  no-margin");
            var divInputItem = $("<div></div>").addClass("col-xs-2");
            var divCaptchaItem = $("<div></div>").addClass("col-xs-2");
            var divErrorText = $("<div></div>").addClass("help-block with-errors col-xs-offset-3 col-xs-9");
            var inputId = "keyGeneratingFormCaptchaInput";
            var inputItemDefinition = "<input required>";
            var inputItem = $(inputItemDefinition)
                .addClass("form-control")
                .attr("type", "text")
                .attr("id", inputId)
                .attr("data-required-error", i18next.t("keygen:needToBeFilledField"))
                .attr("data-pattern-error", i18next.t("keygen:valueNotEqualCaptcha"));
            ;
            var labelItem = $("<label></label>")
                .addClass("control-label col-xs-3")
                .attr("for", inputId)
                //.text(i18next.t("keygen:" + elementDescription.name) + ((elementDescription.optional == true) ? ":" : "*:"));
                .text("CAPTCHA*:");

            var captchaItem = $("<img>")
                .attr("width", 100)
                .attr("height", 35)
                .load();

            var baseUrl = window.location.pathname;
            var updateCaptchaButton = $("<img>")
                .attr("width", 32)
                .attr("height", 32)
                .attr("id", "keyGeneratingFormCaptchaUpdateButton")
                .attr("src", (baseUrl.match(new RegExp("instances")) ? "../../img/" : "img/") + "update-arrows.jpeg")
                .css("cursor", "pointer")
                .click(function () {
                    var t = context.generateRandomText(context.captchaLength);
                    inputItem.attr("pattern", t);
                    captchaItem.attr("src", sjwsa.Enviroment.SERVICE_BASE_URL + "/" + "captcha/imageGenerator/" + t);
                    inputItem.change();
                });
            updateCaptchaButton.click();
            context.keyGeneratingFormCaptchaUpdateButton = updateCaptchaButton;

            /*var updateCaptcha = function () {
                var t = context.generateRandomText(5);
                inputItem.attr("data-match", t);
                captchaItem.attr("src", sjwsa.Enviroment.SERVICE_BASE_URL + "/" + "captchaImage/" + t);
            };
            updateCaptcha();*/

            divGroupItem.append(labelItem);
            divCaptchaItem.append(captchaItem);
            divGroupItem.append(divCaptchaItem);
            divInputItem.append(inputItem);
            divGroupItem.append(divInputItem);
            divGroupItem.append(divErrorText);
            divGroupItem.append(updateCaptchaButton);
            return divGroupItem;
        }
    }

    context.getKeyProfileSelect = function () {
        return context.keyGeneratioFormBuilder.buildProfileSelect();
    }

    context.getKeyGenerationForm = function (aProfileOid) {
        var resultForm = context.keyGeneratioFormBuilder.buildFormElement();
        if (context.profiles[aProfileOid] == undefined) {
            return resultForm;
        }
        var profile = context.profiles[aProfileOid];
        if (profile.fields == undefined) {
            return resultForm;
        }
        for (var i = 0; i < profile.fields.length; i++) {
            var formItem = context.keyGeneratioFormBuilder.buildInputField(profile.fields[i]);
            resultForm.append(formItem);
        }
        resultForm.append(context.keyGeneratioFormBuilder.buildClientSideCaptcha());
        resultForm.append(context.keyGeneratioFormBuilder.buildButtons());
        return resultForm;
    }

    context.getJsonFromKeyGenerationForm = function (aForm) {
        var jsonData = {};
        aForm.find("input[type='text']").each(function () {
            jsonData[$(this).attr("id")] = $(this).val();
        });
        return jsonData;

    }

})(sjwsa.keyGenerator)