Ext.define('LOP.ExtCmmTab', {
	
	Tab : function(title, id, activeTab, items) {
		return {
			id 			: id,
			title 		: title,
			xtype 		: 'tabpanel',
			activeTab 	: activeTab,
			items 		: items
		}
	},

	TabItem : function(title, id, items) {
		return {
			id 			: id,
			title 		: title,
			bodyStyle 	: 'padding:10 10 10 10',
			items 		: items
		}
	}
});