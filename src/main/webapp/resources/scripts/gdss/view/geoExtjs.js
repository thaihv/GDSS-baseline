var mappanel = Ext.create('Ext.panel.Panel', {
    title: "Extjs4 and OpenLayers 3 working on!",
    layout: 'fit',
    html: "<div id='map' class='map'></div>", // The map will be drawn inside
    listeners: {
        afterrender: function () {
            var mapHostUrl = 'http://192.168.100.200:8880/geonuris/';
            var mapExtent = [955558.8035752114, 1938845.782052254, 967787.8205936231, 1949495.627410373];
            var mapCRS = 'EPSG:5179';
              
            var proxy = '/proxy.do';
            var serviceUrl = "http://192.168.100.200:8880/geonuris/wms?GDX=gangnammap.xml&TEXT_ANTI=TRUE&LABEL=HIDE_OVERLAP";
            var serviceWFSUrl = "http://192.168.100.200:8880/geonuris/wfs?GDX=gangnammap.xm&FIXED=TRUE&";

            this.map = new ol.Map({
                target: 'map',
                renderer: 'canvas'

            });            
            
            var view = new ol.View({
                projection : mapCRS,
                center: [961308.6888457985, 1944771.638170782],
                zoom : 8
            });
     

            this.map.setView(view);
            
            var wmsSource = new ol.source.TileWMS({
                url : proxy + '?url=' + serviceUrl,
                params : {
                    LAYERS : 'ROOT',
                    CRS : mapCRS,
                    format : 'image/png',
                    bgcolor : '0xffffff', 
                    exceptions : 'BLANK',
                    label : 'HIDE_OVERLAP',
                    graphic_buffer : '64',
                    ANTI : 'true',
                    TEXT_ANTI : 'true'
                },
                serverType: 'geoserver'
            });
             
     
            var wmsLayer = new ol.layer.Tile({
                source : wmsSource
            });
             
     
            map.addLayer( wmsLayer );
            
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

