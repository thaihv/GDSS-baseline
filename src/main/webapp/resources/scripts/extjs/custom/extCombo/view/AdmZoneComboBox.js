Ext.define('Ext.extCombo.view.AdmZoneComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.admzonecombobox',
	requires: [
		'Ext.extCombo.store.AdmZoneComboStore'
	],
	
	config: {
		typeZone: null,
		parentCode: null,
		defaultParentCode: null,
		hasParent: true,
		initFlag: true,
		allFlag: false,
		allText: null,
		comboUrl: null,
//		editable: false,
		defaultId: null
	},
	
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	var me = this;
    	
    	Ext.apply( me,{
    		
    		store: Ext.create('Ext.extCombo.store.AdmZoneComboStore', {
    			listeners: {
					'beforeload': me.onBeforeLoadEvent,
					'load': me.onLoadedEvent,
					scope: me
				},
				autoLoad: !me.hasParent
    		}),    		
    		displayField: 'DISPLAY',
    		valueField: 'VALUE'
    	});    	
    	
    	if( me.hasParent){
    		me.disable();
    	}    	
    	
    	this.callParent(arguments);
    },
    
    onBeforeLoadEvent: function(store, operation,eOpts){
    	
    	if(this.comboUrl){
    		store.proxy.url = this.comboUrl;
    	}
    	
		operation.params = {
			TYPE_ZONE : this.typeZone
		};	
		
		if( this.hasParent){

			operation.params = Ext.applyIf( operation.params, {
				parentCode: this.parentCode 
			});
		}
	},
	
	onLoadedEvent: function( store, records, successful, eOpts){
		store.insert(0, [{
        	DISPLAY: null,
            VALUE: ''
		}]);
		if( this.allFlag){
			store.insert  (0,{
	    		DISPLAY: this.allText,
				VALUE: ''
			    });
			
			this.setValue( store.getAt(0).get('VALUE'));
			
			if( this.defaultId != 'null'){
				this.setValue(this.defaultId);
			}
			
		}

		else if( this.defaultId != 'null'){
			this.setValue(this.defaultId);
		}
		else if( this.initFlag){
			//this.setValue(this.defaultId);
			this.setValue( store.getAt(0).get('VALUE'));
		}
		
		if( this.hasParent){
			this.enable();
		}
	}
});