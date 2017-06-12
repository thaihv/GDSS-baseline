Ext.define('Ext.extGrid.view.SampleGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.samplegrid',
	requires: [
		'Ext.extGrid.store.SampleGridStore'
	],
	
	config: {
		id: null,
		scrid : null,
		storeurl : '/land-office/getGridMetaData.do',
		getdatastoreurl: null,
		datatype: 'grid',
		isRownumber: false,
		hasSelmodel: {
			isSelmodel: false,
			type: 'SINGLE'
		}
	},
	
	rownumber : null,
	
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	var me = this;
    	
    	if( me.hasSelmodel.isSelmodel){
    		me.selModel = Ext.create('Ext.selection.CheckboxModel', {
				mode: me.hasSelmodel.type
			});
    	}
    	
    	Ext.apply( me, {
    		columns: [],
    		layout: 'fit',
    		store: Ext.create( 'Ext.extGrid.store.SampleGridStore',{
				listeners: {
					'metachange': me.doMetaChange,
					'beforeload': me.onBeforeLoadEvent,
					scope: me
				},
				id: me.id+'store',
				autoLoad: true
    		})
    	});    	
    	
    	this.callParent(arguments);
    },
    
    doMetaChange: function( store, meta){
		var fields = [];
		var columns = [];
		
		if( this.isRownumber){
			columns.push( this.setRownumberComponent());
		}
		
		for( var i=0;i<meta.length;i++){
			
			fields.push( this.setFieldInfos(meta[i]));			
			columns.push( this.setColumnInfos( meta[i]));
		}
		//model = Ext.ModelMgr.getModel( store.model);
		//store.model = model.copy( this.id+'model');
		
		store.model.setFields( fields);
		
		
		//store.fields = fields;
		store.getProxy().url = this.getdatastoreurl;
		this.reconfigure( store, columns);
		//this.getStore().getProxy().url =  this.getdatastoreurl;
	},
	
	onBeforeLoadEvent: function(store, operation,eOpts){
		operation.params = {
			scrid : this.scrid,
			datatype: this.datatype
		}
	},
	
	setFieldInfos: function( metaValue){
		return {
			name: metaValue.dataindex,
			type: metaValue.type
		};
	},
	
	setColumnInfos: function( metaValue){
		var column = {
			text: metaValue.text,
			dataIndex: metaValue.dataindex,
			width: parseInt(metaValue.width)
		};
		
		if( metaValue.isvisible === 'false'){
			column.hidden = true;
			column.hideable = false;
		}
		
		if( metaValue.flex === '1'){
			column.flex = 1;
		}
		
		if( metaValue.maxwidth.trim() != ''){
			column.maxWidth = parseInt( metaValue.maxwidth);
		}
		return column;
	},
	
	setRownumberComponent: function(){
		return {
			xtype: 'rownumberer'
		};
	}
});

/*function gridDataload( id, extraparam){
	var grid = Ext.getCmp( id);
	console.log( 'gridDataload------------');
	console.log( !extraparam);
	if( extraparam){
		grid.getStore().getProxy().extraParams = extraparam;
	}	
	grid.getStore().load();
}*/

function getExtGrid(keyValue){
	var grid = Ext.create('Ext.extGrid.view.SampleGrid',{
		storeurl: keyValue.storeurl,
		getdatastoreurl: keyValue.getdatastoreurl,
		border: keyValue.border,
		id: keyValue.id,
		scrid: keyValue.scrid,
		isRownumber: keyValue.isRownumber,
		hasSelmodel: keyValue.hasSelmodel
	});
	
	if( keyValue.initLoad){
		loadExtGrid( keyValue.id, keyValue.extraParams);
	}
	return grid; 
};

function loadExtGrid( id, extraParams){
	console.log( 'loadGrid init!!!!');
	var grid = Ext.getCmp( id);
	if( extraParams){
		grid.getStore().getProxy().extraParams = extraParams;
	}
	grid.getStore().load();
	console.log( grid);
};
