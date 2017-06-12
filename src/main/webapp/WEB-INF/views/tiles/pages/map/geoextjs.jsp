<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/include-ext.js"></script>
    <script type="text/javascript" src="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/options-toolbar.js"></script>
    <link type="text/css" rel="stylesheet"  href="http://cdn.sencha.com/ext/gpl/4.2.1/examples/shared/example.css"/> 
    
    <!-- Local OpenLayers 3 stylesheet -->
    <!-- link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.1.0/ol.css"/-->
	<!-- script src="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.1.0/ol.js"></script-->




	<link type="text/css" rel="stylesheet" href="http://openlayers.org/en/v3.4.0/css/ol.css"/>
	<link rel="stylesheet" href="/GDSS/resources/geoscripts/OpenLayers/ol3-layerswitcher/src/ol3-layerswitcher.css" />
	<link rel="stylesheet" href="/GDSS/resources/geoscripts/OpenLayers/ol3-layerswitcher/examples/layerswitcher.css" />
	<link rel="stylesheet" href="/GDSS/resources/geoscripts/OpenLayers/ol3-layerswitcher/examples/scroll.css" />
	
	<script src="http://openlayers.org/en/v3.4.0/build/ol-debug.js"></script>
	<script src="/GDSS/resources/geoscripts/OpenLayers/ol3-layerswitcher/src/ol3-layerswitcher.js"></script>
	<script type="text/javascript" src="/GDSS/resources/geoscripts/Proj4js/proj4js-combined.js"></script>
	<script type="text/javascript" src="/GDSS/resources/geoscripts/Proj4js/defs/EPSG5179.js"></script>
		
	<script>
		var contextPath = '<%=request.getContextPath()%>';
		Ext.application({
		    name : 'GDSS',
			appFolder : contextPath + '/resources/scripts/gdss',
		    launch : function(){
		    	console.log(contextPath);
				Ext.create('GDSS.view.mainApp', {
					renderTo : 'content'
				});
		        
		    }
		});
		
	</script>    
</head>
<body>
	<div id='content'></div>
</body>
</html>