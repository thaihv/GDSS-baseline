var mappanel = Ext.create('Ext.panel.Panel', {
    title: "Extjs4 and OpenLayers 3 working on!",
    layout: 'fit',
    html: "<div id='map' class='map'></div>", // The map will be drawn inside
    listeners: {
        afterrender: function () {
            var osm_source = new ol.source.OSM({
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            });
            var osmLayer = new ol.layer.Tile({
                source: osm_source
            });
            var birmingham = ol.proj.transform([-1.81185, 52.44314],
            		'EPSG:4326', 'EPSG:3857');

            var bingMapsAerial = new ol.layer.Tile({
	            	source: new ol.source.BingMaps({
	            		key: 'AlQLZ0-5yk301_ESrmNLma3LYxEKNSg7w-e_knuRfyYFtldUFvXVs38NOulku3Q',
	            		imagerySet: 'Aerial'
	            	})
            	});
            bingMapsAerial.set('name', 'Bings Maps Aerial');
            	
            var simpleWMS = new ol.layer.Image({
	            	opacity: 0.6,
	            	source: new ol.source.ImageWMS({
	            		url: 'http://demo.boundlessgeo.com/geoserver/wms',
	            		params: {
	            			'LAYERS': 'topp:states'
	            		},
	            		extent: [-13884991, -7455066, 2870341, 6338219]
	            	})
            	});
            simpleWMS.set('name', 'USA layer from Geoserver WMS demo');        

           	var layers = [osmLayer, bingMapsAerial, simpleWMS];
           	var view = new ol.View({
           		center: ol.proj.transform([-90, 40], 'EPSG:4326','EPSG:3857'),
           		zoom: 3
           	});            
            this.map = new ol.Map({
                target: 'map',
                renderer: 'canvas',
                layers: layers,
            });
            this.map.setView(view);
            
            var layerSwitcher = new ol.control.LayerSwitcher();
            this.map.addControl(layerSwitcher);            
            this.map.addControl(new ol.control.FullScreen());
            this.map.addControl(new ol.control.MousePosition({
            	coordinateFormat: ol.coordinate.createStringXY(2),
            	projection: 'EPSG:4326'}));
            this.map.addControl(new ol.control.ScaleLine());
            var zoomToExtentControl = new ol.control.ZoomToExtent({
            	extent: [-13884991, -7455066, 2870341, 6338219]
            	});
            this.map.addControl(zoomToExtentControl);
        },
        // The resize handle is necessary to set the map!
        resize: function () {
//            var size = [document.getElementById(this.id + "-body").offsetWidth, document.getElementById(this.id + "-body").offsetHeight];
//            console.log(size);
//            this.map.setSize(size);
        }
    }
});

Ext.define('GDSS.view.geoExtjs', {
	extend : 'Ext.panel.Panel',
	title : 'Map Viewer',
	itemId : 'mapview',
	height: '100%',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	items : [
		{
			xtype : 'container',
			id : 'map-content',
			layout : {
				type : 'hbox'
			},
			items : [mappanel]
		}		
	] 
});

