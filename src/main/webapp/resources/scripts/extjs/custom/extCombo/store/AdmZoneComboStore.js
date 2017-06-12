Ext.define( 'Ext.extCombo.store.AdmZoneComboStore',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.extCombo.model.AdmZoneComboModel'
	],
		
	model: 'Ext.extCombo.model.AdmZoneComboModel',
	proxy: {
		type: 'ajax',
		url: admZoneComboBoxStoreUrl,
		headers: {
        	'Content=Type' : 'application/json; charset=UTF-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});