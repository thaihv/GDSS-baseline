Ext.define( 'Ext.extCombo.store.LandUsePurposeComboStore',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.extCombo.model.LandUsePurposeComboModel'
	],
		
	model: 'Ext.extCombo.model.LandUsePurposeComboModel',
	proxy: {
		type: 'ajax',
		url: landUsePurposeStoreUrl,
		headers: {
        	'Content=Type' : 'application/json; charset=UTF-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});