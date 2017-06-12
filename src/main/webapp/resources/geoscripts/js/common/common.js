var ajax = {
		request : function(_url, _method, _parameters, _onSuccess, _onComplete){
			/**
			 * using prototypejs
			 */
			new Ajax.Request(_url, {
			    method : _method,
			    parameters: _parameters == undefined || _parameters == null ? {} : _parameters,
			    onLoading: function() {},
			    onSuccess  : _onSuccess == undefined || _onSuccess == null ? function() {} : _onSuccess,
			    onFailure: function(transport){
			    	alertMsg(transport.status);
			    },
			    onComplete : _onComplete == undefined || _onComplete == null ? function() {} : _onComplete
			});
		},
		update : function(elementId, _url, _method, _parameters, _onSuccess, _onComplete){
			/**
			 * using prototypejs
			 */
			new Ajax.Updater(elementId, _url, {
				method : _method,
				evalScripts: true,
			    parameters: _parameters == undefined || _parameters == null ? {} : _parameters,
			    onLoading: function() {},
			    onSuccess  : _onSuccess == undefined || _onSuccess == null ? function() {} : _onSuccess,
			    onFailure: function(transport){
			    	alertMsg(transport.status);
			    },
			    onComplete : _onComplete == undefined || _onComplete == null ? function() {} : _onComplete
			});
		},
		formSubmit : function( _url, _method, _formId, _onSuccess, _onComplete){
			/**
			 * using prototypejs
			 */
			new Ajax.Request(_url, {
				method: _method,
				asynchronous: true,
				parameters: Form.serialize($(_formId)),
				onLoading: function() {},
			    onSuccess  : _onSuccess == undefined || _onSuccess == null ? function() {} : _onSuccess,
			    onFailure: function(transport){
					alertMsg(transport.status);
			    },
			    onComplete : _onComplete == undefined || _onComplete == null ? function() {} : _onComplete
			});
		}
}

function detailWipeOut(divId, aId, imgId){
    $(imgId).src = "/images/sub/report/title_down.gif";
    $(aId).href = "javascript:detailWipeIn('"+divId+"', '"+aId+"', '"+imgId+"');";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeOut(divId, 400).play();
}

function detailWipeIn(divId, aId, imgId){
	$(imgId).src = "/images/sub/report/title_up.gif";
    $(aId).href = "javascript:detailWipeOut('"+divId+"', '"+aId+"', '"+imgId+"');";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeIn(divId, 400).play();
}

function collectionWipeOut(divId, aId, imgId){
    $(imgId).src = "/images/sub/report/title_down.gif";
    $(aId).href = "javascript:collectionWipeIn('"+divId+"', '"+aId+"', '"+imgId+"');";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeOut(divId, 400).play();
}

function collectionWipeIn(divId, aId, imgId){
	$(imgId).src = "/images/sub/report/title_up.gif";
    $(aId).href = "javascript:collectionWipeOut('"+divId+"', '"+aId+"', '"+imgId+"');";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeIn(divId, 400).play();
}
	
/**
 * @param id objectId
 * @return object value
 */
function getObjectValue(id){
	return $(id) == null ? "" : $F(id);
}

function setPng24(obj) {
    obj.width=obj.height=1;
    obj.className=obj.className.replace(/\bpng24\b/i,'');
    obj.style.filter =
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
    obj.src=''; 
    return '';
}

function load2007(){
    new Ajax.Updater("popLayer", "/excel/2007.h", {
        method : "get",
        parameters: {
            ajax : "true"
        },
        evalScripts : true,
        onLoading: function() {
        },
        onSuccess  : function(transport) {
        },
        onFailure: function(transport){
            alert(transport.status);
        },
        onComplete : function() {
	    	var position = $("dummyPosition").cumulativeOffset();var sPosition = $("dummyPosition").cumulativeScrollOffset();
	    	$("popLayer").setStyle({
	    		top: (getCenterY2($("popLayer").getHeight())+sPosition[1])+"px",
				left: (position[0]+200)+"px"
            });
            jQuery("#popLayer").show("slow");
        }
    });
}

function close2007(){
    jQuery("#popLayer").hide("slow");
}

function senDownload(url){
    var downloadDiv = $("senDownload");
    if(downloadDiv == null){
        downloadDiv = document.createElement('div');
        document.body.appendChild(downloadDiv);
    }
    if($("downloadIframe") == null){
     var downloadIframe = document.createElement('iframe');
     downloadIframe.id = "downloadIframe";
     downloadIframe.src = url;
     downloadIframe.width = "0";
     downloadIframe.height = "0";
     downloadDiv.appendChild(downloadIframe);
    }else{
        $("downloadIframe").src = url;
    }
}

function explode(divId, start){
    dojo.require("dojo.lfx.*");
    dojo.lfx.explode(start, divId, 800).play();
}

function implode(divId, start){
    dojo.require("dojo.lfx.*");
    dojo.lfx.implode(divId, start, 800).play();
}

function wipeOut(divId, aId, imageId, milliseconds){
    if(milliseconds == undefined) {
        milliseconds = 200;
    }
    if($(imageId) != undefined) { //이미지 변경 부분 현재는 이미지가 없네 ;
        //$(imageId).src = "/images/user/themes/room/type_a/a/btn_a_open.gif";
    }
    $(aId).href = "javascript:wipeIn('"+divId+"', '"+aId+"', '"+imageId+"',  "+milliseconds+");";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeOut(divId, milliseconds).play();
}

function wipeIn(divId, aId, imageId, milliseconds) {
    if(milliseconds == undefined) {
        milliseconds = 200;
    }
    if($(imageId) != undefined) {
        //$(imageId).src = "/images/user/themes/room/type_a/a/btn_a_close.gif";
    }
    $(aId).href = "javascript:wipeOut('"+divId+"', '"+aId+"', '"+imageId+"', "+milliseconds+");";
    dojo.require("dojo.lfx.html");
    dojo.lfx.wipeIn(divId, milliseconds).play();
}

function fadeIn(divObj, functionToRun, milliseconds){
	//alert("fadein : "+divObj.id);
    if(milliseconds == undefined) {
        milliseconds = 600;
    }
    dojo.require("dojo.lfx.html");

    // 로딩중... 제거
    var loading_div = $(divObj.readAttribute("loading_div"));
    if(loading_div != null) {
        loading_div.remove();
    }

    if(functionToRun == undefined) {
        dojo.lfx.html.fadeIn(divObj, milliseconds).play();
    }else{
        dojo.lfx.html.fadeIn(
            divObj,
            milliseconds,
            function(){
                eval(functionToRun);
            }
        ).play();
    }
}

