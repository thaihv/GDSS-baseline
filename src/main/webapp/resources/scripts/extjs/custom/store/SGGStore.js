Ext.define( 'Ext.custom.store.SGGStore',{
	extend: 'Ext.data.Store',
	fields:[ 'SGG_CD','SGG_NM' ],
	proxy:{
		type: 'ajax',
		url:'/land-office/getJsonAddrSearch.do?type=sgg'
	}
});