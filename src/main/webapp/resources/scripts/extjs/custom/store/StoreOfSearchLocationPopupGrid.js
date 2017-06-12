
Ext.define( 'Ext.custom.store.StoreOfSearchLocationPopupGrid',{
	extend: 'Ext.data.Store',
	
	requires:[
	    'Ext.custom.model.ModelOfSearchLocationPopupGrid'
	],
		
	model: 'Ext.custom.model.ModelOfSearchLocationPopupGrid',
	proxy:{
		type: 'ajax',
		url: '/land-office/getJsonAddrSearch.do?type=parcel'
	}
});
