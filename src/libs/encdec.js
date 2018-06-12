function StringToArray(s) {
	var utf8 = unescape(encodeURIComponent(s));

	var arr = [];
	for (var i = 0; i < utf8.length; i++) {
		arr.push(utf8.charCodeAt(i));
	}
	return arr;
}

function ArrayToString(arr) {
	var ret = [];
	
	var length = arr.length;
	if (length > 0 && 
		arr[length - 1] == 0) {
		length -= 1;
	}
	
	for (var i = 0; i < length; i++) {
		var chr = arr[i];
		if (chr > 0xFF) {
			chr &= 0xFF;
		}

		ret.push(String.fromCharCode(chr));
	}

	return  decodeURIComponent(escape(ret.join('')));
}

function StringToUTF16LEArray(str, zero) {
	var L = [];
	var c;

	for (var i = 0; i < str.length; i++) {
		c = str.charCodeAt(i);
		L.push(c & 0xFF);
		L.push((c & 0xFF00) >> 8);
	}
	
	if (zero) {
		L.push(0);
		L.push(0);
	}
	
	return L;
}

function UTF16LEArrayToString(arr) {
	var t1, t2;
	var i = 0;
	var ret = '';
	var length;

	if ((arr.length%2) != 0)
		return null;

	length = arr.length;
	if (length > 0 && 
		arr[length - 2] == 0 && 
		arr[length - 1] == 0) {
		length -= 2;
	}
		
	while (i < length) {
		ret += String.fromCharCode(arr[i] | (arr[i+1] << 8)); 
		i += 2;
	}

	return ret;
}

var StringEncoder = function (charset, javaCompliant) {
	this.charset = charset;
	this.javaCompliant = javaCompliant;
	
	if (!StringEncoder.isSupported(charset))
		throw exeption ("String charset not supported");
	
	if (charset == "UTF-16LE") {
		this.encode = function(str) {
			return StringToUTF16LEArray(str, !javaCompliant);
		};
		this.decode = UTF16LEArrayToString;
	} else if (charset == "UTF-8") {
		if (javaCompliant)
			this.encode = StringToArray;
		else {
			this.encode = function(str) {
				var arr = StringToArray(str);
				arr.push(0);
			}
		}
		this.decode = ArrayToString;
	}
}

StringEncoder.isSupported = function(charset) {
	if (charset != "UTF-16LE" && 
		charset != "UTF-8") {
		return false;
	}

	return true;
}



