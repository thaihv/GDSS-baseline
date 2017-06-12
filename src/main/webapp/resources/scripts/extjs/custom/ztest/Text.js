labelWidth = '60px';
padding = '0px 60px 0px 0px';

Ext.define('web.Text',{   
	extend: 'Ext.form.field.Text',
	padding: padding,
	labelWidth: labelWidth,
	config: {
		fieldLabel: '',
		value:''		
	},
	initComponent: function()	{
		this.callParent(arguments);
	}
}); 


