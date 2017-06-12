/**
 * 
 * 
 */
var PageURL = "http://localhost:8880/glop"
	, IMGURL = PageURL + "/geonuris/img/"
	, DAUM_MAP_DIV_ID = "daumMap"
	, ROADVIEW_DIV_ID = "daumRoadMap";
;


namespace("gis.transform");
namespace("cci.daummap.map");
/**
 * gis.transform : 좌표 변환 함수
 * 사용 예) WGS84 좌표를 UTMK로 변경하는 경우 : gis.transform("EPSG:4326", "CCI:8885", wgs84x좌표, wgs84y좌표)
 * 리턴값은 변환된 좌표값을 갅는 obeject 입니다. {x: 변환된 x좌표, y: 변환된 y좌표}
 * */


/**
 * cci.daummap.map : 다음 openAPI 지도 활용한 기능 구현
 * 
 * Method:
 * 		init
 * 		setSkymap
 * 		changeSkymapVisibility
 * 		isCurrentlyVisible
 * 		setZoom
 * 		setCenter
 * 		changeZIndex
 * 
 * 		setMarkerImg			: 마커 이미지지정
 * */
cci.daummap.map = (function() {
	var daumMap, 
		markerImage, 
		marker, 
		overlay,
		rc,
		rv;
	
	/**
	 * 다음맵 이동에 대한 cci맵이동처리
	 */
	function cciMapSync(latLng){
		var tempLat = latLng.getLat();
		var tempLng = latLng.getLng();
		
		var mapLatLng 	= gis.transform("EPSG:4326", "EPSG:5179", tempLng, tempLat);
		var lonLat = new OpenLayers.LonLat(mapLatLng.x, mapLatLng.y);
		map.setCenter(lonLat, map.getZoom());
		
		if(markerFeature.active){
			markerLayer.destroyFeatures();
			markerLayer.addFeatures(
			    new OpenLayers.Feature.Vector(
	                new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat)
	        ));
			markerFeature.activate();
		}
	}
	
	function moveMarker(event) {
		var tempLat = marker.getPosition().getLat();
		var tempLng = marker.getPosition().getLng();
		var p = new daum.maps.LatLng(tempLat, tempLng);
		
		cci.daummap.map.setRoadviewPosition(p);
		
		cciMapSync(p);
	}
	
	
	
	
	
	
	return {
		/**
		 * function : init
		 * 다음 지도 초기화
		 * */
		init : function(){
			var zoomLevel = map.getZoom();
			
			var layerCenter  = map.getCenter();
			var mapLatLng 	= gis.transform("EPSG:5179", "EPSG:4326", layerCenter.lon, layerCenter.lat);
//			alert(layerCenter.lon + " :: " + layerCenter.lat + " :: " + zoomLevel);
			daumMap =  new daum.maps.Map(document.getElementById(DAUM_MAP_DIV_ID), {
				center: new daum.maps.LatLng(mapLatLng.y, mapLatLng.x), 
				level : maxZoom - zoomLevel -1,
				mapTypeId: daum.maps.MapTypeId.ROADMAP,
			    scrollwheel: false
			});
			
			overlay = new daum.maps.RoadviewOverlay();
			
		}
	
		/**
		 * function : setMapType
		 * 맵 타입 변경
		 * */
		, setMapType : function(mapType){
			
			if(mapType == 'road'){
				daumMap.setMapTypeId(daum.maps.MapTypeId.ROADMAP);
			}else{
				daumMap.setMapTypeId(daum.maps.MapTypeId.HYBRID);
			}
		}
		
		/**
		 * function : setMapType
		 * 맵 타입 변경
		 * */
		, setRoadview : function(){
			var p = daumMap.getCenter();
//			alert(daumMap.getLevel());
			if(daumMap.getLevel() > 9){
				p = new daum.maps.LatLng(37.5113785, 127.0619915 );	//한전본사
			}
			
			rc = new daum.maps.RoadviewClient();
			rv = new daum.maps.Roadview(document.getElementById(ROADVIEW_DIV_ID));

			cci.daummap.map.setRoadviewPosition(p);
			
			daum.maps.event.addListener(rv,"position_changed",function() {
				var position = rv.getPosition();
				daumMap.setCenter(position);
//				marker.setPosition(position);
				cciMapSync(position);
				drawPoleMarker(viewpoint.tilt, viewpoint.pan, viewpoint.zoom);
			});
			
			daum.maps.event.addListener(rv,"viewpoint_changed",function() {
				var viewpoint = rv.getViewpoint();
				markerChange(viewpoint.pan);
				drawPoleMarker(viewpoint.tilt, viewpoint.pan, viewpoint.zoom);
			});
			daum.maps.event.addListener(rv,"panoid_changed",function() {
				var viewpoint = rv.getViewpoint();
				markerChange(viewpoint.pan);
//				drawPoleMarker(viewpoint.tilt, viewpoint.pan, viewpoint.zoom);
			});
			
		}
		
		/**
		 * function : setRoadviewPosition
		 * 로드뷰 위치 이동
		 * */
		, setRoadviewPosition : function(p){
			rc.getNearestPanoId(p, 100, function(panoid) {
				if(panoid != null){
					rv.setPanoId(panoid, p);
				}
			});
		}
		
		/**
		 * function : setMapType
		 * 맵 타입 변경
		 * */
		, setRoadviewFeaturePosition : function(p){
			rc.getNearestPanoId(p, 100, function(panoid) {
				if(panoid != null){
					rv.setPanoId(panoid, p);
				}
			});
			
			rv.relayout();
		}
		
		/**
		 * function : setMapType
		 * 맵 타입 변경
		 * */
		, setRoadviewAngle : function(p){
			var position = rv.getPosition();
			var dx = p.getLat() - position.getLat();
			var dy = (-p.getLng()) - (-position.getLng());
			
			var r = Math.atan2(dx, dy); 
			var angle = r * 180 / Math.PI;
			
			var rvvp = rv.getViewpoint();
			
			angle = angle - 90;
			if(angle < 0) angle += 360;
			
			rvvp.pan = angle;
			rvvp.tilt = -15;
			
			rv.setViewpoint(rvvp);
			rv.relayout();
		}
		
		/**
		 * function : setMarkerImg
		 * 마커 이미지 세팅
		 * */
		, setMarkerImg : function(imgNm, width, height){
			var size = new daum.maps.Size(width, height);
			markerImage = new daum.maps.MarkerImage(IMGURL + imgNm, size);
		}
		
		/**
		 * function : setMarker
		 * 마커 이미지 보기
		 * */
		, setMarker : function(latlng){
			if(marker == undefined){
				marker = new daum.maps.Marker({			
					position: latlng
				});
			}else{
				marker.setPosition(latlng);
			}
			
			marker.setMap(daumMap);	
			marker.setDraggable(true);
			
			if(markerImage != undefined){
				marker.setImage(markerImage);
			}
			
			daum.maps.event.addListener(marker, "dragend", function(event) {
				moveMarker(event);
			});
		}
		
		/**
		 * function : showOverlay
		 * overlay 보기
		 * */
		, showOverlay : function(flag){
			if(flag){
				overlay.setMap(daumMap);
			}else{
				overlay.setMap(null);
			}
		}
		
		/**
		 * function : showMarker
		 * marker 보기
		 * */
		, showMarker : function(flag){
			marker.setVisible(flag);
		}
		
		/**
		 * function : roadviewVisibility
		 * 로드퓨 보기
		 * */
		, roadviewVisibility : function(flag){
			cci.daummap.map.showOverlay(flag);
			if(flag){
				
				if(markerImage == undefined){
					cci.daummap.map.setMarkerImg("temp_hts.png", 20, 29);
				}
				
				var layerCenter  = map.getCenter();
				var mapLatLng 	= gis.transform("EPSG:5179", "EPSG:4170", layerCenter.lon, layerCenter.lat);
				var p = new daum.maps.LatLng(mapLatLng.y, mapLatLng.x);
				
//				cci.daummap.map.setMarker(p);
				
				if(rv == undefined){
					cci.daummap.map.setRoadview();
				}else{
//					alert(p.getLat() + " : " + p.getLng());
					cci.daummap.map.setRoadviewPosition(p);
				}
			}
			
//			cci.daummap.map.showMarker(flag);
		}
		
		/**
		 * function : daumMapSync
		 * 다음지도 확대 및 이동처리
		 * */
		, daumMapSync : function(){
			var zoomLevel = map.getZoom();
			
			var daumMapDiv = document.getElementById("daumMap");
			
				
				var layerCenter  = map.getCenter();
				var mapLatLng 	= gis.transform("EPSG:5179", "EPSG:4326", layerCenter.lon, layerCenter.lat);
				
				if(daumMap != undefined){
//					alert(zoomLevel);
		 			if (zoomLevel == 13) {
		 				daumMapDiv.style.display="none";
		 			}else{
		 				
		 				if(daumMapDiv.style.display=="none" ){
		 					daumMapDiv.style.display="block";
		 				}
		 				
		 				daumMap.setLevel(maxZoom - zoomLevel -1);
						daumMap.setCenter(new daum.maps.LatLng(mapLatLng.y, mapLatLng.x));
		 				
		 			}
					
					
					
					
				}
		}
	};
})();


