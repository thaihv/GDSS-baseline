Ext.define('Ext.custom.common.TextfieldSlider', {
    extend: 'Ext.Slider',
    alias: 	'widget.textfieldslider',

    isFormField: true,
  	initComponent: function() {
  		var me = this;
    	me.originalValue = me.value;
    	Ext.custom.common.TextfieldSlider.superclass.initComponent.call(this);
  	},
  	onRender: function(){
  		var me = this;
    	Ext.custom.common.TextfieldSlider.superclass.onRender.apply(this, arguments);
    	Ext.DomHelper.insertFirst(this.el,{
        	tag: 'div',
        	id: me.id +'_slidertextdiv',
        	style: 'position: relative; float:right;width:60px;height:20px;'
	    });
	    me.sliderField = new Ext.form.NumberField({
	        renderTo:me.id +'_slidertextdiv',
	        id: me.id +'_slidertext',
	        name: me.name +'_slidertext',
	        value: me.value,
	        enableKeyEvents:true,
	        width:60,
	        minValue:me.minValue,
	        maxValue:me.maxValue ,
	        scope:me,
	        listeners: {
	            keyup : function() {
	            	Ext.Function.defer(this.adjustValue, 500, this);
	            },
	            scope:me
	        }
	    });
  	},
  	adjustValue : function(){
  		var me = this;
    	me.setValue(me.sliderField.getValue());
    	if(me.sliderField.getValue()==""){
        	me.setValue(0);
    	}
    	this.sliderField.clearInvalid();
  	},
  	setValue: function(v) {
  		var me = this;
    	v = parseFloat(v);
    	if(me.maxValue && v > me.maxValue) v = me.maxValue;
	    if(me.minValue && v < me.minValue) v = me.minValue;
	    Ext.custom.common.TextfieldSlider.superclass.setValue.apply(me, [v]);
	   
	    if(me.rendered){
			if(v<=0){
	        	Ext.getDom(me.id +'_slidertext').value=0;
	      	} else {
	        	Ext.getDom(me.id +'_slidertext').value=v;
	      	}
	      
	    }
	},
	reset: function() {
  		var me = this;
    	me.setValue(this.originalValue);
    	me.clearInvalid();
	},
	getName: function() {
  		var me = this;
		return me.name;
	},
	validate: function() {
		return true;
	},
	setMinValue : function(minValue){
  		var me = this;
    	me.minValue = minValue;
    	me.sliderField.minValue =  minValue;
		return minValue;
	},
	setMaxValue : function(maxValue){
  		var me = this;
    	me.maxValue = maxValue;
    	me.sliderField.maxValue =  maxValue;
    	return maxValue;
	},
	markInvalid: Ext.emptyFn,
	clearInvalid: Ext.emptyFn
});
