Ext.define('Ext.custom.view.SampleRadioGroup',{
	extend: 'Ext.form.RadioGroup',
	alias: 'widget.sampleradiogroup',
	
	requires: [
		'Ext.data.Store'
	],
	
	config: {
		scrid: null,
		radioname: null,
		itemsData: [],
		itemCount: 0
	},
	
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	
    	var me = this;
    	
    	var store = Ext.create( 'Ext.data.Store',{
    		fields: [
    			{
    				name: 'boxLabel', type: 'string'
    			},{
    				name: 'name', type: 'string'
    			},{
    				name: 'inputValue', type: 'string'
    			},{
    				name: 'checked'
    			}
    		],
    		
    		proxy: {
    			type: 'ajax',
    			url: '/land-office/getGridMetaData.do',
    			reader: {
    				type: 'json',
    				root: 'data',
    				totalProperty: 'total'
    			}
    		}
    	});    	
    	
    	store.load({
    		scope: store,
    		params: {
    			datatype: 'radio',
    			scrid : me.scrid,
    			radioname : me.radioname
    		}, 
    		callback: function(records, operation, success) {
    			console.log( 'SampleRadioGroup store loaded!!!');
    			if( Ext.Object.isEmpty( me.itemsData)){
    				me.itemCount = this.getTotalCount();
    				for( var i=0; i< records.length; i++){
    					me.itemsData.push( me.setItemInfo( records[i].data));
    				}
    			}
    			console.log( this.getTotalCount());
    			console.log( me.itemsData);
    			console.log( 'init com---- Ext.apply start');
		    	Ext.apply(me, {
		    		columns: me.itemCount,
		    		items: me.itemsData
		    	});
		    	console.log( 'init com---- Ext.apply end');		    	
    		}
    	});
    	me.callParent(arguments);
    },
    
    setItemInfo: function( metaValue){
    	console.log( 'setItemInfo init start');
    	console.log( metaValue);
    	console.log( 'setItemInfo init end');
    	var item = {
    		boxLabel: metaValue.boxLabel,
			name: metaValue.name,
			inputValue: metaValue.inputValue
    	};
    	
    	if( metaValue.checked === 'true'){
    		item.checked = true;
    	}
    	return item;
    }
});