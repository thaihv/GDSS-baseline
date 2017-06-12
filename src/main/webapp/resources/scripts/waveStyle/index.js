
var loginUser;

var sectionNaviDisable = 0;
var sectionContactDisable = 0;

var sectionWestDisable = 0;

var oriNaviHeight = 0;
var oriContactHeight = 0;
var _useFB = 1;

var isCalendarMode = false;
///////////////////////////////////////////////////////////////////////////////

function minimizeNavi() {
	
	if(sectionContactDisable == 1){ 
		outerLayout.toggle("west");
		sectionWestDisable = 1;			
	}else{
		oriNaviHeight = $('.inner-north').height();
		oriContactHeight = $('.inner-center').height() + 183;
	}
	innerLayout.toggle("north");	
	$("#sm01").toggle();
	sectionNaviDisable = 1;
	
	$('#innernorthval').val(oriNaviHeight);
	$('#innercenterval').val(oriContactHeight);
	
}

function extendNavi() {	
	
	if(sectionWestDisable == 1){ 
		outerLayout.toggle("west");			
		$('.inner-north').height(oriNaviHeight + oriContactHeight + 183);
		sectionWestDisable = 0;	
	}else{
		$('.inner-north').height(oriNaviHeight);		
	}
	innerLayout.toggle("north");	
	$("#sm01").toggle();
	sectionNaviDisable = 0;
	$("#accordion").accordion("resize");
	
	$('#innernorthval').val(oriNaviHeight);
	$('#innercenterval').val(oriContactHeight);

}


function minimizeContact() {
	
	if(sectionNaviDisable == 1){ 
		outerLayout.toggle("west");
		sectionWestDisable = 1;
	}else{
	oriNaviHeight = $('.inner-north').height();
	oriContactHeight = $('.inner-center').height() + 183;
	}
	$('.ui-layout-resizer-north').hide();
	$('.inner-north').height(oriNaviHeight + oriContactHeight);
	$(".inner-center").hide('clip',100);
	$("#sm02").toggle();
	sectionContactDisable = 1;
	$("#accordion").accordion("resize");
	
	$('#innernorthval').val(oriNaviHeight);
	$('#innercenterval').val(oriContactHeight);

}

function extendContact() {
	
	$('.inner-north').height(oriNaviHeight);
	
	if(sectionWestDisable == 1){ 
		outerLayout.toggle("west");			
	}
	$('.ui-layout-resizer-north').show();
	$(".inner-center").show('clip',100);
	$("#sm02").toggle();
	sectionWestDisable = 0;
	sectionContactDisable = 0;
	
	$("#accordion").accordion("resize");
	
	$('#innernorthval').val(oriNaviHeight);
	$('#innercenterval').val(oriContactHeight);

}

///////////////////////////////////////////////////////////////////////////////

function minimizeInbox() {
	middleLayout.toggle("west");	
	 $("#sm03").toggle();
}

function extendInbox() {
	middleLayout.toggle("west");	
	 $("#sm03").toggle();
}

//////////////////////////////////////////////////////////////////////////////////



function maxInbox(){
	outerLayout.sizePane("west", '30');
	middleLayout.sizePane("west", '99%');
}

function maxWih(){
	minimizeNavi();
	minimizeContact();
	minimizeInbox();
	$('#wihmax_bt').hide();
	$('#wihmini_bt').show();
	
	//	outerLayout.sizePane("west", '30');
//	middleLayout.sizePane("west", '1%');
}

function minimizeWih(){
	extendContact();
	extendNavi();
	extendInbox();
	$('#wihmax_bt').show();
	$('#wihmini_bt').hide();	
}

///////////////////////////////////////////////////////////////////////////////


//function selectBuket(){
//	var arr = ['sm04','sm05','sm06'];
//	var targetid = null;
//	
//	for(var i=0, n=arr.length; i<n; i++){
//		if(document.getElementById(arr[i]).style.display=="none"){
//			targetid = arr[i];			  
//			searchTopNum += 1;
//			break;			
//		}
//	}
//	
//	if(targetid == null){
//		for(var i=1, n=arr.length; i<n; i++){
//			$("#"+arr[i-1]+"_title").text($("#"+arr[i]+"_title").text());
//		}
//		targetid = arr[arr.length-1];
//	}
//	
//	return targetid;
//}


