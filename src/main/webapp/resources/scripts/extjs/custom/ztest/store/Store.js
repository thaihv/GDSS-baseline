Ext.define( 'web.store.Store',{
	extend : 'Ext.data.Store',

	config : {
		url : null,
		model : null,
		extraParams : null,
		autoLoad : false
	},
//	autoLoad : this.getAutoLoad(),		
//	model : this.model,
	model : 'web.store.Model',
	proxy: {
		type: 'ajax',
//		url: this.url,
		url : '/land-office/common/CmmCode.do',
		headers: {
        	'Content=Type' : 'application/json; charset=utf-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
//	listeners: {
//		'beforeload': this.onBeforeLoadEvent,
//		scope: this
//	},
//	onBeforeLoadEvent: function(store, operation){
//		operation.params = this.param;
//	}
	
});