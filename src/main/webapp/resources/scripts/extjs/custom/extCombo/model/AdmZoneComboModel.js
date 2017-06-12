Ext.define('Ext.extCombo.model.AdmZoneComboModel',{
	extend: 'Ext.data.Model',

    fields: [
    	{
    		name: 'DISPLAY', type: 'string'
    	},{
    		name: 'VALUE', type: 'string'
    	}
    ],
    proxy: {
        type: 'localstorage',
        id  : 'AdmZone-VietNam'
    }
});