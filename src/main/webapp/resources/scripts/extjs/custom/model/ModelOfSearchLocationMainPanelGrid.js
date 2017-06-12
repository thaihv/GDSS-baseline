Ext.define('Ext.custom.model.ModelOfSearchLocationMainPanelGrid', {
	extend: 'Ext.data.Model',
	fields: [
	    { name: 'LOCATION', type: 'string' },
	    { name: 'JIBUN', type: 'string'},
	    { name: 'JIMOK', type: 'string'},
	    { name: 'PRICE', type: 'int'},
	    { name: 'AREA', type: 'float'},
	    { name: 'OWNER', type: 'string'},
	    { name: 'PNU', type: 'string'}
	]
});