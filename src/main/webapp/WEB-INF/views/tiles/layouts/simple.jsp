<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://ogp.me/ns/fb#" xml:lang="en" lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title><tiles:getAsString name="title" /></title>
	
	<!-- jquery css -->
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/jquery-ui-189custom/css/ui-lightness/jquery-ui-1.8.9.custom.css" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/jquery-ui-189custom/development-bundle/themes/base/jquery.ui.all.css" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/jquery.msg.css" media="screen" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/scripts/jquery/customScrollBar/jquery.mCustomScrollbar.css"/>	
		<!-- user css -->
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/waveStyle/droppable_layout.css" />
	<link rel="stylesheet" type="text/css" href="/GDSS/resources/style/waveStyle/signIn.css" />
	<link type="text/css" rel="stylesheet" href="/GDSS/resources/resources/css/index.css" />
	<link type="text/css" rel="stylesheet" href="/GDSS/resources/resources/js/jquery.bxslider/jquery.bxslider.css" />

	<!-- jquery -->
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery-ui-1.8.23.custom.min.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery.layout-latest.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery.center.js"></script>
	<script type="text/javascript" src="/GDSS/resources/scripts/jquery/jquery.msg.js"></script>
		

	
</head>

<body>

	<tiles:insertAttribute name="content" />

</body>
</html>
