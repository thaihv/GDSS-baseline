//GML을 이용한 데이터 이동
var gml;
var EditingTool;

function moveExtent(wfsServer,layerName, fieldName, value) {
    delFeature();
    features_layer = layerName;
   // getFeature(wfsServer, layerName, fieldName, value);
    moveFeature(wfsServer, layerName, fieldName, value);   
}

function moveExtent1(wfsServer,layerName, fieldName, value,fieldName1, value2) {
    delFeature();
    moveFeature1(wfsServer, layerName, fieldName, value,fieldName1, value2);
   // getFeature1(wfsServer, layerName, fieldName, value,fieldName1, value2);
   
}

function getFeature(WFSServer, layerName, fieldName, value) {
 
	var getFeatureUrl = WFSServer;
    getFeatureUrl += "TYPENAME=" + layerName;
    //getFeatureUrl += "&FILTER=<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>" + fieldName + "</ogc:PropertyName><ogc:Literal>" + value + "</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>";
    getFeatureUrl += "&FILTER=<Filter><PropertyIsEqualTo><PropertyName>" + fieldName + "</PropertyName><Literal>" + value + "</Literal></PropertyIsEqualTo></Filter>";
    getFeatureUrl += "&SERVICE=WFS";
    getFeatureUrl += "&REQUEST=GetFeature";
    getFeatureUrl += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
    getFeatureUrl += "&VERSION=1.1.0";
    getFeatureUrl += "&EXCEPTIONS=application/vnd.ogc.se_inimage";
    getFeatureUrl += "&srsName=EPSG:5179";   // 지도상에 표출한 좌표계 

    var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "red",
            strokeWidth: 2,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            fillColor: "yellow"
        }),
        "select": new OpenLayers.Style({
            fillColor: "red"
        })
    });

    gml = new OpenLayers.Layer.GML("GML", getFeatureUrl,
	    {
	        format: OpenLayers.Format.GML,
	        styleMap: myStyles,
	        formatOptions: {
	        }
	    }
	);

   // alert(gml);
    map.addLayer(gml);

    var select = new OpenLayers.Control.SelectFeature(gml, { hover: true });
    map.addControl(select);
    select.activate();
}

function getFeature1(WFSServer, layerName, fieldName, value,fieldName1, value1) {
 
    var getFeatureUrl = WFSServer;
    getFeatureUrl += "TYPENAME=" + layerName;
    getFeatureUrl += "&FILTER=<ogc:Filter><ogc:And><ogc:PropertyIsEqualTo><ogc:PropertyName>" + fieldName + "</ogc:PropertyName><ogc:Literal>" + value + "</ogc:Literal></ogc:PropertyIsEqualTo><ogc:PropertyIsEqualTo><ogc:PropertyName>" + fieldName1 + "</ogc:PropertyName><ogc:Literal>" + value1 + "</ogc:Literal></ogc:PropertyIsEqualTo></ogc:And></ogc:Filter>";
    getFeatureUrl += "&SERVICE=WFS";
    getFeatureUrl += "&REQUEST=GetFeature";
    getFeatureUrl += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
    getFeatureUrl += "&VERSION=1.1.0";
    getFeatureUrl += "&EXCEPTIONS=application/vnd.ogc.se_inimage";
    //getFeatureUrl = "c:\ginno.xml";
    
    var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "red",
            strokeWidth: 2,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            fillColor: "yellow"
        }),
        "select": new OpenLayers.Style({
            fillColor: "red"
        })
    });

    gml = new OpenLayers.Layer.GML("GML", getFeatureUrl,
	    {
	        format: OpenLayers.Format.GML,
	        styleMap: myStyles,
	        formatOptions: {
	        }
	    }
	);

    map.addLayer(gml);

    var select = new OpenLayers.Control.SelectFeature(gml, { hover: true });
    map.addControl(select);
    select.activate();
}


function getFeatures(WFSServer, layerName, fieldName, values) {
    var arrValue = values.split(',');
    var addValue;

    for (var i = 0; i < arrValue.length; i++)
    {
        addValue += "<ogc:PropertyIsEqualTo><ogc:PropertyName>" + fieldName + "</ogc:PropertyName><ogc:Literal>" + arrValue[i] + "</ogc:Literal></ogc:PropertyIsEqualTo>";
    }

    var getFeatureUrl = WFSServer;
    getFeatureUrl += "TYPENAME=" + layerName;

    if (arrValue.length == 1)
    {
        getFeatureUrl += "&FILTER=<ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>" + fieldName + "</ogc:PropertyName><ogc:Literal>" + values + "</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Filter>";
    }
    else
    {
        getFeatureUrl += "&FILTER=<ogc:Filter><ogc:Or>";
        getFeatureUrl += addValue;
        getFeatureUrl += "</ogc:Or></ogc:Filter>";
    }

    getFeatureUrl += "&SERVICE=WFS";
    getFeatureUrl += "&REQUEST=GetFeature";
    getFeatureUrl += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
    getFeatureUrl += "&VERSION=1.0.0";
    getFeatureUrl += "&EXCEPTIONS=application/vnd.ogc.se_inimage";

    //getFeatureUrl = "http://211.56.233.232/arcgis/services/upis/MapServer/WFSServer?TYPENAME=upis:UPIS.LP_PA_CBND&FILTER=<ogc:Filter><ogc:Or><ogc:PropertyIsEqualTo><ogc:PropertyName>PNU</ogc:PropertyName><ogc:Literal>4721010400100280004</ogc:Literal></ogc:PropertyIsEqualTo><ogc:PropertyIsEqualTo><ogc:PropertyName>PNU</ogc:PropertyName><ogc:Literal>4721010400100280005</ogc:Literal></ogc:PropertyIsEqualTo></ogc:Or></ogc:Filter>&SERVICE=WFS&REQUEST=GetFeature&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0&VERSION=1.0.0&EXCEPTIONS=application/vnd.ogc.se_inimage";

    var myStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "blue",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            fillColor: "white"
        }),
        "select": new OpenLayers.Style({
            fillColor: "blue"
        })
    });

    gml = new OpenLayers.Layer.GML("GML", getFeatureUrl,
	    {
	        format: OpenLayers.Format.GML,
	        styleMap: myStyles,
	        formatOptions: {
	        }
	    }
	);

    map.addLayer(gml);

    var select = new OpenLayers.Control.SelectFeature(gml, { hover: true });
    map.addControl(select);
    select.activate();
}