function fadeOut(divObj, functionToRun, milliseconds){
	//alert("fadeout : "+divObj.id);
    if(milliseconds == undefined) {
        milliseconds = 300;
    }
    dojo.require("dojo.lfx.html");

    // 로딩중... div 확인
    var loading_div = $(divObj.readAttribute("loading_div"));
    if(loading_div != null) {
        loading_div.remove();
    }

    // divObj에 로딩중 div의 id를 attribute로 넣어서, 향후 fadeOut 시 로딩중 div를 제거한다.
    var d = new Date();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var curr_sec = d.getSeconds();
    var curr_msec = d.getMilliseconds();
    var mill = curr_hour + "" + curr_min + "" + curr_sec + "" + curr_msec;

    divObj.writeAttribute("loading_div", mill);

    // 이미지를 만든다.
    var loading_image = new Element("img", {"src" : "/images/indicator.gif"});

    // 이미지를 해당 object 앞에 넣는다.
    var loading_div = new Element("div", {"id" : mill}).update(loading_image);
    loading_div.clonePosition(divObj, {setTop:false, setHeight : false});
    loading_div.setStyle({
        position: 'absolute',
        textAlign : 'center'
        });

    divObj.insert({"before" : loading_div});

    if(functionToRun == undefined) {
        dojo.lfx.html.fadeOut(divObj, milliseconds).play();
    }else{
        dojo.lfx.html.fadeOut(
            divObj,
            milliseconds,
            0,
            function(){
                eval(functionToRun);
            }
        ).play();
    }
}

//색상표 호출.
function popupcolorpicker(ob1,ob2,nums){
    window.open("/commonSelectColor.tomato?ob1="+ob1+"&ob2="+ob2+"&num_rows="+nums, "pickcolor", "scrollbars=no,resizable=no,status=no, location=no, menubar=no, width=400, height=250, top=0, left="+(screen.width-462));
}

//파일 업로더 호출
function popupFileUploader(serviceGubun, ob1, ob2){
    window.open("/commonFileUpload.tomato?serviceGubun="+serviceGubun+"&ob1="+ob1+"&ob2="+ob2, "fileUpload", "top=0, left=0, width=550, height=300, scrollbars=yes, resizable=no");
}

//파일찾기 호출
function popupFileSearch(serviceGubun, ob1, ob2){
    window.open("/commonFileSearch.tomato?serviceGubun="+serviceGubun+"&ob1="+ob1+"&ob2="+ob2, "fileUpload", "top=0, left=0, width=550, height=450, scrollbars=yes, resizable=no");
}

//iframe 리사이즈
function iframe_autoresize(ifr,max_length) {
    var height = eval(ifr.name+".document.body.scrollHeight");
    if((max_length/1) > 0 && height > (max_length/1)) height = (max_length/1);
    ifr.height = height;
}

//browser(Mozilla Firefox)
function isNav(){
    var isNav = false;
    if (parseInt(navigator.appVersion.charAt(0)) >= 4)
        isNav = (navigator.appName == "Netscape") ? true : false;

    return isNav;
}

//browser(Microsoft explorer)
function isIE(){
    var isIE = false;
    if (parseInt(navigator.appVersion.charAt(0)) >= 4)
        isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

    return isIE;
}

//글자 공백 제거
function trim(Str){
    var tempStr = "";

    for ( var i=0 ; i<Str.length ; i++){
        if(Str.charAt(i) == " "){
            tempStr = tempStr;
        }else{
            tempStr = tempStr + Str.charAt(i);
        }
    }
    return tempStr;
}

//id 를 이용하여 해당 value 의 값 유무여부를 리턴한다.
function hasValueById(id){
    var obj = document.getElementById(id);
    if( obj == null)
        return false;

    if( trim(obj.value) == "" )
        return false;
    else
        return true;
}


//날짜시작일과 종료일 id 를 이용하여 시작일이 종료일보다 앞인지여부를 리턴한다.
function isEndDateBefore(startDtId, endDtId){
    if(!hasValueById(startDtId)){
        alert("시작일을 등록하여주세요.");
        return false;
    }

    if(!hasValueById(endDtId))
        alert("종료일을 등록하여주세요.");
        return false;

    var startDtObj = document.getElementById(startDtId);
    var endDtObj = document.getElementById(endDtId);

    if(    eval(startDtObj.value) > eval(endDtObj.value) ){
        alert("시작일이 종료일 보다 늦을 수 없습니다.");
        return false;
    }else{
        return true;
    }
}

//확장자 체크
function checkFileName(strFileName){
    var files    = ["exe","bat","php","asp","html","htm","jsp","xml","java","class"];
    var isNotUpload = isFileCheck(files, strFileName);

    return !isNotUpload;
}

// 허용가능한 화장자 체크
function allowCheckFileName(strFileName){
    var files    = ["zip", "ZIP"];
    var isNotUpload = isFileCheck(files, strFileName);

    return isNotUpload;
}

//확장자 체크 - 종류별
function isFileCheck(array, strFileName){
    var isNotUpload = false;

    for( var i=0 ; i < array.length ; i++ ){
        if( strFileName.toLowerCase().indexOf( '.'+(array[i].toLowerCase()) ) >= 0 )
            isNotUpload = true;
    }

    return isNotUpload;
}

//첨부파일 확장자 체크(1개)
function isUploadableFile(fileId){
    var strFileName = "";
	if(document.getElementById(fileId) != null){
		strFileName = document.getElementById(fileId).value;
	}
    var isUpload = false;

    if(strFileName == ""){
    	isUpload = true;
    }
    else{
    	isUpload = checkFileName(strFileName);
    }

    if(!isUpload){
    	alert("허락되지 않은 파일 확장자가 있습니다.\n\n관리자에게 문의하시기 바랍니다.");
    }

    return isUpload;
}

//첨부파일 확장자 체크(1개)
function isAllowUploadableFile(fileId){
    var strFileName = "";
	if(document.getElementById(fileId) != null){
		strFileName = document.getElementById(fileId).value;
	}
    var isUpload = false;

    if(strFileName == ""){
    	isUpload = true;
    }
    else{
    	isUpload = allowCheckFileName(strFileName);
    }

    if(!isUpload){
    	alert("허락되지 않은 파일 확장자가 있습니다.\n\n관리자에게 문의하시기 바랍니다.");
    }

    return isUpload;
}

