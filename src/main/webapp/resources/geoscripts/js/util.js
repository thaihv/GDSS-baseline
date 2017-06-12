/*
 한글 및 특수문자를 서버로 전송할 때 간혹 데이터가 깨지는 경우 인코딩하여 전달 후 서버에서 디코딩 하여 사용한다.
 
 문자열을 인코딩 할때 사용한다. 다음과 같이 디코딩 하여 사용한다.
 JAVA : URLEncoder.decode(str, "UTF-8")
 JS : decodeURL(str)
*/
function encodeURL(str){
    var s0, i, s, u;
    s0 = "";                // encoded str
    for (i = 0; i < str.length; i++){   // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i);          // get unicode of the char
        if (s == " "){s0 += "+";}       // SP should be converted to "+"
        else {
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){       // check for escape
                s0 = s0 + s;            // don't escape
            }
            else {                  // escape
                if ((u >= 0x0) && (u <= 0x7f)){     // single byte format
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                }
                else if (u > 0x1fffff){     // quaternary byte format (extended)
                    s0 += "%" + (0xf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff){        // triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else {                      // double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    } 




    return s0;



}



/* 문자열을 디코딩 할때 사용한다. 다음과 같이 인코딩 하여 사용한다.  JAVA : URLEncoder.encode(str, "UTF-8") JS : encodeURL(str) */
function decodeURL(str)
{
    var s0, i, j, s, ss, u, n, f;
    s0 = "";                // decoded str
    for (i = 0; i < str.length; i++){   // scan the source str
        s = str.charAt(i);
        if (s == "+"){s0 += " ";}       // "+" should be changed to SP
        else {
            if (s != "%"){s0 += s;}     // add an unescaped char
            else{               // escape sequence decoding
                u = 0;          // unicode of the character
                f = 1;          // escape flag, zero means end of this sequence
                while (true) {
                    ss = "";        // local str to parse as int
                        for (j = 0; j < 2; j++ ) {  // get two maximum hex characters for parse
                            sss = str.charAt(++i);
                            if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
                                ss += sss;      // if hex, add the hex character
                            } else {--i; break;}    // not a hex char., exit the loop
                        }
                    n = parseInt(ss, 16);           // parse the hex str as byte
                    if (n <= 0x7f){u = n; f = 1;}   // single byte format
                    if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}   // double byte format
                    if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}   // triple byte format
                    if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}   // quaternary byte format (extended)
                    if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}         // not a first, shift and add 6 lower bits
                    if (f <= 1){break;}         // end of the utf byte sequence
                    if (str.charAt(i + 1) == "%"){ i++ ;}                   // test for the next shift byte
                    else {break;}                   // abnormal, format error
                }
            s0 += String.fromCharCode(u);           // add the escaped character
            }
        }
    }
    return s0;



}

//콤마 찍기
function numchk1(num){
	var sign="";
	
	if(isNaN(num)) {
		alert("숫자만 입력할 수 있습니다");
		return 0;
	}
	if(num==0){ return num; }

	if(num<0){
		num=num*(-1);
		sign="-";
	} else num=num*1;
	num = new String(num)
	var temp="";
	var pos=3;
	num_len=num.length;
	while (num_len>0){
		num_len=num_len-pos;
	if(num_len<0) {
		pos=num_len+pos;
		num_len=0;
	}
	temp=","+num.substr(num_len,pos)+temp;
	}
	return sign+temp.substr(1);
}

function dotGubun(value){
	dotStr = value.split(".");
	
	if(dotStr.length == 2){
		var commaVal = dotStr[0].setComma();
		commaVal = commaVal + "." + dotStr[1];
	} else {
		commaVal = dotStr.setComma();
	}
	
	return commaVal;
}


String.prototype.setComma = function() { 
    var temp_str = String(this);

    for(var i = 0 , retValue = String() , stop = temp_str.length; i < stop ; i++)
    	retValue = ((i%3) == 0) && i != 0 ? temp_str.charAt((stop - i) -1) + "," + retValue : temp_str.charAt((stop - i) -1) + retValue; 

    return retValue; 
} 

Number.prototype.formatNumber = function(c, d, t){
    var n = this;
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d == undefined ? "." : d;
    t = t == undefined ? "," : t;
    var i = parseInt(n = (+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}




//print

 var win=null;
 
 function printIt(Sbound,layers)  {
  
     var sBox=Sbound;//"240500,276243.7150838,306500,316756.2849162";
     mypage="print.jsp?bBox="+sBox+"&layers="+layers;

     
      var winl = (screen.width-100)/2;
     var wint = (screen.height-100)/2;
     var settings  ='height=880px,';
      settings +='width=700px,';
      settings +='top=0,';
      settings +='left=0,';
      settings +='scrollbars=yes,';
      settings +='resizable=no';
     win=window.open(mypage,"filedown",settings);
     if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
    
     
  }
 

  
  function FileDown(sUrl,Sbound,layers)  {
  
     var sBox=Sbound;//"240500,276243.7150838,306500,316756.2849162";
     mypage="fileWork.jsp?bBox="+sBox+"&layers="+layers+"&sUrl="+sUrl;

     
     
      var winl = (screen.width-100)/2;
     var wint = (screen.height-100)/2;
     var settings  ='height=10px,';
      settings +='width=10px,';
      settings +='top=0,';
      settings +='left=0,';
      settings +='scrollbars=no,';
      settings +='resizable=no';
     win=window.open(mypage,"filedown",settings);
     if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
    
     
  }
  
  
