//메뉴 제어
function mapToolBar(menu) {

	switch(menu) {
    	case "shpinit":
    		subMenuViewShpEditStop();
    		delFeature();
    		DShpmodifycontrol.deactivate();
		
		break;
	
		case "zoomMaxExtent":
		    mapControl("deselect");
			map.zoomToMaxExtent();
			
			break;
		case "zoomBox":
			mapControl("deselect");
			toggleControl('zoombox');
			break;
		case "zoomIn":
			map.zoomIn();
			break;
		case "zoomOut":
			map.zoomOut();
			break;
		case "navi":
			mapControl("deselect");
			toggleControl('navi');
			break;
		case "select":
			mapControl('select');
			break;
		case "deselect":
			mapControl('deselect');
			toggleControl('deselect');
			break;
		case "distance":
			toggleControl('distance');
			break;
		case "area":
			toggleControl('area');
			break;
		case "histPrev":
			navHistory.previousTrigger();
			break;
		case "histNext":
			navHistory.nextTrigger();
			break;
		case "leftSlide":
			map.pan(160,0);
			break;
		case "rightSlide":
			map.pan(-160,0);
			break;
		case "topSlide":
			map.pan(0, -160);
			break;
		case "bottomSlide":
			map.pan(0, 160);
			break;
		
		case "Dpoint":
			if (map.getZoom()<5) {
				alert("Unable to edit at this zoom.");	
			}
			else {
			
				 mapControl('deselect');
				 toggleControl("Dpoint");
			
			}
			break;
		case "Dpolygon":
			if (map.getZoom()<5) {
				alert("Unable to edit at this zoom.");	
			}
			else {
			   
				 mapControl('deselect');
				 toggleControl("Dpolygon");

			}
			break;
		case "Dline":
			if (map.getZoom()<5) {
				alert("Unable to edit at this zoom.");	
			}
			else {

				 mapControl('deselect');
				 toggleControl("Dline");

			}
			break;
		case "Dmodify":
			if (map.getZoom()<5) {
				alert("Unable to edit at this zoom.");	
			}
			else {

				// mapControl('deselect');
				 toggleControl("Dmodify");
				
			}
			break;
		case "DShpmodify":
			if (gmllayer == null) {
				alert("Have no SHP Layer.");	
			}
			else {

				 DShpmodifycontrol = new OpenLayers.Control.ModifyFeature(gmllayer,{onModification : serialize});
            	 map.addControl(DShpmodifycontrol);
            	 DShpmodifycontrol.activate();
				
			}
			break;
		default: break;
	}
}

function mapControl(str) {
	switch(str) {
		case "select":
			toggleControl('select');
			map.events.register('click', map, onClick);
	        break;
	    case "deselect":
	    	map.events.unregister("click", map, onClick);
	    	popupRemove();
	    	if (control != undefined) {
		    	control.deactivate();
		    }
		   	clearFeatures();
	    	if (searchedFeatures != null) {
				searchedLayer.destroyFeatures(searchedFeatures);
				searchedFeatures = null;
			}
			if (selectionLayer.features.length > 0) {
				selectionLayer.removeFeatures(selectionLayer.features);
			}
	    	break;
	}
}
	
function toggleControl(element) {
	controlsNow = element;
	
	var focus = hasFocusOnMap();

	for(key in controlsGroup) {
		control = controlsGroup[key];
		if(element == key) {
			
		control.activate();
		} else {
		control.deactivate();
		}
	}
}


/* 투명도 조정하기 */
var maxOpacity = 0.9;
var minOpacity = 0.1;
        
function changeOpacity(byOpacity) {
	var newOpacity = (parseFloat(OpenLayers.Util.getElement('opacity').value) + byOpacity).toFixed(1);
	newOpacity = Math.min(maxOpacity,
				Math.max(minOpacity, newOpacity));
	OpenLayers.Util.getElement('opacity').value = newOpacity;
	baseLayer.setOpacity(newOpacity);
}
		
/* GooglemapMode조정하기 */ 
function changeMapMode(bymapMode) {
	googleLayer.setGoogleMapMode(bymapMode);
}


/* 스케일 조정하기 */
function setTextScale() {
	
	var getMapCenter = map.getExtent();
	
	var bounds = new OpenLayers.Bounds();
    bounds.extend(getMapCenter);
     

	document.getElementById("txtScale").value =  numchk1(parseInt(map.getScale()));
}
	
function mapToScale() {
	
	map.zoomToScale(document.getElementById("txtScale").value, true);
	txtScale.value = parseInt(map.getScale());
}

/**
 * 팝업제거
 * @return
 */
function popupRemove() {
	var length = $('#measurePopup').length; //document.getElementsByName("measurePopup").length;

	for (var i=0; i<length; i++) {
		$('#measurePopup').remove();
		//document.getElementsByName("measurePopup").remove();
	}
	popupState = true;
}

	