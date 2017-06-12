Ext.define('Ext.extCheckbox.YNCheckbox', {
    extend : 'Ext.form.field.Checkbox',
	alias: 'widget.yncheckbox',
		
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
    
    initComponent : function() {
    	var me = this;    	
    	this.callParent(arguments);
    },
    
    getSubmitValue: function() {
        return (this.getValue())? 'Y' : 'N';
    }
});