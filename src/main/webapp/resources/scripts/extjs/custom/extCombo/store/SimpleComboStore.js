Ext.define( 'Ext.extCombo.store.SimpleComboStore',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.extCombo.model.SimpleComboModel'
	],
		
	model: 'Ext.extCombo.model.SimpleComboModel',
	proxy: {
		type: 'ajax',
		url: simpleComboBoxStoreUrl,
		headers: {
        	'Content=Type' : 'application/json; charset=UTF-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});