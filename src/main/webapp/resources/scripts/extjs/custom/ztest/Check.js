labelWidth = '60px';
padding = '0px 60px 0px 0px';

Ext.define('web.Check',{   
	extend: 'Ext.panel.Panel',
	padding: '0px 80px 0px 0px',
		border: 0,
	items:[{
        xtype: 'checkboxgroup',
        fieldLabel: '',
		labelWidth: '60px',
        vertical: true,
		items:[
//			{ boxLabel: 'Item 1', name: 'rb', inputValue: '1' },
			{ boxLabel: 'Item 2', name: 'rb', inputValue: '2', checked: true }
		]
	}]

}); 