//첨부파일 확장자 체크(2개 이상)
function isUploadableFiles(fileId, fileNum){
    var count = 0;
    var uploadable = false;
    for( var i=1 ; i<=fileNum ; i++ ){
    	var strFileName = "";
    	if(document.getElementById(fileId+i) != null){
    		strFileName = document.getElementById(fileId+i).value;
    	}
        
        var isUpload = false;

        if(strFileName == ""){
        	isUpload = true;
        }else{
        	isUpload = checkFileName(strFileName);
        }

        if(isUpload){
            count++;
        }
        if(fileNum == count){
        	uploadable = true;
        	
        }else{
        	uploadable = false;
        }
    }
    if(!uploadable){
    	alert("허락되지 않은 파일 확장자가 있습니다.\n\n관리자에게 문의하시기 바랍니다.");
    }

    return uploadable;
}

//Name 을 이용하여 value를 배열로 리턴
function jsGetArray(name){
    var obj = document.getElementsByName(name);
    var array = new Array();
    for( var i=0 ; i<obj.length ; i++ ){
        array[i] = obj[i].value;
    }
    return array;
}

//Name 을 이용하여 encode 한 value를 배열로 리턴
function jsGetEncodeArray(name){
    var obj = document.getElementsByName(name);
    var array = new Array();
    for( var i=0 ; i<obj.length ; i++ ){
        array[i] = encodeURIComponent(obj[i].value);
    }
    return array;
}

//array를 encode 한 array로 리턴
function jsGetEncodeArrayInArray(array){
    var _array_ = new Array();
    for( var i=0 ; i<array.length ; i++ ){
        _array_[i] = encodeURIComponent(array[i]);
    }
    return _array_;
}

//Name 을 이용하여 체크박스의 체크여부에 따른 value를 Y,N인 배열로 리턴
function jsGetArrayForCheckBox(name){
    var obj = document.getElementsByName(name);
    var array = new Array();
    var isChecked;
    for( var i=0 ; i<obj.length ; i++ ){
        if(obj[i].checked){
            isChecked = "Y";
        }else{
            isChecked = "N";
        }
        array[i] = isChecked;
    }
    return array;
}

//Name 을 이용하여 체크박스의 체크여부에 따른 value를 배열로 리턴
function jsGetArrayForCheckBoxChecked(name){
    var obj = document.getElementsByName(name);
    var array = new Array();
    var index = 0;
    for( var i=0 ; i<obj.length ; i++ ){
        if(obj[i].checked){
            array[index] = obj[i].value;
            index++;
        }
    }
    return array;
}

//Name 을 이용하여 선택된 체크박스가 있는지 체크
function hasCheckedForCheckBox(name) {
    var obj = document.getElementsByName(name);
    for (var inx = 0; inx < obj.length; inx++) {
        if (obj[inx].checked){
            return true;
        }
    }
    return false;
}

//Name 을 이용하여 선택된 라디오버튼이 있는지 체크
function hasCheckedRadio(name) {
    var obj = document.getElementsByName(name);
    for (var inx = 0; inx < obj.length; inx++) {
        if (obj[inx].checked) return true;
    }
    return false;
}

//Name 을 이용하여 checkbox를 모두 on/off 시킨다.
function turnOnOffCheckBox(ob, name) {
	if(jsGetCheckBoxCheckedValue(ob) == 'Y'){
        turnOnCheckBox(name);
	} else {
		turnOffCheckBox(name);
	}
}

//Name 을 이용하여 checkbox를 모두 on/off 시킨다.
function turnOnCheckBox(name) {
    var obj = document.getElementsByName(name);
    for (var inx = 0; inx < obj.length; inx++) {
        obj[inx].checked = true;
    }
    return false;
}

//Name 을 이용하여 checkbox를 모두 on/off 시킨다.
function turnOffCheckBox(name) {
    var obj = document.getElementsByName(name);
    for (var inx = 0; inx < obj.length; inx++) {
        obj[inx].checked = false;
    }
    return false;
}

//Name 을 이용하여 라디오버튼의 체크된 value를 리턴.
function jsGetRadioButtonCheckedValue(name){
    var obj = document.getElementsByName(name);
    var val = "";
    for( var i=0 ; i<obj.length ; i++ ){
        if(obj[i].checked){
            val = obj[i].value;
        }
    }

    return val;
}

//Name 을 이용하여 라디오버튼의 체크된 id를 리턴.
function jsGetRadioButtonCheckedId(name){
    var obj = document.getElementsByName(name);
    var objId = "";
    for( var i=0 ; i<obj.length ; i++ ){
        if(obj[i].checked){
            objId = obj[i].id;
        }
    }

    return objId;
}

//id 을 이용하여 체크박스의 체크여부에 따른 value를 Y,N으로 리턴.
function jsGetCheckBoxCheckedValue(id){
    var obj = document.getElementById(id);
    var val = "";

    if(obj != null && obj.checked){
        val = "Y";
    }else{
        val = "N";
    }

    return val;
}

// name 을 이용하여 체크박스들의 체크여부에 따른 value를 Y,N으로 리턴.
// ex - 리스트에서 다중선택시에 사용
function jsGetCheckBoxCheckedValuesYN(name){
    var obj = document.getElementsByName(name);
    var arr = new Array();

    for(var i=0; i<obj.length; i++){
        if(obj[i] != null && obj[i].checked){
             arr[arr.length] = "Y";
        }else
             arr[arr.length] = "N";
    }
    return arr;
}

// name 을 이용하여 체크박스들의 체크된 값만 리턴
// ex - 리스트에서 다중선택시에 사용
function jsGetCheckBoxCheckedValues(name){
    var obj = document.getElementsByName(name);
    var arr = new Array();

    for(var i=0; i<obj.length; i++){
        if(obj[i].checked){
             arr[arr.length] = obj[i].value;
        }
    }
    return arr;
}

// name을 이용하여 체크박스 한번에 선택/해제 하기
// ex - 리스트에서 다중선택시에 사용
/*
사용못함 by saver 20080210
아래의 function 을 사용한 곳은 turnOnOffCheckBox(ob, name); 을 사용하기바람.
function jsAllCheckBoxChecked(name){
    var obj = document.getElementsByName(name);

    for(var i=0; i<obj.length; i++){
        if(obj[i].checked){
            obj[i].checked = false
        } else {
            obj[i].checked = true
        }
    }
}
*/

//Name 을 이용하여 선택박스의 선택된 값을 배열로 리턴
function jsGetArrayForSelectedValue(name){
    var obj = document.getElementsByName(name);

    var array = new Array();
    var index = 0;
    for( var i=0 ; i<obj.length ; i++ ){
        array[i] = getSelectedValueUseObject(obj[i]);
    }
    return array;
}

function getSelectedValueUseObject(obj){
    if ( obj == null )
        return null;
    if ( obj.options.length == 0 )
        return null;
    if ( obj.selectedIndex == -1 )
        return null;

    return obj.options[obj.selectedIndex].value;
}

