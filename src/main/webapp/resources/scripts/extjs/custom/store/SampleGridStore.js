Ext.define( 'Ext.custom.store.SampleGridStore',{
	extend: 'Ext.data.Store',
	
	fields: [ 'LOCATION', 'JIBUN'],
	
	proxy: {
		type: 'ajax',
		url: '/land-office/surveyRecRegister.do',
		reader: {
            type: 'json',
            root: 'data'
        }        
	}
});