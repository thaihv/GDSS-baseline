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

	<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/metro/easyui.css">
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/resources/css/index.css" />
	<!-- ScheduleCalendar -->
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/Spacetree.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/fullcalendar/fullcalendar.css" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/fullcalendar/fullcalendar.print.css" media="print" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/popupTooltip.css">
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/flowchart.css">
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/cluetip/jquery.cluetip.css" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/jquery/jquery.contextMenu.css" />
			
	<script type="text/javascript" src="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/geoscripts/jquery-easyui-1.3.2/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/geoscripts/js/util.js"></script>
	<script type="text/javascript" src="/GDSS/resources/resources/js/common.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/fullcalendar/fullcalendar.min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jit-yc.js"></script>
	<!-- for flowchart -->
	<script type="text/javascript" src="/GDSS/resources/scripts/raphael/raphael-min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/ajax/ajaxCommon.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/crossBrowser/elementControl.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/flowchart/flowchartDefinition.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/flowchart/flowchartUtil.js"></script>
	<!-- for popup -->
	<script type="text/javascript" src="/GDSS/resources/scripts/popupTooltip.js"></script>
	<!-- for open graph -->
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery.contextMenu.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/opengraph/OpenGraph-0.1-SNAPSHOT-min.js"></script>
	<!-- for ckeditor -->
	<script type='text/javascript' src='/GDSS/resources/scripts/ckeditor_3.6.3/ckeditor/ckeditor.js'></script>
	<!-- for check date -->
	<script type='text/javascript' src='/GDSS/resources/scripts/datejs/date_kr.js'></script>
	
	<title><tiles:getAsString name="title" /></title>
</head>


<body class="easyui-layout">
	<!-- TOP -->
	<div data-options="region:'north',border:false"
		style="height: 120px; padding: 0px;">
		<tiles:insertAttribute name="header" />
	</div>
	<!-- MENU -->
	<div data-options="region:'west',border:false"
		style="width: 248px; padding: 0px;">
		<tiles:insertAttribute name="leftMenu" />
	</div>
	<!-- BOTTOM -->
	<div data-options="region:'south',border:false"
		style="height: 25px; padding: 0px;">
		<tiles:insertAttribute name="footer" />
	</div>
	<!-- CONTENTS -->
	<div data-options="region:'center',border:false">
		<div class="easyui-layout" fit="true">
			<div data-options="region:'center',border:false"
				style="border: 0px solid #ccc;">
				<div class="grp_main">
					<!-- BreadScrumb -->
					<div class="grp_main_banner">
						<div class="img_main_navi">
							<ul>
								<li>Green City DSS</li>
								<li id="m1">Home Page</li>
							</ul>
						</div>
					</div>
					<div class="grp_main_frame0">
						<tiles:insertAttribute name="content" />
					</div>
				</div>
			</div>
		</div>

	</div>
</body>
</html>
