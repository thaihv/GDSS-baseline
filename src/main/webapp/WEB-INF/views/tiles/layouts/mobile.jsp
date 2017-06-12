<%@page pageEncoding="utf-8" contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:fb="http://ogp.me/ns/fb#" xml:lang="en" lang="en">

<head>

<title><tiles:getAsString name="title" /></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport"
	content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="viewport"
	content="width=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />
<meta name="viewport"
	content="width=device-height, target-densityDpi=medium-dpi" />


<!-- CSS -->
<link type="text/css" rel="stylesheet"
	href="/GDSS/resources/resources/css/index.css" />
<link type="text/css" rel="stylesheet"
	href="/GDSS/resources/resources/js/jquery.bxslider/jquery.bxslider.css" />

<!-- JAVASCRIPT -->

<script type="text/javascript"
	src="/GDSS/resources/resources/js/jquery-1.9.1.js"></script>
<script type="text/javascript"
	src="/GDSS/resources/resources/js/jquery.bxslider/jquery.bxslider.js"></script>
<script type="text/javascript"
	src="/GDSS/resources/resources/js/common.js"></script>


</head>

<body>

	<tiles:insertAttribute name="content" />

</body>
</html>
