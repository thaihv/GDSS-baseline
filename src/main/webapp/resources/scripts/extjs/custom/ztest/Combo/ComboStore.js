Ext.define( 'web.Combo.ComboStore',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'web.Combo.ComboModel'
	],
	model: 'web.Combo.ComboModel',
	proxy: {
		type: 'ajax',
		url: '/land-office/common/CmmCode.do',
		headers: {
        	'Content=Type' : 'application/json; charset=utf-8'
        },
		reader: {
            type: 'json',
            root: 'data'
        }        
	},
	autoLoad:true
});