//id 을 이용하여 선택된 선택박스 길이를 얻는다.
function getSelectBoxLength(id){
    var obj = document.getElementById(id);

    if ( obj == null )
        return null;

    return obj.options.length;
}

//id 와 index 를 이용하여 해당 선택박스의 해당 인덱스를 선택한다.
function jsSelectedByIndex(id, index){
    var obj = document.getElementById(id);

    if ( obj == null || eval(index) < 0)
        return;
    if ( getSelectBoxLength(id) > 0 )
        obj.options[index].selected = true;
}

//id와 value 를 이용하여 해당 선택박스의 해당 인덱스를 선택한다.
function jsSelectedByValue(id, val){
    var obj = document.getElementById(id);
    var index = 0;
    for(var i=0 ; i < obj.options.length ; i++){
        if(obj.options[i].value == val){
            index = i;
        }
    }

    obj.options[index].selected = true;
}

//id 을 이용하여 선택된 선택박스의 인덱스를 얻는다.
function getSelectedIndex(id){
    var obj = document.getElementById(id);
    return obj.selectedIndex;
}

//id 을 이용하여 선택된 선택박스의 값을 얻는다.
function getSelectedValue(id){
    var obj = document.getElementById(id);

    if ( obj == null )
        return null;
    if ( obj.options.length == 0 )
        return null;
    if ( obj.selectedIndex == -1 )
        return null;

    return obj.options[obj.selectedIndex].value;
}

//id 을 이용하여 선택된 선택박스의 텍스트를 얻는다.
function getSelectedText(id){
    var obj = document.getElementById(id);

    if ( obj == null )
        return null;
    if ( obj.options.length == 0 )
        return null;
    if ( obj.selectedIndex == -1 )
        return null;

    return obj.options[obj.selectedIndex].text;
}

//id와 index를 이용하여 index의 선택박스의 값을 얻는다.
function getSelectValueByIndex(id, index){
    var obj = document.getElementById(id);

    if ( obj == null )
        return null;
    if ( obj.options.length == 0 )
        return null;
    if ( obj.options.length <= index )
        return null;

    return obj.options[index].value;
}

//id 와 index를 이용하여 해당 인덱스의 선택박스의 텍스트를 얻는다.
function getSelectTextByIndex(id, index){
    var obj = document.getElementById(id);

    if ( obj == null )
        return null;
    if ( obj.options.length == 0 )
        return null;
    if ( obj.options.length <= index )
        return null;

    return obj.options[index].text;
}

//id 을 이용하여 지정한 값과 일치하는 선택박스의 인덱스를 얻는다.
function getIndexByValue(id, value) {
    var obj = document.getElementById(id);

    if ( obj == null )
        return;

    for ( var i = 0; i < obj.options.length; i++ ) {
        if ( obj.options[i].value == value )
            return i;
    }
    return -1;  // not found.
}

//id 을 이용하여  지정한 값과 일치하는 선택박스의 인덱스를 삭제한다.
function removeOptionByValue(id, value) {
    var obj = document.getElementById(id);

    if ( obj == null )
        return false;

    var index = getIndexByValue( id, value );
    var srcC = 0, destC = 0;

    if ( index == -1 ) return false; // not found

    // else value was found, shift all elemenets which are after index

    var removed;
    while ( srcC < obj.options.length) {
        obj.options[destC] = obj.options[srcC];

        if( removed ) {

            return;
        }

        if ( srcC == index ) {
            destC--;
            removed = true;
        }
        srcC++;
        destC++;
    }

    obj.options.length -= 1;

    return true;
}

// selectBox 의 아이디를 이용하여 selectBox안의 내용을 구분자를 넣어 하나의 String으로 합치는 Method
// 인자값 설명 : ob1는 selectBox의 아이디명
//            gubun는 원하는 구분자 ex)',' , '/' 등
function jsGetSelectBoxValuePut(ob1, gubun, indexSeq){

    var param = document.getElementById(ob1);

    var selectString = "";

    if(!indexSeq){
        indexSeq = 0;
    }

    for(var i=indexSeq; i<param.options.length; i++){

        if((param.options.length -1) != i){
            selectString = selectString + param.options[i].text + gubun;
        } else {
            selectString = selectString + param.options[i].text;
        }

    }
    return selectString;
}

// 위 함수와 동일 하나 결과값은 해당 selectBox의 value 값을 return함
function jsGetSelectBoxValueIndexPut(ob1, gubun, indexSeq){

    var param = document.getElementById(ob1);

    var selectIndex = "";

    if(!indexSeq){
        indexSeq = 0;
    }

    for(var i=indexSeq; i<param.options.length; i++){

        if((param.options.length -1) != i){
            selectIndex = selectIndex + param.options[i].value + gubun;
        } else {
            selectIndex = selectIndex + param.options[i].value;
        }

    }

    return selectIndex;

}

// 필드의 ID를 인자로 select box 안의 값을 배열로 반환
function jsSelectBoxValueArray(obj){

    var len = getSelectBoxLength(obj);
    var selectArray = new Array(len);

    for(i=0; i<len; i++){
        selectArray[i] = $(obj).options[i].value;
    }

    return selectArray;
}

// 필드의 ID를 인자로 select box 안의 텍스트값을 배열로 반환
function jsSelectBoxTextArray(obj){

    var len = getSelectBoxLength(obj);
    var selectArray = new Array(len);

    for(i=0; i<len; i++){
        selectArray[i] = $(obj).options[i].text;
    }

    return selectArray;
}

//셀렉트 박스의 해당 인덱스를 삭제한다.
function removeOption(id, index){
    var selectbox = document.getElementById(id);

    if(selectbox == null){
        alert("선택박스가 null 입니다.");
    }else if(index < 0){
        alert("index는 0이상이어야합니다.");
    }else if(selectbox.length <= index){
        alert("index의 크기가 범위 이상입니다.");
    }else{
        selectbox.remove(index);
    }
}

//셀렉트 박스 옵션 전체 삭제
function removeAllOptions(id){
    var selectbox = document.getElementById(id);
    var i;
    for(i=selectbox.options.length-1;i>=0;i--){
        selectbox.remove(i);
    }
}

//셀렉트 박스에 옵션을 추가한다.
function addOption(id,text,value){
    var selectbox = document.getElementById(id);
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
}

//셀렉트 박스에 해당인덱스에 옵션을 추가한다.
function addOptionToIndex(id,text,value, index){
    var selectbox = document.getElementById(id);
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn, index);
}

