Ext.define( 'Ext.extGrid.store.SampleGridStore',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.extGrid.model.SampleGridModel'
	],
	
	/*constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	
    	var me = this;
    	
    	//var model = Ext.create('Ext.extGrid.model.SampleGridModel');
    	
    	Ext.apply(me,{
    		model: 'Ext.extGrid.model.SampleGridModel',
    		proxy: {
				type: 'ajax',
				url: '/land-office/getGridMetaData.do',
				headers: {
		        	'Content=Type' : 'application/json; charset=utf-8'
		        },
				reader: {
		            type: 'json',
		            root: 'data'
		        }        
			}
    	});
    	
    	this.callParent(arguments);
    }*/
    
	model: 'Ext.extGrid.model.SampleGridModel',
	
	proxy: {
		type: 'ajax',
		url: '/land-office/getGridMetaData.do',
		headers: {
        	'Content=Type' : 'application/json; charset=utf-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});