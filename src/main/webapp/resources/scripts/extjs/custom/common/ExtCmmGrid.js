Ext.define('LOP.ExtCmmGrid', {
	
	DataGrid : function(title, name, height, columns, store, dockedItems, listener)	{
		return Ext.create('Ext.grid.Panel',{
			title : title,
			id : name,
			name : name,
			height: height == null ? 100 : height,
			columns : columns == null ? [] : columns,
			layout: 'fit',
			store : store == null ? [] : store,
			dockedItems : dockedItems == null ? [] : dockedItems,
			listeners : listener
		})
	}, 
	
	DockedItems : function(dock, items)	{
		return {
	    	xtype: 'toolbar',
			border: false,
			margin: '0 0 5 0',
			dock: dock,
			items : items == null ? [] : items
		}
	}
});