/*
    달력 호출하는 메소드
    폼의 필드의 아이디를 인자값으로 넘긴다.
    ---> 차후 스킨 적용되도록 수정예정임
*/
function jsGetDate(fieldId, split) {
    var url = "/common/calender.tomato";
    var ws = jsFormatWindowProperty(166, 129, 270, 210);

    url += "?fieldId="+fieldId;
    url += "&split="+split;

    window.open(url, null, ws);
}

/*
    baseLayout이 되는 jsp페이지에 <div id="calendarBody"></div>반드시 선언한다.
    fieldId : 입력을 원하는 text 또는 textarea의 id
    split : 원하는 구분자
    targetOb : 달력 레이어를 오픈할 아무 ID
    예 > <a href="javascript:;" onClick="jsGetDateLayer(this, 'startD', '-', 'targetID')">달력</a>
    반드시 이벤트에 의해 호출할것 
*/
function jsGetDateLayer(start, fieldId, split, targetOb) {
	
	var top = $(targetOb).cumulativeOffset().top + 20;
	var left = $(targetOb).cumulativeOffset().left;
	
	$("calendarBody").setStyle({top: top+"px",left: left+"px"});
	
	var request = dojo.io.bind({
        url: "/common/calendarLayer.tomato",
        method: "post",
        content: {
			ajax: true,
			split: split,
            id: fieldId
        },
        error: function (type, errObj){
            alert(errObj.message);
        },
        load: function (type, data, evt){
            $("calendarBody").innerHTML = data;
			explode('calendarBody', start);
        }
    });
}

// 레이어 위에 나타나는 달력 월변경하기
function jsGetDateMove(obj, year, month, day, split, id){
	var request = dojo.io.bind({		
		url: "/common/calendarLayer.tomato",
		method: "post", 
		content: {
			year: year,
			month: month,
			day: day,
			id: id,
			split: split
		},
		error: function (type, errObj){
			alert(errObj.message);
		},
		load: function (type, data, evt){
			$(obj).innerHTML = data;
		}
	});	
}

/* 선택한 날짜 지정된 필드에 값 삽입하기
   ob1 : 달력 레이어 ID
   ob2 : target ID
   year : 년 
   month : 월
   day : 일
   반드시 이벤트로 호출할것
   예 > <a href="javascript:;" onClick="jsGetDateSelected(this, 'ob1', 'ob2', '0000', '00', '00', '-')"/>선택</a>
*/   
function jsGetDateSelected(start, ob1, ob2, year, month, day, split){
	$(ob2).value = year + split + month + split + day;
	implode(ob1, start);
}

/*
    필수 입력사항등 입력값 널 체크
    ex)  if(jsInputValueCheckIt("아이디이름", "오류메세지") == false) { return; }
*/
function jsInputValueCheckIt(idName, str){
    if(!trim($(idName).value)){
        alert(str);
        $(idName).focus();
        return false;
    } else {
        return true;
    }
}

function jsInputValueCheckItModal(obj, str){
	if(!trim($(obj).value)){
        alertMsg(str, "alertFocus", '','', obj);
        return false;
    } else {
        return true;
    }
}

/*
    날짜 검색등 시작일과 종료일이 있는경우 종료일이 시작일 보다 앞의 날짜일때 체크
    ex)  if(jsInputDateValueCheckIt("시작일아이디이름", "종료일아이디이름", "토론기간 설정이 잘못 되었습니다.\n\n다시 선택해 주세요") == false) { return ; }

    단 날짜의 입력형식은 '0000-00-00'  의 형식을 따라야 함...
*/
function jsInputDateValueCheckIt(dateS, dateE, str) {

    if(!$(dateS).value){
        alert(str);
        return false;
    }

    if(!$(dateE).value){
        alert(str);
        return false;
    }

    if(($(dateS).value) && ($(dateE).value)){
        var tmpSdate = $(dateS).value.split("-");
        var tmpEdate = $(dateE).value.split("-");

        var s_date = tmpSdate[0]+tmpSdate[1]+tmpSdate[2];
        var e_date = tmpEdate[0]+tmpEdate[1]+tmpEdate[2];

        if(parseInt(s_date)    > parseInt(e_date)){
            alert(str);
            $(dateS).value = "";
            $(dateE).value = "";
            return false;
        }
    }
}


function jsFormatWindowProperty(left, top, width, height) {

    if (typeof(window.showModalDialog) != 'undefined') {
        return "status:no; left=" + left + ", top=" + top + ", width=" + width + ", height=" + height + "";
    } else {
        return "modal, left=" + left + "px, top=" + top + ", width=" + width + "px, height=" + height + "px";
    }
}

/*
 * 학교명 검색
 */
var schoolNameInputIdg;
var orgCdInputIdg;
function jsSearchSchool(schoolNameInputId, orgCdInputId) {

    $("schoolGradeCdC").value = "";

    schoolNameInputIdg = schoolNameInputId;
    orgCdInputIdg = orgCdInputId;

    var url = "/kem/searchSchool.tomato";

    PopCenterWindow(url, 500, 400, "N")
}

function jsSelectSchool(schoolName, orgCd, schoolGradeCd) {

    $(schoolNameInputIdg).value = schoolName;
    $(orgCdInputIdg).value = orgCd;
}

/**
 * 본문글자수 체크
 */
var oldText = "";
var oldCount = 0;
function jsInputCheckLenth(maxbyte, objId){
    var temp;
    var memocount;
    memocount = 0;
    len = $F(objId).length;

    for(k=0;k<len;k++){
        temp = $F(objId).charAt(k);
        if(escape(temp).length > 4)
            memocount += 2;
        else
            memocount++;
    }

    if (memocount > eval(maxbyte)) {
        alert(maxbyte+" byte 까지만 쓰실 수 있습니다.");
        $(objId).value = oldText;
        $(objId).focus();
        return false;
    }else{
        oldText = $F(objId);
        oldCount = memocount;
        return true;
    }
}
function jsCheckLen(maxbyte, objId, spanId){
    var temp;
    var memocount;
    memocount = 0;
    len = $F(objId).length;

    for(k=0;k<len;k++){
        temp = $F(objId).charAt(k);
        if(escape(temp).length > 4)
            memocount += 2;
        else
            memocount++;
    }
    $(spanId).innerHTML = memocount;

    if (memocount > eval(maxbyte)) {
        alert(maxbyte+" byte 까지만 쓰실 수 있습니다.");
        $(objId).value = oldText;
        $(spanId).innerHTML = oldCount;
        $(objId).focus();
    }else{
        oldText = $F(objId);
        oldCount = memocount;
    }
}

