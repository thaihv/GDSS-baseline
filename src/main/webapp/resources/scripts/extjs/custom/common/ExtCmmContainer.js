Ext.define('LOP.ExtCmmContainer', {
	
	Container : function(layout, width, height, flex, items) {
		return {
			xtype : 'container',
			layout : layout,
			height : height,
			width : width,
			flex : flex,
			items : items == null ? [] : items
		}
	},
	
	Box	: function(flex)	{
		return {
			xtype : 'container',
			flex : flex
		}
	},
	
	HSpace : function(width)	{
		return {
			xtype : 'container',
			width : width
		}
	},
	
	VSpace : function(height)	{
		return {
			xtype : 'container',
			height : height
		}
	},
	
	HBox : function(flex, items)	{
		return {
			xtype : 'container',
			layout : 'hbox',
			flex : 1,
			items : items == null ? [] : items
		}
	},
	
	VBox : function(flex, items)	{
		return {
			xtype : 'container',
			layout : 'vbox',
			items : items == null ? [] : items
		}
	}
	
});