var CHK_OFF = 0;
var CHK_ON = 1;
var CHK_OUT = 2;

var TYPE_UNKNOWN = 0;
var TYPE_LAYER = 1;
var TYPE_GROUP = 2;

function TOC(capabilities, div, map, baseLayer) {
	this.capabilities = capabilities;
	this.div = div;
	this.map = map;
	this.index = 0;
	this.layer = null;
	this.input = null;
	this.baseLayer = baseLayer;
	
	this.changeMap = function(map) {
		this.map = map;
	};
	
	this.load = function() {
		var node = findFirstElement(this.capabilities, "Layer");
        if (node == null) {
        	return;
        }
        this.layer = this.getLayer(node);
        var rootDiv = this.createLayerDiv(this.layer);
		this.updateScale();
		this.div.appendChild(rootDiv);
	};
	
	this.setInput = function(input) {
		this.input = input;
	};

	this.createLayerDiv = function(layer) {
		var layerDiv = document.createElement('div');
	    layerDiv.style.position = "relative";
	    
	    // child div
		var childDiv = document.createElement('div');
	    childDiv.style.position = "relative";
	    childDiv.style.left = "16px";
	    childDiv.style.display = layer.expand ? "" : "none";

		// expand
		var expImg = document.createElement('img');
		expImg.src = getImageLocation("reduction.png");
		
		var context = {
			'layer': layer,
            'expImg': expImg,
            'childDiv': childDiv,
            'toc': this
        };
        OpenLayers.Event.observe(expImg, "click", 
        	OpenLayers.Function.bindAsEventListener(this.onExpClick, context));

	    // checkImg
	    var checkImg = document.createElement('img');
		checkImg.style.marginLeft = "3px";
	    switch (layer.check) {
	    	case CHK_OFF:
	    		checkImg.style.width = "11";
				checkImg.style.height = "11";
	    		checkImg.src = getImageLocation("check_off.gif");
	    		break;
	    	case CHK_ON:
	    		checkImg.style.width = "11";
				checkImg.style.height = "11";
				checkImg.src = getImageLocation("check_on.gif");
	    		break;
	    	case CHK_OUT:
	    		checkImg.style.width = "16";
	    		checkImg.style.height = "16";
	    		checkImg.src = getImageLocation("scale_out.gif");
	    		break;
	    }
        
        var context = {
        	'layer': layer,
            'checkImg': checkImg,
            'toc': this
        };
        OpenLayers.Event.observe(checkImg, "click", 
			OpenLayers.Function.bindAsEventListener(this.onCheckClick, context));
	    
        // title
        var titleSpan = document.createElement("span");
        titleSpan.style.marginTop = "3px";
        titleSpan.style.marginLeft = "3px";
        if (layer.title != null) {
        	titleSpan.innerHTML = layer.title;
        }

        // create line break
		var br = document.createElement("br");
		
		layerDiv.appendChild(expImg);
		layerDiv.appendChild(checkImg);
		layerDiv.appendChild(titleSpan);
		layerDiv.appendChild(br);
		layerDiv.appendChild(childDiv);
		if (layer.layers.length > 0) {
			for (var i = 0; i < layer.layers.length; i++) {
				childDiv.appendChild(this.createLayerDiv(layer.layers[i]));
			}
		} else if (layer.legend != null) {
			var legendImg = document.createElement("img");
			legendImg.src = layer.legend;
			childDiv.appendChild(legendImg);
	    	
	    	layer.legendImg = legendImg;
		}
		
		layer.layerDiv = layerDiv;
	    layer.childDiv = childDiv;
		layer.expImg = expImg;
	    layer.checkImg = checkImg;
	    layer.titleSpan = titleSpan;
	    
		return layerDiv;
	}

	this.getLayer = function(node){
		var layer = {
			expand: true,
			check: CHK_OFF,
			type: TYPE_UNKNOWN,
			min: -1.0,
			max: -1.0,
			title: null,
			name: null,
			layers: [],
			legend: null,
			layerDiv: null,
			childDiv: null,
			expImg: null,
			checkImg: null,
			titleSpan: null,
			legendImg: null
		};
		
	   	var children = node.childNodes;
	   	var min = -1;
	   	var max = -1;
	   	for (var i = 0; i < children.length; i++) {
	   		var child = children[i];
	   		var name = (child.prefix) ? child.nodeName.split(":")[1] : child.nodeName;
	   		if (child.nodeType != 1) {
	   			continue;
	   		} else if (name == "Title") {
				layer.title = child.firstChild.nodeValue;
	   		} else if (name == "Name") {
   				layer.type = TYPE_LAYER;
	   			layer.name = child.firstChild.nodeValue;
	   		} else if (name == "Style") {
	   			var online = findFirstElement(child, "OnlineResource");
	   			if (online != null) {
	   				legend = getAttrValue(online, "href");
			        layer.legend = legend;
	   			}
	   		} else if (name == "MinScaleDenominator") {
	   			layer.min = child.firstChild.nodeValue;
	   		} else if (name == "MaxScaleDenominator") {
	   			layer.max = child.firstChild.nodeValue;
	   		}
	   	}
	   	for (var i = children.length; --i >= 0;) {
	   		var child = children[i];
	   		var name = (child.prefix) ? child.nodeName.split(":")[1] : child.nodeName;
	   		if (child.nodeType != 1) {
	   			continue;
	   		} else if (name == "Layer") {
	   			layer.type = TYPE_GROUP;
	   			layer.layers.push(this.getLayer(child));
	   		}
	   	}
	   	return layer;
	};
	
	this.onExpClick = function(e) {
        if (this.childDiv.style.display == 'none') {
        	this.childDiv.style.display = '';
        	this.layer.expand = true;
        	this.expImg.src = getImageLocation("reduction.png");
        } else {
        	this.childDiv.style.display = 'none';
        	this.layer.expand = false;
        	this.expImg.src = getImageLocation("expand.png");
        }
        //OpenLayers.Event.stop(e);
    };
    
    this.onCheckClick = function(e) {
    	if (this.layer.check) {
    		this.checkImg.style.width = "11";
			this.checkImg.style.height = "11";
    		this.checkImg.src = getImageLocation("check_off.gif");
    		this.layer.check = CHK_OFF;
    	} else {
    		this.checkImg.style.width = "11";
			this.checkImg.style.height = "11";
    		this.checkImg.src = getImageLocation("check_on.gif");
    		this.layer.check = CHK_ON;
    	}
        this.toc.updateMap();
        //OpenLayers.Event.stop(e);
    };
    
    this.updateScale = function(layer, scale) {
    	if (layer == null) {
    		layer = this.layer;
    	}
    	if (scale == null) {
    		scale = parseFloat(this.map.getScale());
    	}
		if (layer.check != CHK_OFF) {
			layer.check = CHK_ON;
			if (!(layer.min == -1 || scale >= layer.min)) {
				layer.check = CHK_OUT;
			}
			if (!(layer.max == -1 || scale < layer.max)) {
				layer.check = CHK_OUT;
			}
			if (layer.check == CHK_OUT) {
				layer.checkImg.style.width = "16";
				layer.checkImg.style.height = "16";
				layer.checkImg.src = getImageLocation("scale_out.gif");
			} else {
				layer.checkImg.style.width = "11";
				layer.checkImg.style.height = "11";
				layer.checkImg.src = getImageLocation("check_on.gif");
			}
		}
		var children = layer.layers;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			this.updateScale(child, scale);
		}
	};
	
	this.expandAll = function(layer) {
		if (layer == null) {
			layer = this.layer;
		}
		
       	layer.expand = true;
		layer.childDiv.style.display = '';
       	layer.expImg.src = getImageLocation("reduction.png");
       	
       	var children = layer.layers;
       	for (var i = 0; i < children.length; i++) {
       		var child = children[i];
       		this.expandAll(child);
       	}
	};
	
	this.turnOnAll = function(layer, scale) {
		this.turnOnAllInternal(layer, scale);
		this.updateMap();
	}
	
	this.turnOnAllInternal = function(layer, scale) {
		if (layer == null) {
			layer = this.layer;
		}
		if (scale == null) {
    		scale = parseFloat(this.map.getScale());
    	}
		
       	layer.check = CHK_ON;
		if (!(layer.min == -1 || scale >= layer.min)) {
			layer.check = CHK_OUT;
		}
		if (!(layer.max == -1 || scale < layer.max)) {
			layer.check = CHK_OUT;
		}
		if (layer.check == CHK_OUT) {
			layer.checkImg.style.width = "16";
			layer.checkImg.style.height = "16";
			layer.checkImg.src = getImageLocation("scale_out.gif");
		} else {
			layer.checkImg.style.width = "11";
			layer.checkImg.style.height = "11";
			layer.checkImg.src = getImageLocation("check_on.gif");
		}
		
       	var children = layer.layers;
       	for (var i = 0; i < children.length; i++) {
       		var child = children[i];
       		this.turnOnAll(child);
       	}
	};
	
	this.turnOffAll = function(layer) {
		this.turnOffAllInternal(layer);
		this.updateMap();
	}
	
	this.turnOffAllInternal = function(layer) {
		if (layer == null) {
			layer = this.layer;
		}
		
       	layer.check = CHK_OFF;
		layer.checkImg.style.width = "11";
		layer.checkImg.style.height = "11";
		layer.checkImg.src = getImageLocation("check_off.gif");
		
       	var children = layer.layers;
       	for (var i = 0; i < children.length; i++) {
       		var child = children[i];
       		this.turnOffAll(child);
       	}
	};
	
	this.collapseAll = function(layer) {
		if (layer == null) {
			layer = this.layer;
		}
		
       	layer.expand = false;
		layer.childDiv.style.display = 'none';
       	layer.expImg.src = getImageLocation("expand.png");
       	
       	var children = layer.layers;
       	for (var i = 0; i < children.length; i++) {
       		var child = children[i];
       		this.collapseAll(child);
       	}
	};
    
    this.getShowingLayers = function() {
    	if (this.map == null) {
			return;
		}
		this.updateScale();
		var names = [];
        this.getShowingLayerNames(this.layer, names);
         var params = "";
        for (var i = 0; i < names.length; i++) {
        	if (i > 0) {
        		params += ",";
        	}
        	params += names[i];
        }
        return params;
    };
    
	this.updateMap = function() {
		if (this.map == null) {
			return;
		}
		this.updateScale();
		var names = [];
        this.getRequestLayerNames(this.layer, names);
        var params = "";
        for (var i = 0; i < names.length; i++) {
        	if (i > 0) {
        		params += ",";
        	}
        	params += names[i];
        }
        
        if (this.baseLayer == null) {
        	this.baseLayer = this.map.baseLayer;
        }

		//this.baseLayer.params.LAYERS = params;
       // this.baseLayer.redraw();
        this.map.layers[0].params.LAYERS = params; 
        this.map.layers[0].redraw();
		
		if (this.input != null) {
			this.input.value = params;
		}
	};
	
	this.getRequestLayerNames = function(layer, names) {
		if (layer.check == CHK_OFF) {
			return;
		}
		if (layer.type == TYPE_LAYER) {
			names.push(layer.name);
		} else if (layer.type == TYPE_GROUP) {
			var children = layer.layers;
			for (var i = children.length; --i >= 0;) {
				var child = children[i];
				this.getRequestLayerNames(child, names);
			}
		}
	};
	
	this.getShowingLayerNames = function(layer, names) {
		if (layer.check == CHK_OFF) {
			return;
		}
		if (layer.check == CHK_OUT) {
			return;
		}
		if (layer.type == TYPE_LAYER) {
			names.push(layer.name);
		} else if (layer.type == TYPE_GROUP) {
			var children = layer.layers;
			for (var i = children.length; --i >= 0;) {
				var child = children[i];
				this.getShowingLayerNames(child, names);
			}
		}
	};
}

