/* 
 * 날짜 형식
 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

Date.prototype.ISODateString = function() {
	var d = this;
	
    function pad(n){
        return n>10 ? '0'+n : n
    }
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

jQuery.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
}; 
	 		
var setCookie = function (cKey, cValue){
    var date = new Date();
    var validity = 10;
    date.setDate(date.getDate() + validity);
    document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString();
};

var delCookie = function (cKey) {
    var date = new Date(); // ���� ��¥ 
    var validity = -1;
    date.setDate(date.getDate() + validity);
    document.cookie = cKey + "=;expires=" + date.toGMTString();
};

var getCookie = function (cKey) {
    var allcookies = document.cookie;
    var cookies = allcookies.split("; ");
    
    for (var i = 0; i < cookies.length; i++) {
        var keyValues = cookies[i].split("=");
        if (keyValues[0] == cKey) {
            return unescape(keyValues[1]);
        }
    }
    return "";
};

var Request = function() {
	this.getParameter = function(name) {
		var rtnval = "";
		var nowAddress = unescape(location.href);
		var parameters = (nowAddress.slice(nowAddress.indexOf("?") + 1,
				nowAddress.length)).split("&");

		for ( var i = 0; i < parameters.length; i++) {
			var varName = parameters[i].split("=")[0];
			if (varName.toUpperCase() == name.toUpperCase()) {
				rtnval = parameters[i].split("=")[1];
				break;
			}
		}
		return rtnval;
	};
};


/* ArrayList */
function ArrayList() {
	this.array = new Array();
}
ArrayList.prototype = {
	add : function(obj) {
		this.array[this.array.length] = obj;
	},
	size : function (){
		return this.array.length;
	},
	get : function (index){
		return this.array[index];
	},
	addAll : function (obj) {
		if (obj instanceof Array){
			for (var i=0;i<obj.length;i++) {
				this.add(obj[i]);
			}
		} else if (obj instanceof ArrayList){
			for (var i=0;i<obj.length();i++) {
				this.add(obj.get(i));
			}
		}
	},
	remove : function (index) {
		if ( this.size() > 0 && index > -1 && index < this.size() )  {
			switch(index) {
				case 0:
					this.array.shift();
					break;
				case this.size() - 1:
					this.array.pop();
					break;
				default:
					var head   = this.array.slice(0, index);
					var tail   = this.array.slice(index+1);
					this.array = head.concat(tail);
					break;
			}
		}
	},
	iterator : function (){
		return new Iterator(this);
	},
	toJSON : function() {
		if ( this.size() == 0 ) return "";
		return $.toJSON(this.array);
	},
	contains : function(obj) {
		var result = 0;
		for(var i=0; i<this.array.length; i++) {
			if( this.array[i] === obj ) {
				result = 1;
				break;
			}
		}
		return result;
	},
	clear : function() {
		this.array = new Array();
	}	
}

/* Iterator */
function Iterator (arrayList){
	this.arrayList = arrayList;
	this.index = 0;
}
Iterator.prototype = {
	hasNext : function () {
		return this.index < this.arrayList.size();
	},
	next : function() {
		return this.arrayList.get(this.index++);
	}
}

/* Hashtable */
function HashMap() {
	this.keys = new ArrayList();
	this.values = new ArrayList();
}

HashMap.prototype = {
	get : function(key){
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				return this.values.get(index);
			}
		}
		return null;
	},
	put : function(key, value){
		
		if(this.get(key) != null){
			this.remove(key);
		}
		
		this.keys.add(key);
		this.values.add(value);
	},
	containsKey : function(key){
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				return true;
			}
		}
		return false;
	},
	size : function(){
		return this.keys.size();
	},
	containsValue : function(values){
		for (var index=0; index < this.values.size(); index++){
			if (values==this.values.get(index)){
				return true;
			}
		}
		return false;
	},
	getKeys : function() {
		return this.keys;
	},
	getValues : function() {
		return this.values;
	},
	keyIterator : function() {
		return new Iterator(this.keys);
	},
	valueIterator : function() {
		return new Iterator(this.values);
	},
	remove : function(key) {
		for (var index=0; index < this.keys.size(); index++){
			if (key==this.keys.get(index)){
				this.keys.remove(index);
				this.values.remove(index);
				break;
			}
		}
	},
	toJSON : function() {
		if ( this.size() == 0 ) return ""; 
		var ret = [];
		for(var mIter=this.keyIterator(); mIter.hasNext(); ) {
			var key = mIter.next();
			var value = this.get(key);
			var type = typeof(key);

			var name = "";
		    if (type == "number")
		        name = '"' + key + '"';
		    else if (type == "string")
		        name = $.quoteString(key);
		    else
		        continue;

		    var val = $.toJSON(value);
		    if (typeof(val) != "string") {
		        continue;
		    }

		    ret.push(name + ":" + val);
		}
		return "{" + ret.join(", ") + "}";
	}	
}