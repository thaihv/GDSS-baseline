<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>


<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<title><tiles:getAsString name="title" /></title>

<link rel="stylesheet" type="text/css" href="/GDSS/resources/resources/css/main.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/js/OpenLayers-2.12/theme/default/style.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/js/OpenLayers-2.12/theme/default/google.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/metro/easyui.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/icon.css">
<link rel="stylesheet" type="text/css" href="/GDSS/resources/resources/css/contents.css">

<style type="text/css">
#map {
	position: absolute;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	*height: expression(document.getElementById ( 'map_layer') .clientHeight+'px');
}

.olControlLoadingPanel {
	background-image:
		url("/GDSS/resources/geoscripts/js/img/progressbar.gif");
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
<script type="text/javascript" src="/GDSS/resources/geoscripts/Proj4js/proj4js-combined.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/Proj4js/defs/EPSG5179.js"></script>
<script type="text/javascript" src="/GDSS/resources/resources/js/map/map_init.js"></script>
<script type="text/javascript" src="/GDSS/resources/resources/js/map/map_move.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/TOC.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/map_control.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/dojo/dojo.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/raphael.js"></script>
<script type="text/javascript" src="/GDSS/resources/geoscripts/js/util.js"></script>

<script type="text/javascript" src="/GDSS/resources/resources/js/common.js"></script>


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
	var control, controlsGroup, controlsNow, infoControls, DShpmodifycontrol;
	var measurePopup = "measurePopup";
	var popup, popupState;
	var lonLatPosition;
	var infoStyle;
	var feature_id;
	var infoPop = null;
	var features;
	var searchedFeatures;
	var startCenterX, startCenterY = 0;
	var endCenterX, endCenterY = 0;
	var stColors = [ "#fcc900", "#ff9700", "#e65100", "#be0b00", "#7d0000" ];
	var stRanges = [ 3, 6, 9, 12, 15 ];
	var moving = false;
	OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
	OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
	var maxBounds = new OpenLayers.Bounds(initleftbottomX, initleftbottomY, initrighttopX, initrighttopY);
	var maxRes = initmaxRes;
	var maxZoom = parseInt(initmaxZoom);
</script>
</head>

<body class="easyui-layout" onload="init();$('#p').window('close');">
	<div data-options="region:'north',border:false"
		style="height: 77px; padding: 0px;">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="77" colspan="2">

					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td width="270" rowspan="3"><img
								src="/GDSS/resources/resources/images/index/top_logo1.png"
								width="145px" height="66px" /></td>
							<td rowspan="3"></td>
							<td height="43"><div align="right"></div></td>
							<td width="10" rowspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td width="468"></td>
						</tr>
						<tr>
							<td height="8"></td>
						</tr>
					</table>

				</td>
			</tr>
		</table>
	</div>
	<div data-options="region:'center', border:false">
		<div class="easyui-layout" fit="true">

			<div data-options="region:'center',border:false"
				style="border: 0px solid #ccc;">
				<tiles:insertAttribute name="content" />
			</div>
		</div>

	</div>
</body>
</html>