var searchTopNum = 4;
var divNum = 0;
//var pingdivNum = 0;
function minimizeItemBuket(workItemID, lastTaskId, workItemType, workItemName) {	
	$("#search_right_outer").show();
	divNum = $("#search_line").children("div").length;
	if(divNum < 4){		
		var appHtml = "";		
		appHtml += "<div id='sm0"+searchTopNum+"' style='margin-top:5px; padding:0px; float:left; width:160px; position:relative;' >";
		appHtml += " <div class='boxtopleft'><span id='sm0"+searchTopNum+"_title' class='boxtopright'>"+workItemName.substring(0, 10)+"</span></div>";
		appHtml += "<div class='boxmiddleright'>";
		appHtml += "<div class='boxmiddleleft'>";
		appHtml += "<div class='togglebtnx' onclick='closedsm("+searchTopNum+")'></div>";
		appHtml += "<div id='slidedown' class='slidedown' onclick=\"outerLayout.allowOverflow('north') , consd("+searchTopNum+")\"></div>";
		appHtml += "<div id='slideup"+searchTopNum+"' class='slideup' onclick=\"consu("+searchTopNum+");\"></div>";
		appHtml += "<div id='con0"+searchTopNum+"'  class='topcontentcontainer' style='display:block; height:0px; width:0px;'>";
		appHtml += " </div>";
		appHtml += " </div>";
		appHtml += " </div>";
		appHtml += " <div class='miniboxbottomleft'><span class='miniboxbottomright'></span></div>";
		appHtml += " </div>";
	            
		$("#search_line").append(appHtml);	
		searchTopNum++;		
	}
}

/*
function minimizeItemBuketChat(workItemID, lastTaskId, workItemType, workItemName) {
	$("#search_right_outer2").show();
	pingdivNum = $("#ping_line").children("div").length;
	if(pingdivNum < 4){		
		var appHtml = "";		
		appHtml += "<div id='sm0"+searchTopNum+"' style='margin-top:5px; padding:0px; float:left; width:160px; position:relative;' >";
		appHtml += " <div class='boxtopleft'><span id='sm0"+searchTopNum+"_title' class='boxtopright'>"+workItemName.substring(0, 10)+"</span></div>";
		appHtml += "<div class='boxmiddleright'>";
		appHtml += "<div class='boxmiddleleft'>";
		appHtml += "<div class='togglebtnx' onclick='closedsm("+searchTopNum+")'></div>";
		appHtml += "<div id='slidedown' class='slidedown' onclick=\"outerLayout.allowOverflow('north') , consd("+searchTopNum+")\"></div>";
		appHtml += "<div id='slideup"+searchTopNum+"' class='slideup' onclick=\"consu("+searchTopNum+");\"></div>";
		appHtml += "<div id='con0"+searchTopNum+"'  class='topcontentcontainer' style='display:block; height:0px; width:0px;'>";
		appHtml += " </div>";
		appHtml += " </div>";
		appHtml += " </div>";
		appHtml += " <div class='miniboxbottomleft'><span class='miniboxbottomright'></span></div>";
		appHtml += " </div>";
	            
		$("#ping_line").append(appHtml);	
		$("#sm0"+searchTopNum).effect("pulsate" , 2000);
		searchTopNum++;		
		
	}
}
*/

function extendItemBuket(obj) {
	//middleLayout.toggle("west");
	alert($(obj).css("display"));
	$(obj).toggle();
}

///////////////////////////////////////////////////////////////////////////////

function divnone(){
	document.getElementById("divnone").style.display='none';
	
}
function divblock(){
	document.getElementById("divnone").style.display='block';
	
}


function con01(){
	$("#con01").show('blind', 500);
	$("#slideup").show();
	con021();
	con031();
	
}
function con011(){
	$("#con01").hide();
	$("#slideup").hide()
		
}

function con02(){
	document.getElementById("con02").style.display='block';
	document.getElementById("slideup2").style.display='block';			
	con011();
	con031();
	con041();
	con051();
	con061();
}
function con021(){
	document.getElementById("con02").style.display='none';
	document.getElementById("slideup2").style.display='none';
	
}	
function con03(){
	document.getElementById("con03").style.display='block';
	document.getElementById("slideup3").style.display='block';			
	con011();
	con021();
	con041();
	con051();
	con061();
	
}
function con031(){
	document.getElementById("con03").style.display='none';
	document.getElementById("slideup3").style.display='none';
	
}	

function closedsm(mynum){
	$("#sm0"+mynum).remove();		
}

