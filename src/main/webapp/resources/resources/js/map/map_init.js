

function init(){

		var tileSize = new OpenLayers.Size(512, 512);
		
	    var options = {
	    	maxExtent: maxBounds,
	    	allOverlays: true,
		    numZoomLevels: maxZoom,
		    maxResolution: maxRes ,
		    controls: [],
		    projection: initCRS,
			units: "m",
			eventListeners: {"move": moveEvent, "moveend": moveend}
	 	};

	    
	 	
	    map = new OpenLayers.Map('map', options);
	 	
	 
	        
		baseLayer = new OpenLayers.Layer.WMS( 'WMS Layers',
				serviceUrl, {
	    		layers: "ROOT",
	    		format: 'image/png', 
	    		transparent: 'true', 
	    		bgcolor: '0xffffff', 
	    		exceptions: 'BLANK',
	    		label: 'HIDE_OVERLAP',
				graphic_buffer: '64'
	    		//CRS: "EPSG:900913"
	    	}, {
	    		
	    		isBaseLayer: false, 
	    		buffer:0, 
	    		singleTile: false, 
				transitionEffect: 'resize',
				opacity: 0.6
	    	}
	    );
	 	

	    baseLayer.setVisibility(true);
	    
	    selectionLayer = new OpenLayers.Layer.Vector("Selection Layer");
	    selectionLayer.setVisibility(true);
	    
	 // Buffer 선택 레이어 설정
		gmllayer = new OpenLayers.Layer.Vector("Buffer Layer");	
	         
	    //selectionLayer.setVisibility(true);
		searchedLayer = new OpenLayers.Layer.Vector("Searched Layer",
			{styleMap: new OpenLayers.Style({ strokeColor: "#eeeeee", strokeWidth: 1, fillColor: "#FFFF99", fillOpacity: 0.5 }) });
	  

        
	    map.addLayer(baseLayer);
	    map.addLayers([selectionLayer,searchedLayer,gmllayer]);
	

	//  map.addControl(new OpenLayers.Control.ScaleLine({geodesic:true}));
	    map.addControl(new OpenLayers.Control.ScaleLine());
		map.addControl(new OpenLayers.Control.PanZoomBarCustom());
	//	map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.addControl(new OpenLayers.Control.MousePosition());
		map.addControl(new OpenLayers.Control.Scale($('scale'))); 
		map.addControl(new OpenLayers.Control.LoadingPanel({counter: 0, maximized: false, visible: true}));
		
        

        navHistory = new OpenLayers.Control.NavigationHistory();
        map.addControl(navHistory);	
    		
    		

    	var sketchSymbolizers = {
            "Point": {
                pointRadius: 5, graphicName: "circle",
                fillColor: "#FF9933", fillOpacity: 1,
                strokeWidth: 1, strokeOpacity: 1, strokeColor: "#FF9933"
            },
            "Line": {
                strokeWidth: 2, strokeOpacity: 1, 
                strokeColor: "#FF9933", strokeDashstyle: ""
            },
            "Polygon": {
                strokeWidth: 2, strokeOpacity: 1, strokeColor: "#FF9933",
                fillColor: "#FF9966", fillOpacity: 0.5
            }
        };
    	
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
        
        

        var measureOption = {
            handlerOptions: {
                style: "default", // this forces default render intent
                layerOptions: {styleMap: new OpenLayers.StyleMap({"default": style})},
                persist: true
            }
        };
          
        var polygonOption = {
            handlerOptions: {
                style: OpenLayers.Feature.Vector.style['default'],
                layerOptions: {styleMap: new OpenLayers.StyleMap({"default": style})},
                persist: true
            }
        };

        controlsGroup = {
    		zoombox: new OpenLayers.Control.ZoomBox(), 
    		navi: new OpenLayers.Control.Navigation({handleRightClicks:true}),
    		distance: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, measureOption), 
       		area: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, measureOption)
        };
        
    	//showControls
    	var measureControl;
    	for(var key in controlsGroup) {
    		if(key == "distance" || key == "area" || key == "zoombox") {
    			measureControl = controlsGroup[key];
    			measureControl.events.on({
    				"measure": handleMeasurements_end,
    				"measurepartial": handleMeasurements
    			});
    			map.addControl(measureControl);
    		}  else {
    			map.addControl(controlsGroup[key]);
    		}
    	}
    	
    	map.events.register("mousemove", map, function(event) { 
    		lonLatPosition = map.getLonLatFromPixel(event.xy);
    	});
		
		

		OpenLayers.loadURL("./proxy.do","?url=" + escape(serviceUrl+"&REQUEST=GetCapabilities&SERVICE=WMS"), null, createTOC, goUrl);
	   

		map.zoomToExtent(maxBounds,true);
