<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<title><tiles:getAsString name="title" /></title>

<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/js/OpenLayers-2.12/theme/default/style.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/js/OpenLayers-2.12/theme/default/google.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/css/edit_theme/geosilk/geosilk.css"/>
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/dark-hive/easyui.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/demo/demo.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/resources/css/index.css" />

  
    
<style type="text/css">
.map {
	border: 1px solid black;
	background-color: 5F93C3;
	z-index: 1;
}

.olControlLoadingPanel {
	background-image: url("/GDSS/resources/geoscripts/js/img/loading.gif");
	background-position: center;
	background-repeat: no-repeat;
	background-color: transparent;
}
</style>
<script type="text/javascript" src="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/jquery.easyui.min.js"></script>
<!-- openlayers Lib -->
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/OpenLayers-2.12/OpenLayers.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/OpenLayers-2.12/lib/deprecated.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/LoadingPanel.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/PanZoomBarCustom.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/PopupCustom.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&amp;sensor=false"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/map_init.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/TOC.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/map_control.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/map_move.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/util.js"></script>

<script type="text/javascript" src="/GDSS/resources/resources/js/common.js"></script>


<!-- editor mode  -->
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/edit_lib/loader.js"></script>

<script type="text/javascript">

	var serviceUrl      = '<c:out value="${loconfig.wmsUrlDefault}"/>';
	var serviceWfsUrl   = '<c:out value="${loconfig.wfsUrlDefault}"/>';
	var initleftbottomX = '<c:out value="${loconfig.initleftbottomX}"/>';
	var initleftbottomY = '<c:out value="${loconfig.initleftbottomY}"/>';
	var initrighttopX   = '<c:out value="${loconfig.initrighttopX}"/>';
	var initrighttopY   = '<c:out value="${loconfig.initrighttopY}"/>';
	var initmaxRes      = '<c:out value="${loconfig.initmaxRes}"/>';
	var initmaxZoom     = '<c:out value="${loconfig.initmaxZoom}"/>';
	var initCRS         = '<c:out value="${loconfig.initCRS}"/>';	
	var map;
	var toc;
	var fullScan;
	var baseLayer;
	var selectionLayer;
	var gmllayer;
	var features;
	var control, controlsGroup, controlsNow,infoControls,DShpmodifycontrol;	
	var measurePopup = "measurePopup";										
	var popup, popupState;													
	var lonLatPosition;														
	var infoStyle;        													
	var feature_id;        													
	var infoPop=null;
	var features;
	var searchedFeatures;
	var startCenterX , startCenterY = 0;
	var endCenterX , endCenterY = 0;
	var stColors = ["#fcc900","#ff9700","#e65100","#be0b00","#7d0000"];
	var stRanges = [3,6,9,12,15];
	var moving = false;
	var maxBounds = new OpenLayers.Bounds(initleftbottomX, initleftbottomY, initrighttopX, initrighttopY);
	var maxRes = initmaxRes;
	var maxZoom = parseInt(initmaxZoom);	

	$(document).ready(function () {
		$(".btn_menu.m3").attr("src", "/GDSS/resources/resources/images/main/btn_top_menu3_on.gif");
	});
	function init_editor() {			
		init();
        editor = new OpenLayers.Editor(map, {
                activeControls: ['Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature', 'TransformFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
                featureTypes: ['polygon', 'path', 'point']
            });
		editor.startEditMode();
	}
</script>

</head>

<body class="easyui-layout" onload="init_editor();">
	<div data-options="region:'north',border:false" style="height: 120px; padding: 0px;">
		<div class="lyr_top">
			<a href="/GDSS/main.do">
				<div class="img_logo">
					<img src="/GDSS/resources/resources/images/main/top_logo1.png"
						width="145px" height="66px" />
				</div>
			</a>			
			<c:url var="logoutUrl" value="/logout" />
		    <form action="${logoutUrl}" id="logout" method="post">
		        <input type="hidden" name="${_csrf.parameterName}"
		            value="${_csrf.token}" />
		    </form>
			<div class="btn_logout" onclick="document.getElementById('logout').submit();">
				<img src="/GDSS/resources/resources/images/main/btn_logout.gif"
					width="74px" height="18px" />
			</div>
			<a href="/GDSS/main.do">		
				<div class="btn_home">
					<img src="/GDSS/resources/resources/images/main/btn_home.gif"
						width="50px" height="18px" />
				</div>
			</a>
			<div class="inp_search1">
				<input id="search" name="search" type="text" class="inp_search1_c" />
			</div>
			<!-- menu -->
			<div class="grp_top_menu">
				<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu1" width="2px" height="40px" /> 
				<a href="/GDSS/projects.do?menu=1">
					<img src="/GDSS/resources/resources/images/main/btn_top_menu1.gif" class="btn_menu m1" width="178px" height="40px" /> 
				</a>
				<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
				<img src="/GDSS/resources/resources/images/main/btn_top_menu2.gif" class="btn_menu m2" width="178px" height="40px" onclick="map_popup('/GDSS/mapview.do')"/> 
				<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
				<img src="/GDSS/resources/resources/images/main/btn_top_menu3.gif" class="btn_menu m3" width="178px" height="40px" /> 
				<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
				<sec:authorize access="hasRole('ADMIN')">
					<a href="/GDSS/statistic.do?menu=4">
						<img src="/GDSS/resources/resources/images/main/btn_top_menu4.gif" class="btn_menu m4" width="178px" height="40px" /> 
					</a>
					<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" /> 
					<a href="/GDSS/admin.do?menu=5">
						<img src="/GDSS/resources/resources/images/main/btn_top_menu5.gif" class="btn_menu m5" width="178px" height="40px" /> 
					</a>
					<img src="/GDSS/resources/resources/images/main/bar_top_menu.gif" class="bar_menu2" width="2px" height="40px" />
				</sec:authorize>
			</div>
		</div>
	</div>
	<!-- TOP 
	<div data-options="region:'north',border:false"
		style="height: 120px; padding: 0px;">
		<tiles:insertAttribute name="header" />
	</div>
	-->
	<!-- MENU 
	<div data-options="region:'west',border:false"
		style="width: 248px; padding: 0px;">
		<tiles:insertAttribute name="leftMenu" />
	</div> 
	-->
	<!-- PADDING -->
	<div data-options="region:'east',split:true"
		style="width: 10px; padding: 0px; background: url(/GDSS/resources/resources/images/all_bg.gif) repeat-y;">
		&nbsp;</div>
	<!-- BOTTOM -->
	<div data-options="region:'south',border:false"
		style="height: 25px; padding: 0px;">
		<tiles:insertAttribute name="footer" />
	</div>
	<div data-options="region:'center'">
		<div class="easyui-layout" fit="true">
			<div data-options="region:'center',border:false"
				style="border: 0px solid #ccc;">
				<tiles:insertAttribute name="content" />
			</div>
		</div>

	</div>
</body>
</html>