function consd(mynum){
	$("#con0"+mynum).show();
	$("#slideup"+mynum).show();		
	$("#sm0"+mynum+ " .boxmiddleright , #sm0"+mynum+" .miniboxbottomleft , #sm0"+mynum+" .topcontentcontainer").css({"width":"500px","height":""});
	$("#sm0"+mynum+" .slidedown").hide();
}
function consu(mynum){
	document.getElementById("con0"+mynum).style.display='none';
	document.getElementById("slideup"+mynum).style.display='none';
	$("#sm0"+mynum+ " .boxmiddleright , #sm0"+mynum+" .miniboxbottomleft , #sm0"+mynum+" .topcontentcontainer").css({"width":"","height":""});
	$("#sm0"+mynum+" .slidedown").show();
	
}	

function removeSearchItems(){
	$("#search_line").empty();
	$("#search_right_outer").hide();
}

function removePingItems(){
	$("#ping_line").empty();
	$("#search_right_outer2").hide();
}




/////////////////////////////////////////////////////////////////////////////////////////////

var outerLayout, middleLayout, innerLayout, inner2Layout; 

$(document).ready(function () { 
	outerLayout = $('#container').layout({ 
		center__paneSelector:	".ui-layout-center" 
	,	west__paneSelector:		".ui-layout-west" 
	,	north__size:			52
	,	west__size:				200 
	,	west__minSize: 			120
	,	west__maxSize: 			650
	,	spacing_open:			0 // ALL panes
	,	spacing_closed:			0 // ALL panes
	,	west__spacing_open:		5
	,	togglerLength_open:		0
	,	center__onresize:		"middleLayout.resizeAll"
	,	west__onresize:		    "innerLayout.resizeAll"
	}); 

	innerLayout = $('div.ui-layout-west').layout({ 
		center__paneSelector:	".inner-center" 
	,	north__paneSelector:	".inner-north" 	
	,	north__size:			'50%'
	,	spacing_open:			0  // ALL panes
	,	spacing_closed:			0 // ALL panes
	,	north__spacing_open:	5
	,	south__spacing_open:	5
	,	togglerLength_open:		0		
	,	center__onresize:		function () {  $("#accordion").accordion("resize");}
	
	}); 
	
	/*
	innerinnerLayout = $('div.inner-center').layout({ 
		center__paneSelector:	".inner-inner-center" 
	,	north__paneSelector:	".inner-inner-north" 
	,	north__size:			100 
	,	spacing_open:			0  // ALL panes
	,	spacing_closed:			0 // ALL panes
	,	north__spacing_open:	5	
	,	west_togglerLength_closed: 0
	,	togglerLength_open:		0		
	
	}); 

	*/
	
	middleLayout = $('div.ui-layout-center').layout({ 		
		center__paneSelector:	".middle-center" 												
	,	west__paneSelector:		".middle-west" 
	,	west__size:				'40%' 
	,	west__minSize:			100	
	,	west__maxSize:			'95%'	
	,	center__minSize:		100
	,	spacing_open:			5  // ALL panes
	,	spacing_closed:			0 // ALL panes
	,	north__spacing_open:	0
	,	south__spacing_open:	0
	,	togglerLength_open:		0
	,	west__onresize:			function () { heightResizing();  }
            // TODO : MODIFIED (이승백)
	,	center__onresize:	    function (e) {
            if(ganttChartPanel) {
                ganttChartPanel.setWidth($(".middle-center").width() - 10);
                ganttChartPanel.setHeight($(".middle-center").height());
            }
        }
	}); 
	
	//Page Flip on hover
	$("#pageflip").hover(function() {
		$("#pageflip img , .msg_block").stop()
			.animate({
				width: '307px', 
				height: '319px'
			}, 700); 
		} , function() {
		$("#pageflip img").stop() 
			.animate({
				width: '42px', 
				height: '42px'
			}, 700);
		$(".msg_block").stop() 
			.animate({
				width: '42px', 
				height: '42px'
			}, 700);
	});
	
	
	// input value on hover	
	$("#processinput , #contactsinput").css("color","#ccc");
	$("#processinput").click(function(){
		
		schVal = $("#processinput").val();
		
		if(schVal == "Search Process"){
			$("#processinput").val("");
		}
		$("#processinput").css("color","#000");	
		
	});
	
	$(".depth2").click(function(){	
		statusWorklistSearch = false;
	});
	
	$("#contactsinput").click(function(){
		$("#contactsinput").val("");
		$("#contactsinput").css("color","#000");
		getFavorContactsList('');
	});

}); 



/*$(function() {
	$( "#accordion" ).accordion({
		fillSpace: true
	});
});*/

//increase the default animation speed to exaggerate the effect
$.fx.speeds._default = 1000;

