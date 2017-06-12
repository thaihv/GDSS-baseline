Ext.define('Ext.extCombo.view.SimpleComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.simplecombobox',
	requires: [
		'Ext.extCombo.store.SimpleComboStore'
	],
	
	config: {
		scrid: null,
		defaultId: null,
		parentCode: null,
		hasParent: false,
		initFlag: true,
		allFlag: false,
		allText: null,
		comboUrl: null,
		editable: false,
		mode:"local",
        triggerAction:"all"
	},
	
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	var me = this;
    	
    	Ext.apply( me,{
    		
    		store: Ext.create('Ext.extCombo.store.SimpleComboStore', {
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
			GROUP_CD : this.scrid
		};	
		
		if( this.hasParent){

			operation.params = Ext.applyIf( operation.params, {
				parentCode: this.parentCode
			});
		}
	},
	
	onLoadedEvent: function( store, records, successful, eOpts){		
		
		if( this.allFlag){
			
			store.insert  (0,{
	    		DISPLAY: this.allText,
				VALUE: ''
			    });
			
			this.setValue( store.getAt(0).get('VALUE'));
			
			if( this.defaultId){
				this.setValue(this.defaultId);
			}
			
		}
		
		
		
		else if( this.defaultId){
			this.setValue(this.defaultId);
		}
		else if( this.initFlag){
			this.setValue( store.getAt(0).get('VALUE'));
		}
		
		if( this.hasParent){
			this.enable();
		}
		
		
	}
});