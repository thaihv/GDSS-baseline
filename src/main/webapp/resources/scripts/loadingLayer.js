var WEB_ROOT = "/glop";
var TOP = window.top;

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var divBackGround = null;
var divLoadingLayer = null;


function closeLoadingLayer() {
	//TOP.document.body.style.overflow = "auto";
	divBackGround.style.display = "none";
	divLoadingLayer.style.display = "none";
}

function showLoadingLayer() {
	var scrollTop = TOP.document.body.scrollTop;
	var scrollLeft = TOP.document.body.scrollLeft;
	
	divBackGround.style.display = "";
	divLoadingLayer.style.display = "";
	
	var intBodyHeight = 0;
	var intBodyWidth = 0;
	if (isIE) {
		intBodyHeight = TOP.document.body.offsetHeight;
		intBodyWidth = TOP.document.body.offsetWidth;
	} else {
		intBodyHeight = window.innerHeight;
		intBodyWidth = window.innerWidth;
	}
	
	var wh = (intBodyHeight / 2) - (divLoadingLayer.offsetHeight / 2) + scrollTop;
	var ww = (intBodyWidth / 2) - (divLoadingLayer.offsetWidth / 2) + scrollLeft;
	
	if (wh < 0) wh = "0";
	if (ww < 0) ww = "0";
	
	divLoadingLayer.style.top = wh + "px";
	divLoadingLayer.style.left = ww + "px";
	
	divBackGround.style.top = scrollTop + "px";
	divBackGround.style.left = scrollLeft + "px";
}


function setDivBackground() {
	if (divBackGround == null) {
		divBackGround = TOP.document.createElement("div");
		divBackGround.id = "divBackGround";
		divBackGround.style.zIndex = "100";
		divBackGround.style.opacity = "0.7";
		divBackGround.style.filter = "alpha(opacity=70)";
		divBackGround.style.position = "absolute";
		divBackGround.style.left = "0px";
		divBackGround.style.top = "0px";
		divBackGround.style.display = "none";
		divBackGround.style.width = "100%";
		divBackGround.style.height = "100%";
		
		TOP.document.body.appendChild(divBackGround);
		
		 // IE 의 버그로 아이프레임을 올려놓지 않으면 셀렉트 박스같은 일부 컨트롤이 위로 올라온다.
		var iframe = TOP.document.createElement("iframe");
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.frameBorder = "0";
		iframe.scrolling = "no";
		
		divBackGround.appendChild(iframe);
		
		//var htmlLayer = "<div id=\"divBackGround\" style=\"filter:alpha(opacity=70); position: absolute; z-index:100;left:0px; top:0px;display: none; width:100%; height:100%;\">"
		//	+ "<iframe width=\"100%\" height=\"100%\"frameborder=\"0\" scrolling=\"no\" ></iframe></div>";
		//TOP.document.write(htmlLayer);
	}
}
setDivBackground();

function openLoadingLayer() {
	if (divLoadingLayer == null) {
		divLoadingLayer = TOP.document.createElement("div");
		divLoadingLayer.id = "divLoadingLayer";
		divLoadingLayer.className = "loadframe"
		divLoadingLayer.style.zIndex = "101";
		divLoadingLayer.style.position = "absolute";
		TOP.document.body.appendChild(divLoadingLayer);
		
		var loadinner = TOP.document.createElement("div");
		loadinner.className = "loadinner";
		divLoadingLayer.appendChild(loadinner);
		
		var loadbar = TOP.document.createElement("div");
		loadbar.className = "loadbar";
		loadinner.appendChild(loadbar);
		
		var span = TOP.document.createElement("span");
		span.innerHTML = "Now loading ...";
		loadbar.appendChild(span);
		
		var loadingImg = TOP.document.createElement("img");
		loadingImg.src = WEB_ROOT + "/images/Common/loading.gif";
		loadbar.appendChild(loadingImg);
		
		var closeImg = TOP.document.createElement("img");
		closeImg.src = WEB_ROOT + "/images/closedloadbar.gif";
		closeImg.onclick = "closeLoadingLayer();";
		loadbar.appendChild(closeImg);
		
		
		
		//var htmlLayer = "<div id=\"divLoadingLayer\" style=\"position:absolute; Z-INDEX:101;\">"
		//	+ "<table><tr><td align=\"center\">"
		//	+ "<br><a href=\"javascript: closeLoadingLayer();\"><img src=\"/GDSS/resources/images/closedloadbar.gif\" border=0/></a>"
		//	+ "</td></tr></table></div>";
	
		//TOP.document.write (htmlLayer);
	}
	
	showLoadingLayer();
}
openLoadingLayer();

if (window.attachEvent) {
	window.attachEvent("onload", function () {closeLoadingLayer();});
} else {
	window.addEventListener("load", function() {closeLoadingLayer()}, false);	//mozilla,firefox
}



function removeCloseLoding() {
	if (window.detachEvent) {
		window.detachEvent("onload", function () {closeLoadingLayer();});
	} else {
		window.removeEventListener("load", function() {closeLoadingLayer()}, false);	//mozilla,firefox
	}
}