// 해당 필드의 글자수(바이트단위) 구하는 함수
// 인자는 해당 필드의 아이디를 넣으면 됨
function jsByteLength(field) {
    var byteLength = 0;
    for (var inx = 0; inx < $(field).value.length; inx++) {
        var oneChar = escape($(field).value.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}

// 해당 필드의 글자수(바이트단위) 구하여 원하는 크기보다 클때 참 또는 거짓을 리턴
// 인자는 해당 필드의 아이디와 원하는 길이, 그리고 메세지를 인자로 함
function jsByteLengthTrueOrFalse(field, length, msg) {
    var byteLength = 0;
    for (var inx = 0; inx < $(field).value.length; inx++) {
        var oneChar = escape($(field).value.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }

    if(byteLength > length){
        alert(msg);
        return false;
    } else {
        return true;
    }
}

// 해당 필드의 글자수(바이트단위) 구하여 원하는 크기의 문자열을 반환
// 인자는 해당 필드의 아이디와 원하는 길이를 인자로 함
function jsByteLengthString(field, length) {
     var inc = 0;
     var nbytes = 0;
     var msg = "";

    for (i=0; i<$(field).value.length; i++) {
        var ch = $(field).value.charAt(i);
        if (escape(ch).length > 4) {
            inc = 2;
        } else if (ch == '\n') {
            if ($(field).value.charAt(i-1) != '\r') {
                inc = 1;
            }
        } else if (ch == '<' || ch == '>') {
            inc = 4;
        } else {
            inc = 1;
        }

        if ((nbytes + inc) > length) {
            break;
        }

        nbytes += inc;
        msg += ch;
    }
    return msg;
}
//delimiter를 이용하여 input box의 Value를 하나의 String으로 포맷
//전화번호, 또는 카드번호, 주민번호등에 사용
function jsFormatedStrByDelimiter(fieldId, fieldNum, delimiter){
    var strFieldValue = "";
    for( var i=1 ; i<=fieldNum ; i++ ){
        strFieldValue += document.getElementById(fieldId+i).value;
        if (i != fieldNum) {
            strFieldValue = strFieldValue + delimiter;
        }
    }

    return strFieldValue;
}


//textarea리사징
function jsTextareaResize(flag, ta, size) {
    var msg = "더 이상 줄일 수 없습니다.";
    if (flag == "down") {
        if (ta.rows == size) {
            alert(msg);
            return;
        }
        ta.rows = ta.rows - 2;
        return;
    }
    else {
        ta.rows = ta.rows + 2;
        return;
    }
}

//iframe리사징 함수
function resizeFrame(iframeObj){
    var innerBody = iframeObj.contentWindow.document.body;

    var innerHeight = innerBody.scrollHeight + (innerBody.offsetHeight - innerBody.clientHeight);
   // var innerWidth = innerBody.scrollWidth + (innerBody.offsetWidth - innerBody.clientWidth);

    iframeObj.style.height = innerHeight;
    //iframeObj.style.width = 100%;
}


/**
 * 동작 가능한 브라우저 판단. for ajax
 */
function chkAjaBrowser() {
    var a,ua = navigator.userAgent;
    this.bw= {
      safari    : ((a=ua.split('AppleWebKit/')[1])?a.split('(')[0]:0)>=124 ,
      konqueror : ((a=ua.split('Konqueror/')[1])?a.split(';')[0]:0)>=3.3 ,
      mozes     : ((a=ua.split('Gecko/')[1])?a.split(" ")[0]:0) >= 20011128 ,
      opera     : (!!window.opera) && ((typeof XMLHttpRequest)=='function') ,
      msie      : (!!window.ActiveXObject)?(!!createHttpRequest()):false
    }
    return (this.bw.safari||this.bw.konqueror||this.bw.mozes||this.bw.opera||this.bw.msie)
}

// id를 이용하여 이메일의 형식을 체크함
// return false;
function jsEmailValueCheck(id){
    if(/^[_0-9a-z-]+@[_0-9a-z-]+\.[_0-9a-z-]/g.test($F(id)) == false){
        alert("정확한 email 주소를 입력해 주십시오.");
        $(id).focus();
        return false;
    }
}

/* 첨부파일 체크 시작 */
//이미지 type
function getImages(){
    return ["gif","jpg","jpeg","pnp","bmp"];
}
//문서 type
function getDocs(){
    return ["xls","doc","ppt","pdf","txt"];
}
//Avis type
function getAvis(){
    return [];
}
//압축 type
function getZips(){
    return [];
}

//이미지확장자 체크
function checkImgFileName(strFileName){
    var images    = getImages();
    var isImage = isFileCheck(images, strFileName);

    var isUpload = isImage;

    return isUpload;
}

//첨부파일(이미지) 확장자 체크(1개)
function isUploadableImgFile(fileId){
    var strFileName = document.getElementById(fileId).value;
    var isUpload = false;

    if(strFileName == ""){
        alert('파일을 선택해주세요');
        return isUpload;
    }else{
        isUpload = checkImgFileName(strFileName);
    }

    if(!isUpload)    alert("허락되지 않은 파일 확장자가 있습니다.\n\n관리자에게 문의하시기 바랍니다.");

    return isUpload;
}


//스크랩 리스트 생성 팝업 호출
    function jsScrapInsert(){

        window.open("",'scrap','top=0, left=0, width=550, height=450, scrollbars=yes, resizable=no');

        $("scrap").action="/common/scrap/scrapCfg.tomato";
        $("scrap").target="scrap";
        $("scrap").method="post";
        $("scrap").submit();
    }



// 주민번호 유효성 체크 (res1 : 주민번호 앞자리 아이디, res1 : 주민번호 뒷자리 아이디)
// 유효할 경우 ok 리턴
function isResNoCheck(res1, res2){
    var jumin1 = $F(res1);
    var jumin2 = $F(res2);

    var jumin = jumin1 + jumin2;
    a = new Array(13);
    for (var i=0; i < 13; i++) {
        a[i] = parseInt(jumin.charAt(i));
    }

    var j = a[0]*2 + a[1]*3 + a[2]*4 + a[3]*5 + a[4]*6 + a[5]*7 + a[6]*8 + a[7]*9 + a[8]*2 + a[9]*3 + a[10]*4 + a[11]*5;
    var j = j % 11;
    var k = 11 - j;

    if (k > 9) {
            k = k % 10
    }

    if (k != a[12]){
        alertMsg("주민번호가 틀렸습니다.\n\n다시 입력해 주세요.","alert");
        return false;
    } else {
        return true;
    }
}

function isResNoLengthCheck(fieldId, length, str){
	if($F(fieldId).length != length){
		alert(str);
		$(fieldId).focus();

		return false;
	}
	return true;
}



function movieCenter(divId) {

    var fileName, intWidth, intHeight;
    var screenWidth;
    var screenHeight;

    if(isIE) {
        screenWidth = screen.availwidth;
        screenHeight = screen.availheight;
    } else {
        screenWidth = screen.width;
        screenHeight = screen.height;
    }

    //alert("screenWidth : " + screenWidth);
    //alert("screenHeight : " + screenHeight);
    //alert("(screenWidth/2) : " + (screenWidth/2));
    //alert("(screenHeight/2) : " + (screenHeight/2));

    var divWidth = $(divId).style.width;
    var divHeight = $(divId).style.height;
    var newDivWidth;
    var newDivHeight;

    if (endsWith(divWidth.toLowerCase(), "px")) {
        newDivWidth = divWidth.substring(0, getLength(divWidth) - 2);
    }

    if (endsWith(divHeight.toLowerCase(), "px")) {
        newDivHeight = divHeight.substring(0, getLength(divHeight) - 2);
    }

    var intLeft = (screenWidth - newDivWidth) / 2;
    var intTop = (screenHeight - newDivHeight) / 2;

    //alert("intLeft : " + intLeft);
    //alert("intTop : " + intTop);

    $(divId).style.left = intLeft + "px";
    $(divId).style.top = (intTop - 200) + "px";


}

function getText(el){
    var text = "";
    if(el != null){
        if(el.childNodes){
            for(var i=0;i<el.childNodes.length;i++){
                var childNode = el.childNodes[i];
                if(childNode.nodeValue != null){
                    text = text + childNode.nodeValue;
                }
            }
        }
    }
    return text;
}

function replaceText(el, text){
    if(el != null){
        clearText(el);
        var newNode = document.createTextNode(text);
        el.appendChild(newNode);
    }
}

function clearText(el){
    if(el != null){
        if(el.childNodes){
            for(var i=0;i<el.childNodes.length;i++){
                var childNode = el.childNodes[i];
                el.removeChild(childNode);
            }
        }
    }
}

//숫자인지를 체크후 경고 메시지 출력 해당 필드로 포커스 이동
// val : 해당 필드의 값(this.value)
// field : 필드의 ID
// msg : 경고메시지
function isNumber(val, field, msg){
    if(isNumeric(val) == false){        
        $(field).select();
		//alertMsg(msg, 'alertFocus', '', '', field);
		alert(msg);
        return false;
    }
}

//해당 필드안에 내용을 전체 선택
function jsSelectField(field){
    $(field).select();
}

function flashWrite(src, width, height){
    document.write('<embed src="'+src+'" play="true" loop="true" quality="high" WMode="Transparent" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" width="'+width+'" height="'+height+'">')
}

// returns true if the string is empty
function isEmpty(str){
  return (str == null) || (str.length == 0);
}
// returns true if the string is a valid email
function isEmail(str){
  if(isEmpty(str)) return false;
  var re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
  return re.test(str);
}
// returns true if the string only contains characters A-Z or a-z
function isAlpha(str){
  var re = /[^a-zA-Z]/g
  if (re.test(str)) return false;
  return true;
}
// returns true if the string only contains characters 0-9
function isNumeric(str){
  var re = /[\D]/g
  if (re.test(str)) return false;
  return true;
}
// returns true if the string only contains characters A-Z, a-z or 0-9
function isAlphaNumeric(str){
  var re = /[^a-zA-Z0-9]/g
  if (re.test(str)) return false;
  return true;
}
//returns true if the string only contains characters A-Z, a-z or 0-9
function isSmallAlphaNumeric(str){
  var re = /[^a-z0-9]/g
  if (re.test(str)) return false;
  return true;
}
// returns true if the string's length equals "len"
function isLength(str, len){
  return str.length == len;
}
// returns true if the string's length is between "min" and "max"
function isLengthBetween(str, min, max){
  return (str.length >= min)&&(str.length <= max);
}
// returns true if the string is a US phone number formatted as...
// (000)000-0000, (000) 000-0000, 000-000-0000, 000.000.0000, 000 000 0000, 0000000000
function isPhoneNumber(str){
  var re = /^\(?[2-9]\d{2}[\)\.-]?\s?\d{3}[\s\.-]?\d{4}$/
  return re.test(str);
}
// returns true if the string is a valid date formatted as...
// mm dd yyyy, mm/dd/yyyy, mm.dd.yyyy, mm-dd-yyyy
function isDate(str){
  var re = /^(\d{1,2})[\s\.\/-](\d{1,2})[\s\.\/-](\d{4})$/
  if (!re.test(str)) return false;
  var result = str.match(re);
  var m = parseInt(result[1]);
  var d = parseInt(result[2]);
  var y = parseInt(result[3]);
  if(m < 1 || m > 12 || y < 1900 || y > 2100) return false;
  if(m == 2){
          var days = ((y % 4) == 0) ? 29 : 28;
  }else if(m == 4 || m == 6 || m == 9 || m == 11){
          var days = 30;
  }else{
          var days = 31;
  }
  return (d >= 1 && d <= days);
}
// returns true if "str1" is the same as the "str2"
function isMatch(str1, str2){
  return str1 == str2;
}
// returns true if the string contains only whitespace
// cannot check a password type input for whitespace
function isWhitespace(str){ // NOT USED IN FORM VALIDATION
  var re = /[\S]/g
  if (re.test(str)) return false;
  return true;
}
// removes any whitespace from the string and returns the result
// the value of "replacement" will be used to replace the whitespace (optional)
function stripWhitespace(str, replacement){// NOT USED IN FORM VALIDATION
  if (replacement == null) replacement = '';
  var result = str;
  var re = /\s/g
  if(str.search(re) != -1){
    result = str.replace(re, replacement);
  }
  return result;
}

// X 또는 Y좌표값 구하기
// 반드시 이벤트발생시 event와 구하고자 하는 구분자를 인자로 넘긴다.
// 예 : <a href="javascript:;" onClick="jsCoordinates(event, 'X')"/>X 좌표구하기</a>
// 예 : <a href="javascript:;" onClick="jsCoordinates(event, 'Y')"/>Y 좌표구하기</a>
function jsCoordinates(event, type){
	var val;
	if(type == "X"){
		if(isNav() == true){val = event.pageX;}
		else {val = event.x;}
	} else {
		if(isNav() == true){val = event.pageY;}
		else {val = event.y;}
	}

	return val;
}

function getCenterX(width) {

	var screenWidth;
	
	if(isIEBrowser()) {
		screenWidth = screen.availwidth;
	} else {
		screenWidth = screen.width;
	}

	return ((screenWidth - width) / 2);
}


function getCenterY(height) {

	var screenHeight;
	
	if(isIEBrowser()) {
		screenHeight = screen.availheight;
	} else {
		screenHeight = screen.height;
	}
	
	return ((screenHeight - height)/2);
}

function getCenterY2(height) {

	var screenHeight;
	
	if(isIEBrowser()) {
		screenHeight = screen.availheight;
	} else {
		screenHeight = screen.height;
	}
	
	return (((screenHeight - height)/2) - 50);
}


function isIEBrowser() {
    var ua = navigator.userAgent.toLowerCase();

    return (ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1);
}

/**
 * 
 * @param fileId fileobjId
 * @return 엑셀파일여부
 */
function excelIsUploadableFile(fileId){
    var strFileName = $F(fileId);
    var isUpload = false;

    if(trim(strFileName) == ""){
    	isUpload = false;
    }else{
    	isUpload = excelCheckFileName(strFileName);
    }

    return isUpload;
}

function excelCheckFileName(strFileName){
    var files = ["xlsx"];
    var isUpload = excelIsFileCheck(files, strFileName);
    return isUpload;
}

function excelIsFileCheck(array, strFileName){
    var isUpload = false;

    for( var i=0 ; i < array.length ; i++ ){
        if( strFileName.toLowerCase().indexOf( '.'+(array[i].toLowerCase()) ) >= 0 ){
        	isUpload = true;
        }
    }

    return isUpload;
}







/**
 * @parma msg 메시지
 * @parma alertType alert 창 종류
 * @parma action1 첫번째 사용자 정의 함수
 * @parma action2 두번째 사용자 정의 함수
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @return alert 메시지
 */
function alertMsg(msg, alertType, action1, action2, obj, width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal){
	$("alertMsg").innerHTML = msg;
	
	if(width == undefined || width == '' || isNumeric(width) == false){ width = 300; }	
	if(height == undefined || height == '' || isNumeric(height) == false){ height = 200; }
	if(maxWidth == undefined || maxWidth == '' || isNumeric(maxWidth) == false){ maxWidth = 300; }
	if(maxHeight == undefined || maxHeight == '' || isNumeric(maxHeight) == false){ maxHeight = 200; }
	if(draggable == undefined || draggable == ''){ draggable = false; }
	if(closeOnEscape == undefined || closeOnEscape == ''){ closeOnEscape = false; }
	if(resizable == undefined || resizable == ''){ resizable = false; }
	if(modal == undefined || modal == ''){ modal = true; }
	if(action1 == undefined || action1 == ''){ action1 = '';}
	if(action2 == undefined || action2 == ''){ action2 = '';}
	
	// 기본 alert
	if (alertType == undefined || alertType == "" || alertType == "alert")
	{
		alertWindow(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal);
	}
	
	// alert후 사용자 액션처리
	else if (alertType == "alertMove")
	{
		alertMove(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, action1);
	}
	
	// alert후 지정 필드 이동
	else if (alertType == "alertFocus")
	{
		alertFocusWindow(obj, width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal);
	}
	
	// confirm
	else if (alertType == "alertConfirm")
	{
		alertConfirmWindow(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, action1, action2);
	}
	
	// confirm
	else if (alertType == "alertNotice")
	{
		alertNotice(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, msg);
	}
	
	else 
	{
		alertWindow(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal);
	}
}

/**
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @param action 사용자 정의 함수
 * @return alert window
 */
function alertMove(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, action){
	jQuery("#alertMsg").dialog({
		bgiframe: true,
		width: width,
		height: height,
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		draggable: draggable,
		closeOnEscape: closeOnEscape,
		resizable: resizable,
		modal: modal,
		buttons: {
			확인: function() {
				jQuery(this).dialog('destroy');
				if(action != ""){
					eval(action);
				}
			}
		},
		close: function(){
			jQuery(this).dialog('destroy');
			if(action != ""){
				eval(action);
			}
		}
	});
}

/**
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @return alert window
 */
function alertWindow(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal){
	jQuery("#alertMsg").dialog({
		bgiframe: true,
		width: width,
		height: height,
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		draggable: draggable,
		closeOnEscape: closeOnEscape,
		resizable: resizable,
		modal: modal,
		buttons: {
			확인: function() {
				jQuery(this).dialog('destroy');
			}
		},
		close: function(){
			jQuery(this).dialog('destroy');
		}
	});
}

/**
 * @param obj focus를 원하는 id
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @return alert window
 */
function alertFocusWindow(obj, width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal){
	jQuery("#alertMsg").dialog({
		bgiframe: true,
		width: width,
		height: height,
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		draggable: draggable,
		closeOnEscape: closeOnEscape,
		resizable: resizable,
		modal: modal,
		buttons: {
			확인: function() {
				jQuery(this).dialog('destroy');
				$(obj).focus();
			}
		},
		close: function(){
			jQuery(this).dialog('destroy');
				$(obj).focus();
		}
	});
}

/**
 * @param obj focus를 원하는 id
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @param action1 첫번째 사용자 정의 함수
 * @param action2 두번째 사용자 정의 함수
 * @return alert window
 */
function alertConfirmWindow(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, action1, action2){
	jQuery("#alertMsg").dialog({
		bgiframe: true,
		width: width,
		height: height,
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		draggable: draggable,
		closeOnEscape: closeOnEscape,
		resizable: resizable,
		modal: modal,
		title: "",
		buttons: {
			닫기: function() {
				jQuery(this).dialog('destroy');
				if(action2 != ""){
					eval(action2);
				}
			},
			확인: function() {
				jQuery(this).dialog('destroy');
				if(action1 != ""){
					eval(action1);
				}
			}
		},
		close: function(){
			jQuery(this).dialog('destroy');
			if(action2 != ""){
				eval(action2);
			}
		}
	});
}

/**
 * @param obj focus를 원하는 id
 * @param width 가로크기
 * @param height 세로크기
 * @param maxWidth 가로 최대크기
 * @param maxHeight 세로 최대크기
 * @param draggable 드레그 여부
 * @param closeOnEscape 
 * @param resizable 사이즈 변경 여부
 * @param modal 뒷배경 방지여부
 * @param msg 화면에 보여줄 메시지
 * @return alert window
 */
function alertNotice(width, height, maxWidth, maxHeight, draggable, closeOnEscape, resizable, modal, msg){
	jQuery("#alertMsg").dialog({
		bgiframe: true,
		width: width,
		height: height,
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		draggable: draggable,
		closeOnEscape: closeOnEscape,
		resizable: resizable,
		modal: modal,
		title: "",
		close: function(){
			jQuery(this).dialog('destroy');
			alertMsg(msg,'alertNotice');
		}
	});
}