gis.transform = (function() {
	/*
	 */
	
	//다울 좌표계: UTMK [CCI:8885] [SR-ORG:7165] 
	Proj4js.defs["SR-ORG:7165"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
	Proj4js.defs["EPSG:5179"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m";
	
	Proj4js.defs["CCI:8885"] = "+proj=tmerc +lat_0=38 +lon_0=127.50289 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m";
	Proj4js.defs["CCI:8880"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m";

	//WGS84 좌표계 == EPSG:4326
	Proj4js.defs["EPSG:4326"] = "+title=long/lat:WGS84 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=WGS84 +datum=WGS84 +units=degrees";
	Proj4js.defs["EPSG:2097"] = "+title=long/lat:KOR_GRS80 +proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs";

	//Daum 좌표계 - LP:8881
	Proj4js.defs["LP:8881"] = "+proj=tmerc +lat_0=38 +lon_0=127 +k=2.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
	Proj4js.defs["CCK:8885"] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=1 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs  <>";
	Proj4js.defs["EPSG:4170"] = "+title=long/lat:GRS80 +proj=longlat +a=6378137.0 +b=6356752.31424518 +ellps=GRS80 +datum=GRS80 +units=degrees";

	

	return function(srcProj, tarProj, x, y){
		x = typeof x == "string" ? parseFloat(x) : x;
		y = typeof y == "string" ? parseFloat(y) : y;
		var _src = new Proj4js.Proj(srcProj),
			_tar = new Proj4js.Proj(tarProj) 
		;

		return Proj4js.transform(_src, _tar, new Proj4js.Point(x, y)); //x, y

	};

})();


function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}