Ext.define( 'Ext.custom.store.SidoStore',{ 
	extend:	'Ext.data.Store',
	fields:[ 'SIDO_CD','SIDO_NM' ],
	proxy:{
		type: 'ajax',
		url:'/land-office/getJsonAddrSearch.do?type=sido'
	}
});