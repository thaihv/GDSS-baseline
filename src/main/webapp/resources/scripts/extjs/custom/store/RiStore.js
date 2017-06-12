Ext.define( 'Ext.custom.store.RiStore',{ 
	extend:	'Ext.data.Store',
	fields:[ 'RI_CD','RI_NM' ],
	proxy:{
		type: 'ajax',
		url:'/land-office/getJsonAddrSearch.do?type=ri'
	}
});