function findFirstElement(node, name) {
	if (node.nodeType == 1) {
		var localName = (node.prefix) ? node.nodeName.split(":")[1] : node.nodeName;
		if (localName == name) {
			return node;
		}
	} 
	
	var children = node.childNodes;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var rtn = findFirstElement(child, name);
		if (rtn != null) {
			return rtn;
		}
	}
	
	return null;
}

function getAttrValue(node, attrName) {
	var attrs = node.attributes;
	for (var i = 0; i < attrs.length; i++) {
		var attr = attrs[i];
		var localName = (attr.prefix) ? attr.nodeName.split(":")[1] : attr.nodeName;
		if (localName == attrName) {
			return attr.nodeValue;
		}
	}
	return "";
}

function getImageLocation (image) {
	return getScriptLocation() + "img/" +image;
}

function getScriptLocation () {
	var scriptLocation = "";
	var scriptName = "TOC.js";

	var scripts = document.getElementsByTagName('script');
	for (var i=0, len=scripts.length; i<len; i++) {
		var src = scripts[i].getAttribute('src');
		if (src) {
			var index = src.lastIndexOf(scriptName); 
			// set path length for src up to a query string
			var pathLength = src.lastIndexOf('?');
			if (pathLength < 0) {
				pathLength = src.length;
			}
			// is it found, at the end of the URL?
			if ((index > -1) && (index + scriptName.length == pathLength)) {
				scriptLocation = src.slice(0, pathLength - scriptName.length);
				break;
			}
		}
	}
	
	return scriptLocation;
}
