define([

],function(){

	var getPrefix = function(){

		var styles = window.getComputedStyle(document.documentElement, '');
		var pre = (Array.prototype.slice.call(styles).join('') .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
		var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre=='moz' ? dom : pre[0].toLowerCase() + pre.substr(1)
		}

	}

	return getPrefix();

})