//		map.setCenter(new OpenLayers.LonLat(961803.96669293, 1943180.484102), 6);
		
	}


	
	function hasFocusOnMap() {
		for (var i = 0; i < map.layers.length; i++) {
			if (map.layers[i].getVisibility()) {
				return true;
			}
		}
		return false;
	}

	
	
	function createTOC(req) {
		if(req.readyState == 4){
			var xml =  new OpenLayers.Format.XML();
	        var node = xml.read(req.responseText);
			toc = new TOC(node, OpenLayers.Util.getElement("TOC"), map);
			
	    	toc.load();
	    	toc.updateMap();
	    	
    	
	    }
		
		toc.turnOnAll();
	};
	
	
	function goUrl (response) {
		alert("response : " + response.responseText);
	}
	
	function moveEvent(evt) {
//		cci.daummap.map.daumMapSync();
	}
	
	function moveend(evt) {
		if (fullScan != null) {
			handleFullScanEvent();
		}
		if (toc != null) {
			toc.updateScale();
		}
		
		var bbox = baseLayer.map.getExtent();
		
		var bounds = new OpenLayers.Bounds();
		bounds.extend(bbox);
		
		 var getMapCenter  = baseLayer.map.getCenter();
	        var maplevel = baseLayer.map.getZoom();
	         
		document.getElementById("txtBound").value = bounds.toBBOX();
		document.getElementById("txtcenter").value = getMapCenter;
		document.getElementById("txtlevel").value = maplevel;
		
		setTextScale();
		
	};
	
	function daumChange(mapType){
		if(mapType == "hybrid"){
			$("#icon_nm").removeClass("icon_z_nm");
			$("#icon_nu").removeClass("icon_z_nu_off");
			
			$("#icon_nm").addClass("icon_z_nm_off");
			$("#icon_nu").addClass("icon_z_nu");
			
		}else{
			$("#icon_nm").removeClass("icon_z_nm_off");
			$("#icon_nu").removeClass("icon_z_nu");
			
			$("#icon_nm").addClass("icon_z_nm");
			$("#icon_nu").addClass("icon_z_nu_off");
			
			
		}
		cci.daummap.map.setMapType(mapType);
	}
	
    
	   function onClick(e) {

	    	var pXYButton = new OpenLayers.Pixel();
	    	var pXYTop = new OpenLayers.Pixel();
	    	
	    	pXYButton.x = e.xy.x-5;
	    	pXYButton.y = e.xy.y-5;
	    	pXYTop.x = e.xy.x+5;
	    	pXYTop.y = e.xy.y+5;
	    	
	    	var maplocX = map.getLonLatFromPixel(pXYButton);
	    	var maplocY = map.getLonLatFromPixel(pXYTop);
	    	
	    	
	        var maploc = map.getLonLatFromPixel(e.xy);
	        
	        clickPositionMap = maploc;
	        
	    	wfslayerName = $("#layer_table option:selected").val();
	    	
	    	
	    	var filterText = "<Filter><DWithin><PropertyName>SHAPE</PropertyName><Point srsName=\"EPSG:5179\"><pos>" + maploc.lon + " " + maploc.lat + "</pos></Point><Distance units=\"m\">5</Distance></DWithin></Filter>";
	        
	    	
	    	
	    	  var params = "TYPENAME=" + wfslayerName;
	          // params += "&FILTER="+filterText;
	           params += "&SERVICE=WFS";
	           params += "&REQUEST=GetFeature";
	           params += "&OUTPUT=text/xml;subType=gml/3.1.1/profiles/gmlsf/1.0.0/0";
	           params += "&VERSION=1.1.0";
	           params += "&EXCEPTIONS=application/vnd.ogc.se_inimage";
	           params += "&srsName=EPSG:5179"; 
	           
	           if(wfslayerName == "SGGISUSR.BF_WIRE_FACI__"){
	        	   params += "&FILTER="+filterText;
	           }else {
	        	   params += "&BBOX="+maplocX.lon+","+maplocY.lat+","+maplocY.lon+","+maplocX.lat; 
	           }
	          
	           
	    	
	    	 features_layer = wfslayerName; //gml파싱을 위한 테이블 세팅 
	    	
	    	
	    	  mmfilterText = e.xy;  // 필터 저장
	    	
	        	
	        	if(wfslayerName =="TOTAL"){
	        	
	        		alert("검색하고자 하는 작업대상을 선택해 주세요 ");
	        	
	        	} else{

	        		OpenLayers.loadURL("./proxy.do" , "?url=" + escape(serviceWfsUrl + params), this, afterSelectFeature, goUrl);
	        		
	        	}
	    	
	    	OpenLayers.Event.stop(event);
	    }
	   

		function afterSelectFeature(response) {
			
			
			if (features != null || infoPop != null) {
				clearFeatures();
			}
			
			
			var html = "";
			var writeText="";
			
			features = gmlParserGML311(features_layer,response.responseText);

			if (features != null && features.length > 0) {

				for(var feat=0;feat<features.length;feat++) {
					
					selectionLayer.addFeatures(features[feat]);
					
					
					for (var j in features[feat].attributes) {
						    
					

						     	 if( j.toUpperCase() == "PNU"){
						    		 mValue = features[feat].attributes[j];
						    	 }    						    
						   
					}
					
				}
				
			} 
			
			
			 addressdiscussion.address.popjibun(mValue);
			 $('#p').window('open');
			
			
		}
		
	
	
	/**
	 * zoombox, navi, area, distance, regular
	 * @param element
	 * @return
	 */
	 
	function clearFeatures() {
		//$("cbndInfo").style.display = "none";
		try{
			for (var i = map.popups.length - 1; i >= 0; --i) {
		               map.removePopup(map.popups[i]);
		               map.popups[i].destroy;
			}
		}catch(e){}
		if (infoPop != null) {
			try {
		//		map.removePopup(infoPop);
				infoPop = null;
			} catch (e) {}
		}
		if (features != null) {
			selectionLayer.destroyFeatures(features);
			features = null;
		}
	}

	function handleMeasurements2(event) {

		if (!popupState) {
			popupRemove();
		}
	}
		
	/**
	 * @param event
	 * @return
	 */
	function handleMeasurements(event) {
		if (!popupState) {
			popupRemove();
		}

		var units = event.units;		
		var order = event.order;		
		var measure = event.measure;	
		var out = "";					
		
		if(order == 1) {
			out += "<table cellspacing='1' cellpadding='0' width='120px' bgcolor='#444444' border='2' bordercolor ='red'> ";
			out += "<tr><td bgcolor='#FFFFF0' style='padding:0px 4px 0px 4px;'>";
			out += "<table cellspacing='0' cellpadding='0' border='0' width='100%' align='center'>";
			out += "<tr><td width='35%' valign='bottom'><font face='굴림' size='2'>거리 :</td><td width='60%' align='right'><font face='굴림' size='2' color='red'>" + dotGubun(measure.toFixed(1)) + " " + units + "</td><td width='5%'></td>";
			out += "</tr></table>";
			out += "</tr></table>";
		} else {
			
			dotGubun(out += measure.toFixed(1)) + " " + units + "<sup>2</" + "sup>";
		}
		
		if (order == 1 && measure > 1) {
			var popup = new OpenLayers.PopupCustom(
					measurePopup, 
					new OpenLayers.LonLat(lonLatPosition.lon, lonLatPosition.lat ),
					new OpenLayers.Size(120,30), out, false 
			);
			//popup.setBackgroundColor("#eee");
		    //popup.setBorder("1px solid");
		    map.addPopup(popup);
		    $(measurePopup).name = 'measurePopup';
		}
		popupState = false;
	}

	/**
	 * @param event
	 * @return
	 */
	function handleMeasurements_end(event) {
		var geometry = event.geometry;	
		var units = event.units;		
		var order = event.order;		
		var measure = event.measure;	
		var out = "";					
		if(order == 1) {
		
		   out += "<table cellspacing='1' cellpadding='0' width='120px' bgcolor='#444444' border='2' bordercolor ='red'> ";
			out += "<tr><td bgcolor='#FFFFF0' style='padding:0px 4px 0px 4px;'>";
			out += "<table cellspacing='0' cellpadding='0' border='0' width='100%' align='center'>";
			out += "<tr><td width='35%' valign='bottom'><font face='굴림' size='2'>거리 :</td><td width='60%' align='right'><font face='굴림' size='2' color='red'>" + dotGubun(measure.toFixed(1)) + " " + units + "</td><td width='5%'></td>";
			out += "</tr></table>";
			out += "</tr></table>";

			
		} else {
		    
		    out += "<table cellspacing='1' cellpadding='0' width='120px' bgcolor='#444444' border='2' bordercolor ='red'>";
			out += "<tr><td bgcolor='#FFFFF0' style='padding:0px 4px 0px 4px;'>";
			out += "<table cellspacing='0' cellpadding='0' border='0' width='100%' align='center'>";
			out += "<tr><td width='30%' valign='bottom'><font face='굴림' size='2'>면적 :</td><td width='65%' align='right'><font face='굴림' size='2' color='red'>" + dotGubun(measure.toFixed(1)) + " " + units + "<sup>2</" + "sup>" + "</td><td width='5%'></td>";		
			out += "</tr></table>";
			out += "</tr></table>";  

		}
		
		popup = new OpenLayers.PopupCustom(
				measurePopup, 
				new OpenLayers.LonLat( lonLatPosition.lon, lonLatPosition.lat ), 
	            new OpenLayers.Size(150,50), out, true
		);
		
		//popup.setBackgroundColor("#eee");
	    //popup.setBorder("1px solid");
	    
	    //popup.addCloseBox(function(e) {
	   		if (controlsNow == 'area') {
	   			toggleControl('area');
	   		} else if (controlsNow == 'distance') {
	   			toggleControl('distance');					
	   		} else if (controlsNow == 'navi' || controlsNow == 'zoombox') {
	   			mapControl('deselect');
	   		//	toggleControl('navi');
	   			control.deactivate();
	   		}
	   		//popupRemove();
	   		//popup.destroy();
	    //});
	    
	    map.addPopup(popup);
	    $(measurePopup).name = 'measurePopup';
	    
	    //$("measurePopup_close").style.right = "35";//38
		//$("measurePopup_close").style.top = "6";//10
		
		popupState = false;
	}


	function afterSelectFeature_1(response) {
		
		alert("afterSelectFeature"+ response.responseText);
		
		if (features != null || infoPop != null) {
			clearFeatures();
		}
		
		var g =  new OpenLayers.Format.GML();
		var html = "";
		features = g.read(response.responseText);

		if (features != null && features.length > 0) {

			for(var feat=0;feat<features.length;feat++) {
				selectionLayer.addFeatures(features[feat]);
				html += '<span class="small pd" style="height:30px;vertical-align:middle"><b>속성보기</b></span><br/>';
		 		html += '<table cellspacing="1" cellpadding="0" border="0" width="240px" bgcolor="#b3b3b3" class="r_table">';
				for (var j in features[feat].attributes) {
				
						html += '<tr><td width="30%" bgcolor="#e0e0e0" align="center" class="small pd r_gray">'+j+': </td>';
						
						html += '<td width="70%" bgcolor="#FFFFFF" class="small pdl r_white">' + features[feat].attributes[j] + '</td></tr>';

				}
				html += "</table><table border=0><tr><td height='5px' colspan=2></td></tr></table>"
				
				try {
				  	infoPop = new OpenLayers.Popup.FramedCloud("cbndInfomation", 
	                                     clickPositionMap,
	                                     new OpenLayers.Size(200,300),
	                                     html,null,false,clearFeatures);
	                                    
				} catch(e) {}
	       			infoPop.closeOnMove = true;
		            map.addPopup(infoPop,true);
		            if ($("cbndInfo").style.display == "none") {
			            $("cbndInfo").style.display = "block";
		            	
		        }
			}
			
		} else{
		
			html += '<span class="small pd" style="height:30px;vertical-align:middle"><b>속성보기</b></span><br/>';
			html += '<table cellspacing="1" cellpadding="0" border="0" width="240px" bgcolor="#b3b3b3" class="r_table">';
			html += '</tr><td width="90%" bgcolor="#FFFFFF" class="small pdl r_white">현재 검색된 정보가 없습니다.</td></tr>';		
			html += "</table><table border=0><tr><td height='5px' colspan=2></td></tr></table>";
					
		
		try {
			infoPop = new OpenLayers.Popup.FramedCloud("cbndInfomation", 
										clickPositionMap,
	                                    new OpenLayers.Size(200,300),
	                                    html,null,false,clearFeatures);
	                                    
		} catch(e) {}
		  
			infoPop.closeOnMove = true;
		    map.addPopup(infoPop,true);
		    if ($("cbndInfo").style.display == "none") {
		    	$("cbndInfo").style.display = "block";
		    }
		}
	}

	function afterFeatureAdded(event) {
		popupRemove();
		
		//var units = event.units + "<sup>2</" + "sup>";
		var units = "㎡";
		drawedFeature = event.geometry;
	    var points = event.geometry.components[0].components;
	    var positions = "";
	    for (var i = 0; i < points.length; i++) {
	    	if (i > 0) {
	    		positions += " ";
	    	}
	    	positions += points[i].x + "," + points[i].y;
	    }
	    
	    var radiusHtml = "";
		
		radiusHtml += "<table cellspacing='1' cellpadding='0' width='120px' border='2' bordercolor ='red'>";
		radiusHtml += "<tr><td bgcolor='#FFFFF0' style='padding:0px 4px 0px 4px;'>";
		radiusHtml += "<table cellspacing='0' cellpadding='0' border='0' width='120px' align='center'>";
		radiusHtml += "<tr><td width='35%' valign='bottom'><font face='굴림' size='2'>면적 :</td><td width='60%' align='right'><font face='굴림' size='2' color='red'>" + dotGubun(event.geometry.getArea().toFixed(1)) + " " + units + "</td><td width='5%'></td>";
		radiusHtml += "</tr></table>";
	    
		var popup = new OpenLayers.PopupCustom(
				measurePopup, 
				new OpenLayers.LonLat( lonLatPosition.lon, lonLatPosition.lat ),
	            new OpenLayers.Size(130,30), radiusHtml, false 
		);
	    //popup.addCloseBox(function(e) {
	    	mapControl('select');
	    	toggleControl('polygon');
	    	popupRemove();
	    //});
	    map.addPopup(popup);
	    $(measurePopup).name = 'measurePopup';
		
		//$("measurePopup_close").style.right = "38";
		//$("measurePopup_close").style.top = "10";
		
		popupState = false;
	    
	    var buffer = 5.0;
	 
		//var filterText = "<Filter><Intersects><PropertyName>SHAPE</PropertyName><Polygon><outerBoundaryIs><LinearRing><coordinates decimal=\".\" cs=\",\" ts=\" \">" + positions + "</coordinates></LinearRing></outerBoundaryIs></Polygon></Intersects></Filter>";
		//var filterText = "<DWithin><PropertyName>SHAPE</PropertyName><Polygon srsName=\"EPSG:2097\"><exterior><LinearRing><posList srsDimension=\"2\">" + positions + "</posList></LinearRing></exterior></Polygon><Distance units=\"m\">" + buffer + "</Distance></DWithin>";
	    var filterText = "<Filter xmlns:gml='http://www.opengis.net/gml'><DWithin><PropertyName>THE_GEOM</PropertyName><gml:Polygon srsName=\"EPSG:9020203\"><gml:exterior><gml:LinearRing><gml:coordinates>" + positions + "</gml:coordinates></gml:LinearRing></gml:exterior></gml:Polygon><Distance units=\"m\">" + buffer + "</Distance></DWithin></Filter>";
	    
	    var url = wmsUrlDefault;
		var params = OpenLayers.Util.getParameterString({
			SERVICE: "WFS",
			VERSION: "1.1.0",
			REQUEST: "GetFeature",
			TYPENAME: wfslayerName,
			FILTER: filterText
		});

		OpenLayers.loadURL("./proxy.do", "?url=" + escape(url + params), this, afterSearchFeatures2);	

		OpenLayers.Event.stop(event);
		
	}


	function radius_end(event){
		popupRemove();
		
		var units = event.units;
		
		endCenterX = Math.abs(lonLatPosition.lon);
		endCenterY = Math.abs(lonLatPosition.lat);
		
		// 반지름계산값
		var radius = Math.sqrt(Math.pow(endCenterX-startCenterX,2)+Math.pow(endCenterY-startCenterY,2));
		
		var radiusHtml = "";
		
		radiusHtml += "<table cellspacing='1' cellpadding='0' width='120px' border='2' bordercolor ='red'>";
		radiusHtml += "<tr><td bgcolor='#FFFFF0' style='padding:0px 4px 0px 4px;'>";
		radiusHtml += "<table cellspacing='0' cellpadding='0' border='0' width='120px' align='center'>";
		radiusHtml += "<tr><td width='35%' valign='bottom'><font face='占쏙옙占쏙옙' size='2'>占쌥곤옙 :</td><td width='60%' align='right'><font face='占쏙옙占쏙옙' size='2' color='red'>" + radius.toFixed(1) + " " + units + "</td><td width='5%'></td>";
		radiusHtml += "</tr></table></div>";
		

		var popup = new OpenLayers.PopupCustom(
				measurePopup, 
				new OpenLayers.LonLat( lonLatPosition.lon, lonLatPosition.lat ),
	            new OpenLayers.Size(130,30), radiusHtml, false 
		);
		//popup.setBackgroundColor("#eee");
	    //popup.setBorder("1px solid");
		//popup.addCloseBox(function(e) {
	    	mapControl('select');
	    	toggleControl('regular');
	    	popupRemove();
	    //});
	    map.addPopup(popup);
	    $(measurePopup).name = 'measurePopup';
		
		//$("measurePopup_close").style.right = "38";
		//$("measurePopup_close").style.top = "10";
		
		popupState = true;		
		
		//var maploc = map.getLonLatFromPixel(e.xy);
		var filterText = "<Filter xmlns:gml='http://www.opengis.net/gml'><DWithin><PropertyName>THE_GEOM</PropertyName><gml:Point><gml:pos>" + startCenterX + " " + startCenterY + "</gml:pos></gml:Point><gml:Distance units=\"m\">" + radius + "</gml:Distance></DWithin></Filter>";
	    var url = wmsUrlDefault;
		var params = OpenLayers.Util.getParameterString({
			SERVICE: "WFS",
			VERSION: "1.1.0",
			REQUEST: "GetFeature",
			TYPENAME: wfslayerName,
			FILTER: filterText
		});

		if (radius > 500) {
			alert("반경은 500m 이내로 지정하셔야 합니다");
		}
		
		if (radius <= 500) {
			OpenLayers.loadURL("./proxy.do", "?url=" + escape(url + params), this, afterSearchFeatures2);	
		}
		
		OpenLayers.Event.stop(event);
		
	}

	function afterSearchFeatures2(response) {
		if (features != null || infoPop != null) {
			clearFeatures();
		}
	 
		wfslayerName = document.theForm.secondChoice[document.theForm.secondChoice.selectedIndex].value;
	    
	    sUser="GDS";
	    
		var sWPkMessage="";
		var FTR_CDE="";
		var FTR_IDN="";
		
		var g =  new OpenLayers.Format.GML();
		//var html ="<?xml version='1.0' encoding='UTF-8'?><wfs:FeatureCollection xmlns:gml='http://www.opengis.net/gml' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' numberOfFeatures='2' xsi:schemaLocation='http://10.98.196.15:8088/G2WebService_43740/GService?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=WTL_VALV_PS&amp;NAMESPACE=' xmlns:wfs='http://www.opengis.net/wfs'><gml:featureMember><WTL_VALV_PS gml:id='WTL_VALV_PS.47'><GEOMETRY><gml:Point id='47'><gml:pos>269690.6 297869.9</gml:pos></gml:Point></GEOMETRY><FTR_CDE>SA200</FTR_CDE><FTR_IDN>47</FTR_IDN><HJD_CDE>4374025000</HJD_CDE><SHT_NUM>367160645D</SHT_NUM><MNG_CDE>4440000</MNG_CDE><IST_YMD>19000101</IST_YMD><MOF_CDE>MOF302</MOF_CDE><MOP_CDE>MOP999</MOP_CDE><STD_DIP>100.0</STD_DIP><SAE_CDE>SAE000</SAE_CDE><TRO_CNT>0.0</TRO_CNT><CRO_CNT>0.0</CRO_CNT><MTH_CDE>MTH002</MTH_CDE><FOR_CDE>FOR001</FOR_CDE><VAL_STD>400</VAL_STD><VAL_SAF>0.0</VAL_SAF><PRC_NAM/><PIP_CDE>SA001</PIP_CDE><PIP_IDN>140</PIP_IDN><CST_CDE>CST001</CST_CDE><OFF_CDE>OFF002</OFF_CDE><CNT_NUM/><ANG_DIR>287</ANG_DIR><SYS_CHK>1</SYS_CHK></WTL_VALV_PS></gml:featureMember><gml:featureMember><WTL_VALV_PS gml:id='WTL_VALV_PS.43'><GEOMETRY><gml:Point id='43'><gml:pos>269690.8 297869.1</gml:pos></gml:Point></GEOMETRY><FTR_CDE>SA200</FTR_CDE><FTR_IDN>43</FTR_IDN><HJD_CDE>4374025000</HJD_CDE><SHT_NUM>367160645D</SHT_NUM><MNG_CDE>4440000</MNG_CDE><IST_YMD>19000101</IST_YMD><MOF_CDE>MOF302</MOF_CDE><MOP_CDE>MOP999</MOP_CDE><STD_DIP>100.0</STD_DIP><SAE_CDE>SAE000</SAE_CDE><TRO_CNT>0.0</TRO_CNT><CRO_CNT>0.0</CRO_CNT><MTH_CDE>MTH002</MTH_CDE><FOR_CDE>FOR001</FOR_CDE><VAL_STD>400</VAL_STD><VAL_SAF>0.0</VAL_SAF><PRC_NAM/><PIP_CDE>SA001</PIP_CDE><PIP_IDN>145</PIP_IDN><CST_CDE>CST001</CST_CDE><OFF_CDE>OFF002</OFF_CDE><CNT_NUM/><ANG_DIR>102</ANG_DIR><SYS_CHK>1</SYS_CHK></WTL_VALV_PS></gml:featureMember></wfs:FeatureCollection>";
		features = g.read(response.responseText);
		//features = g.read(html);
		
		if (features != null && features.length > 0) {
			for(var feat=0;feat<features.length;feat++) {
				selectionLayer.addFeatures(features[feat]);
				
			     for (var j in features[feat].attributes) {
					if (j.toUpperCase() == "FTR_CDE") {
						FTR_CDE = "FTR_CDE="+features[feat].attributes[j];
					}
					
					if (j.toUpperCase() == "FTR_IDN") {
						FTR_IDN = "FTR_IDN="+features[feat].attributes[j];
					}
				}
				sWPkMessage +=sWPkMessage+FTR_CDE+";"+FTR_IDN+":";;
			}
			
		}
		
		reWfmMessage=sUser+","+wfslayerName+","+sWPkMessage;
		//sendWfm(reWfmMessage);
	 
	}
	
	