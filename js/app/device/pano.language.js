define([

	'pano.copy'

],function(Copy){

	var language = function(l){
		
		this.langRef = {
			"en-RO" : "en",
			"en-CA" : "en",
			"en-TR" : "en",
			"en-HU" : "en",
			"ja-JP" : "jp",
			"en-LV" : "en",
			"en-HK" : "en",
			"en-LU" : "en",
			"en-LT" : "en",
			"pt-BR" : "br",
			"de-DE" : "de",
			"en-DK" : "en",
			"en-FI" : "en",
			"en-IE" : "en",
			"fr-FR" : "fr",
			"en-BG" : "en",
			"en-BE" : "en",
			"en-KW" : "en",
			"en-SK" : "en",
			"en-GB" : "en",
			"en-MO" : "en",
			"it-IT" : "it",
			"en-MT" : "en",
			"de-AT" : "de",
			"en-CZ" : "en",
			"en-CY" : "en",
			"en-US" : "en",
			"en-SE" : "en",
			"ko-KR" : "kr",
			"en-SG" : "en",
			"en-QA" : "en",
			"en-MY" : "en",
			"en-SI" : "en",
			"en-AU" : "en",
			"en-EE" : "en",
			"zh-CN" : "zf",
			"zh-TW" : "zf",
			"en-PT" : "en",
			"en-PL" : "en",
			"ru-RU" : "ru",
			"en-CH" : "en",
			"en-GR" : "en",
			"es-ES" : "es",
			"en-AE" : "en",
			"en-NL" : "en"
		}
		
		this.lang = this.langRef[l];
		this.copy = copyDoc()[this.lang];

		return {
			copy:this.copy,
			lang:this.lang
		}

	}

	var getLanguage = function(){
		var _l = "undefined"!=typeof window.navigator.language ? window.navigator.language : "undefined"!=typeof window.navigator.userLanguage ? window.navigator.userLanguage: "";
		return _l.replace(_l.substr(_l.indexOf("-")),'-'+_l.substring(3,5).toUpperCase());
	}

	return language(getLanguage())

})