function moveFeature(WFSServer, layerName, fieldName, value) {
   
    var params = WFSServer;
    params = "TYPENAME=" + layerName;
    
    if(fieldName == "SHAPE"){
       params += "&FILTER=<Filter><FeatureId fid='"+ value + "'/></Filter>";   //공간 객체의 유일키를 이용하여 가져오는 방법  	
    }else{
    	
    	params += "&FILTER=<Filter><PropertyIsEqualTo><PropertyName>" + fieldName + "</PropertyName><Literal>" + value + "</Literal></PropertyIsEqualTo></Filter>";   //특정 필드를 선택하여 가져오는 방법
    }
  
    params += "&SERVICE=WFS";
    params += "&REQUEST=GetFeature";
    params += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
    params += "&VERSION=1.1.0";
    params += "&EXCEPTIONS=application/vnd.ogc.se_inimage";
    params += "&srsName=EPSG:5179";   // 지도상에 표출한 좌표계 

   OpenLayers.loadURL("./proxy.lo", "?url=" + escape(WFSServer + params), this, gmlMove, goUrl);
   OpenLayers.Event.stop(event);
}

function goUrl (response) {
	alert("response : " + response.responseText);
}

function moveFeature1(WFSServer, layerName, fieldName, value,fieldName1, value1) {

    var params = "TYPENAME=" + layerName;
    params += "&FILTER=<Filter xmlns=\"http://www.opengis.net/ogc\" ><And><PropertyIsEqualTo><PropertyName>" + fieldName + "</PropertyName><Literal>" + value + "</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>" + fieldName1 + "</PropertyName><Literal>" + value1 + "</Literal></PropertyIsEqualTo></And></Filter>";
    params += "&SERVICE=WFS";
    params += "&REQUEST=GetFeature";
    params += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
    params += "&VERSION=1.1.0";
    params += "&EXCEPTIONS=application/vnd.ogc.se_inimage";
    params += "&srsName=EPSG:5179";   // 지도상에 표출한 좌표계 

    
    OpenLayers.loadURL("./proxy.lo", "?url=" + escape(WFSServer + params), this, gmlMove, goUrl);
		
	OpenLayers.Event.stop(event);
}

function gmlMove(response) {
	
 //  alert("gmlMove" + response.responseText);
	
	var pointCoords = null;
	var features;
	
	if (features != null || infoPop != null) {
		clearFeatures();
	}
	
	var bounds;

	features = gmlParserGML311(features_layer,response.responseText);
	if (features != null && features.length > 0) {
		if(features.constructor != Array) {
            features = [features];
        }
        for(var i=0; i<features.length; ++i) {
            if (!bounds) {
                bounds = features[i].geometry.getBounds();
            } else {
                bounds.extend(features[i].geometry.getBounds());
            }

        }
       
       selectionLayer.addFeatures(features);
      
       // alert(bounds);
       map.zoomToExtent(bounds);

        
        
      var ik = parseInt(map.getScale()); //현재 스케일 보기 
 
        var iSum=1000;
        if(ik < 1000){
        	iSum = 1000;
        }else if(ik < 10000){
        	iSum = 10000;
        }else if(ik < 100000){
        	iSum = 100000;
        }else if(ik < 1000000){
        	iSum = 1000000;
        }
        
        var iScale= parseInt(ik+iSum);
    
        
        map.zoomToScale(iScale, true);

	}
}

/**
 * GML Parser(GML v3.1.1)
 */
function gmlParserGML311(paramFeatureType, response) {

    //alert("gmlParserGML311 : SGGISUSR.TL_SPBD_BULD" + paramFeatureType);
    var paramFeatureNS = "http://cite.opengeospatial.org/gmlsf";
    var paramGeometryName = "SHAPE";            
    //var paramFeatureType = "string";          
 
 var gmlOptions = {
     featureType: paramFeatureType, 
     featureNS: paramFeatureNS,
     geometryName: paramGeometryName
 };
   
    var gmlParser = new OpenLayers.Format.GML.v3(gmlOptions);
    
    //SDH BGN: For OpenLayer feature parse bug
    var geo2response = "";    
    var features = null;

    //var featureType = "sf:" + paramFeatureType;
   // geo2response = response.responseText.split(paramFeatureType).join(featureType);
    features = gmlParser.read(response);

    
    return features;
}

/*********************************************************
* GML 레이어를 삭제
*********************************************************/
function delFeature() {
    if (gmllayer != null)
    {
        map.removeLayer(gmllayer);
    }

    gmllayer = null;
}