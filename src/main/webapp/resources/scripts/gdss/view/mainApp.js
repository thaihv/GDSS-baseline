var tp1 = Ext.create('GDSS.view.projectInfo', {});
var tp2 = Ext.create('GDSS.view.geoExtjs', {});


Ext.require([
             'Ext.tip.QuickTipManager',
             'Ext.menu.*',
             'Ext.form.field.ComboBox',
             'Ext.layout.container.Table',
             'Ext.container.ButtonGroup'
         ]);
// --------- MENU Example from Extjs ----------------------



// --------- END MENU Example from Extjs ------------------



Ext.define('GDSS.view.mainApp', {
	extend : 'Ext.form.Panel',
	id : 'mainform',
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	config: {},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
					items : [	

					         
								{
									xtype : 'tabpanel',
									itemId : 'map_contentsId',
									defaults : {
										layout : {
											align : 'stretch',
											type : 'vbox'
										},
										autoHeight : true,
										autoWidth : true
									},
									activeTab : 0,
									items : [
										tp1, tp2
									]
								}
					]
				});
				
		me.callParent(arguments);
	}
});