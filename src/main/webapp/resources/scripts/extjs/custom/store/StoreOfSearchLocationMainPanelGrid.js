Ext.define( 'Ext.custom.store.StoreOfSearchLocationMainPanelGrid',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.custom.model.ModelOfSearchLocationMainPanelGrid'
	],
		
	model: 'Ext.custom.model.ModelOfSearchLocationMainPanelGrid',
	proxy: {
		type: 'ajax',
		url: '/land-office/surveyRecRegister.do',
		headers: {
        	'Content=Type' : 'application/json; charset=utf-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});