$(document).ready(function(){
      
	/*$("#hiddenReply").keyup(function () {
        var value = $("#hiddenReply .cont #chatContents form textarea").val(); 
        $('#Ping_101 strong').text(value);
      }).keyup();*/

	//-- 버튼 클릭시 버튼을 클릭한 위치 근처에 레이어 생성 --//
	




	$("#addContact-con , #adduser-con ,#userinfo-con ,#wih_userinfo-con ,#myinfo-con,#adduser-company").hide();
	
	function check_position(obj, e) {

		if( $(obj).css('display') == 'block' )
		{
			var l_position = $(obj).offset();
			l_position.right = parseInt(l_position.left) + ($(obj).width());
			l_position.bottom = parseInt(l_position.top) + parseInt($(obj).height());


			if( ( l_position.left <= e.pageX && e.pageX <= l_position.right )
				&& ( l_position.top <= e.pageY && e.pageY <= l_position.bottom ) ){
				//alert( 'popup in click' );
			}else{
				//alert( 'popup out click' );
				$(obj).hide("fast");
			}
		}		
	}
    $(document).mousedown(function(e){
	    $('#addContact-con').each(function(){
	    	check_position(this, e);
		});
	    $('#adduser-con').each(function(){
	    	check_position(this, e);
		});
	    $('#userinfo-con').each(function(){
	    	check_position(this, e);
		});
	    $('#wih_userinfo-con').each(function(){
	    	check_position(this, e);
		});
	    $('#myinfo-con').each(function(){
	    	check_position(this, e);
		});
	    $('#adduser-company').each(function(){
	    	check_position(this, e);
		});
	    
	});

	$("#my_info").click(function(){
		//var addcontactposition = $(".inner-center").width();
		//$("#myinfo-con").css("left",addcontactposition);
		$("#myinfo-con").show(100);
	});
	
	// when user name is clicked in contact list window, show user info.
	$("#favorContactCodiUsers").click(function(){
		var addcontactposition = $(".inner-center").width();
		$("#userinfo-con").css("left",addcontactposition);
		$("#userinfo-con").show(100);
	});
	$("#favorContactFbfUsers").click(function(){
		var addcontactposition = $(".inner-center").width();
		$("#userinfo-con").css("left",addcontactposition);
		$("#userinfo-con").show(100);
	});
	$("#favorContactFbgUsers").click(function(){
		var addcontactposition = $(".inner-center").width();
		$("#userinfo-con").css("left",addcontactposition);
		$("#userinfo-con").show(100);
	});
	// when user name is clicked in contact list window, show user info.
	

	$("#addcontact-tt").click(function(){
		var addcontactposition = $(".inner-center").width();
		$("#addContact-con").css("left",addcontactposition);
		$('#searchFbInput').val('');
		getFacebookAllList('');
		$("#addContact-con").show(100);
	});

	
	$("#adduser-tt").click(function(){
		var adduserposition = $(".middle-center").width() - 320;
		$("#adduser-con").css("right",adduserposition);
		getFavorContactsListWih('');
		$("#adduser-con").show(100);
	});
	
	$(".usersAdded").click(function(){
		var userinfoposition = $(".middle-center").width() - 320;
		$("#wih_userinfo-con").css("right",userinfoposition);
		$("#wih_userinfo-con").show(100);
	});
	

	
	$("#cluetip-close1").click(function(){	
		$("#searchFbInput").val("")
		getFacebookAllList(this.value)
		$("#addContact-con").hide(100);
	});	
	
	$("#cluetip-close2").click(function(){	
		$("#adduser-con").hide(100);
	});
	
	$("#cluetip-close3,#popupInfoDelete").click(function(){	
		$("#userinfo-con").hide(100);
	});
	
	$("#cluetip-close4,#popupTopInfoEdit").click(function(){	
		$("#myinfo-con").hide(100);
	});
	
	$("#cluetip-close5").click(function(){	
		$("#wih_userinfo-con").hide(100);
	});
	
	$("#cluetip-close6").click(function(){	
		$("#instancePreview").hide(100);
	});
	
	$("#cluetip-close7").click(function(){	
		$("#adduser-company").hide(100);
	});	
	$("#cluetip-close8").click(function(){	
		$("#clickhelp").hide(100);
	});	
	$("#cluetip-close9").click(function(){	
		$("#editicon-con").hide(100);
	});	
	
//	$("#clickhelp").fadeIn(3000,clikhelphide);
	$("#clickhelp p").effect("pulsate" , 1000);
	

	$( "#addcontact-modal-bt" ).click(function() {
		//$( "#addcontact-modal" ).dialog( "open" );
		
		var contents = "<iframe name='contant' src=\"" + contextPath + "/common/organizationChartPicker_contacts.jsp?multiple=true&elemid=fld_isu_rp&appKey=" + appKey + ",fld_isu_rp_display\"  frameborder=\"0\" scrolling=\"no\" width=\"100%\"  height=\"100%\"></iframe>";
		$("#adduser-company #addcontact-con").html(contents);
		

		
		var addcontactposition = $(".inner-center").width();
		$("#adduser-company").css("left",addcontactposition);
		$("#adduser-company").show(100);
		
		//window.open (contextPath + '/common/organizationChartPicker_contacts.jsp?multiple=true&elemid=fld_isu_rp,fld_isu_rp_display','','location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=yes,left=300, top=400, scrollbars=no');
		return false;
	});
	
	$( "#popupTopInfoEdit" ).click(function() {
		var contents = "<iframe name='contant' src=\"" + contextPath + "/codi-web/organization/codiUserInfoViewer.jsp\" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>";
		setWIHContent(contents);
		$("#my_status").hide();	
		$("#wihContent").height('100%');
		$("#wihTitle").text('Edit my info');
		
		//$( "#addcontact-modal" ).dialog( "open" );
		
		// TODO display at wih
//		window.open (contextPath + '/codi-web/organization/userInfoByself.jsp','','width=900, height=300, location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=yes,left=300, top=200, scrollbars=no');
//		window.open (contextPath + '/codi-web/organization/codiUserInfoViewer.jsp','','width=900, height=300, location=no, directories=no,resizable=no,status=no,toolbar=no,menubar=yes,left=300, top=200, scrollbars=no');
		
//		return false;
	});
	
	$("#twitt , #1rowreply").autoGrow();
	$('#securitySet').hide();
	/*
	$('#addcontact-tt ,#adduser-tt').cluetip({
		cluetipClass: 'rounded',	
		dropShadow: false, 
		local:true, 
		activation: 'click',
		cursor: 'pointer',
		hoverClass: 'highlight',
		sticky: true,
		closePosition: 'top',
		closeText: '<img src="../../lib/jquery/cluetip/images/cross.png" alt="" />',
		arrows:true,
		clickThrough:true
	});*/	

	
	getFavorContactsList("");
	if(_useFB == 1) {
		getFacebookAllList("");
	}
	getLoginUserInfo();
	getServerNameAndPort();
	/* add scroll event to lazy loading To worklist */
	$(".worklistcontentcontainer").scroll(function(e) {		
		if($(".worklistcontentcontainer").scrollTop() == $('#inbox').height() - $(".worklistcontentcontainer").height()){
			if(!isCalendarMode) {
				if(statusWorklistSearch) {
					//alert("search appaend '" + _keywords + "'");
					currentSearchPage = currentSearchPage + 1;
					getFastcatSearchedWorkItemList(_viewPoint, _selectedItems, _keywords, _selectedName);
				} else {
					appendWorkItemList('appendWorkItemList');
				}
			}
		}
	});
	
	/* load initial workList call getWorkItemList("individual", "requested", ""); */
	viewWorkListInit();

	$.doTimeout(5000, function(){

		//getFavorContactsList("");
		refreshContactsStatus();

		return true;
	});
});


function editiconpop(){	
	/*var userinfoposition = $(".middle-center").width() - 600 ;*/
	$("#editicon-con").css("right","100px");
	$("#editicon-con").show(100);
}


function clikhelphide() {
	setTimeout(function() {
		$( "#clickhelp" ).fadeOut(3000);	}, 5000 );
};


function closeorgan(){
	$("#adduser-company").hide(100);
}

function alertMessage(errMsg){
	 $("#top_message").slideDown(500,hideMessege );
	 $("#top_message span").text(errMsg);
}

function hideMessege() {
	setTimeout(function() {
		$( "#top_message" ).slideUp(500);
	}, 5000 );
};

function startLoading(workItemArea){
	$("#" + workItemArea + "_loadingArea").show();
}

function endLoading(workItemArea){
	$("#" + workItemArea + "_loadingArea").hide();
}

$(document).unload(function() {
	//여기에 $(window)적으믄 안되요... 주의 하시길...
	$.ajax({
		url : contextPath + "/codi-web/contacts/delContactsStatus",
		type : "POST",
		dataType : "json",
		timeout : 2000,
		success : function() {
			//alert("del success.")
		}
	});
});
