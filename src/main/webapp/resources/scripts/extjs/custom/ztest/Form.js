Ext.define('web.Form',{
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.grid.Panel',
	],
	
	config: {},
	
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},
	       
	initComponent : function() {
		var me = this;
		
		Ext.apply(me, {
			
			bodyStyle: 'padding:10px',
			//
			frame: true,
			
			items:[
			],
			buttons: [
			]
		});
		
		me.callParent(arguments);
	}
	,addButton : function(btn)	{
		this.getDockedComponent(0).add(btn);
	}
});