Ext.define('LOP.ExtCmmStore', {
	Store : function(url, fields, autoLoad)	{
		return Ext.create('Ext.data.Store',{
			fields : fields == null ? [] : fields,
			proxy: {
				type: 'ajax',
				url: url,
				headers: {
					'Content=Type' : 'application/json; charset=utf-8'
				},
				reader: {
				    type: 'json',
				    root: 'data'
				}        
			},
			autoLoad : autoLoad == null ? false: autoLoad
		})
	}
});
