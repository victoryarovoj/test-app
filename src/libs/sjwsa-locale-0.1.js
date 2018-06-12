function getLanguage() {
    var url = window.location.search;
    var re = /\?.*language=([\w]{2})/;
    var res = url.match(re);
    var lang = "uk";
    if (res) {
        lang =res[1];
    }

    //console.log("discovered language: " + lang);

    return lang;
}

function getLocaleResourcePath() {
    var baseUrl = window.location.pathname;
    if (baseUrl.match(new RegExp("instances"))) {
        return "../../locales/{{lng}}/{{ns}}.json";
    } else {
        return "locales/{{lng}}/{{ns}}.json";
    }
}

i18next
    .use(i18nextXHRBackend)
    .init({
        lng: getLanguage(),
        fallbackLng: 'uk',
        debug: true,
        ns: ['common', 'ds', 'cert', 'ts', 'dec', 'enc', 'keygen', 'ub'],
        defaultNS: 'common',
        backend: {
            loadPath: getLocaleResourcePath(),
            crossDomain: false
        }
    }, function (err, t) {
        console.log(i18next.languages);
        if (err) {
            alert("Error while loading localisation library.\nПомилка при завантаженні бібліотеки локалізації.");
        }
    });

function LanguageSwitchItem(aDisplayTitle, aLanguageCode, aItems) {
    var __this = this;
    this.items = aItems;
    this.displayTitle = aDisplayTitle;
    this.languageCode = aLanguageCode;
    this.htmlElement = $("<button></button>")
        .addClass("btn btn-default").css("margin-left", "7px")
        .attr("type", "button").text(this.displayTitle);

    this.htmlElement.click(function () {
        __this.switchOn();
    });
    this.items.push(this);
}

LanguageSwitchItem.prototype.switchOn = function () {
    i18next.changeLanguage(this.languageCode);
};

LanguageSwitchItem.prototype.update = function() {
    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].languageCode == i18next.language) {
            this.items[i].htmlElement.addClass("active");
        } else {
            this.items[i].htmlElement.removeClass("active");
        }
    }
}