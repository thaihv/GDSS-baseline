Ext.define( 'Ext.custom.store.EMDStore',{
	extend: 'Ext.data.Store',
	fields:[ 'EMD_CD','EMD_NM' ],
	proxy:{
		type: 'ajax',
		url:'/land-office/getJsonAddrSearch.do?type=emd'
	}
});