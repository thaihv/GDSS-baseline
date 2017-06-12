
Ext.define('LOP.ExtCmm_backup', {

	Tabs : function(name, activeTab, items) {
		return {
			name : name,
			xtype : 'tabpanel',
			activeTab : activeTab,
			items : items
		}
	},

	TabItem : function(title, name, items) {
		return {
			title : title,
			name : name,
			bodyStyle : 'padding:10 10 30 10',
			items : items
		}
	},	
	
	FieldSet : function(title, items) {
		return {
			title : title,
			xtype : 'fieldset',
			layout : 'anchor',
			bodyStyle : 'padding:10px',
			items : items,
			flex : 1
		}
	},

	Box : function(layout, items) {
		return {
			xtype : 'container',
			layout : layout,
			items : items
		}
	},

	Container : function(width, height, flex, items) {
		return {
			xtype : 'container',
			height : height = '' ? '100%' : height,
			width : width == '' ? '100%' : width,
			flex : flex,
			items : items
		}
	},

	TextField : function(lable, name, labelAlign, width) {
		return {
			xtype : 'textfield',
			labelAlign : labelAlign == null ? 'left' : labelAlign,
			padding : '0 30 0 0',
			labelWidth : 60,
			width : '100%',
			fieldLabel : lable,
			flex : 1,
			name : name
		}
	},

	ComboField : function(lable, name, grpCd, labelAlign) {
		return {
			xtype : 'simplecombobox',
			labelAlign : labelAlign == null ? 'left' : labelAlign,
			padding : '0 30 0 0',
			fieldLabel : lable,
			name : name,
			labelWidth : 60,
			width : '100%',
			datatype : 'combo',
			scrid : grpCd,
			autoLoad : false,
			flex : 1
		}
	},

	Datefield : function(lable, name, labelAlign) {
		return {
			xtype : 'datefield',
			labelWidth : 80,
			labelAlign : labelAlign == null ? 'left' : labelAlign,
			fieldLabel : lable,
			name : name,
			flex : 1
		}
	},

	RadioGroup : function(label, name, labelAlign, items) {
		return {
			xtype : 'radiogroup',
			labelAlign : labelAlign == null ? 'left' : labelAlign,
			width : '100%',
			fieldLabel : label,
			labelWidth : 80,
			flex : 1,
			name : name,
			items : items
		}
	},

	RadioItem : function(boxLabel, name, inputValue) {
		return {
			boxLabel : boxLabel,
			name : name,
			inputValue : inputValue
		}
	},

	Button : function(text, listeners) {
		return {
			xtype : 'button',
			text : text,
			listeners : listeners
		}
	},

	AddrFeild : function(label, name, labelAlign, listeners) {
		return {
			xtype : 'container',
			layout : 'hbox',
			width : 600,
			items : [ {
				xtype : 'textfield',
				labelAlign : labelAlign == null ? 'left' : labelAlign,
				labelWidth : 60,
				padding : '0 5 0 0',
				fieldLabel : label,
				flex : 1,
				name : name
			}, this.Button('검색', '', listeners) ]
		}
	},
	
	DataGrid : function(title, id, height, columns, store, DockedItems )	{
		return Ext.create('Ext.grid.Panel',{
			title : title,
			id : id,
			height: height == null ? 100 : height,
			columns : columns == null ? [] : columns,
			store : store == null ? [] : store,
			DockedItems : DockedItems
		})
	}, 
	
	DockedItems : function(dock, items)	{
		return {
	    	xtype: 'toolbar',
			border: false,
			margin: '0 0 5 0',
			dock: dock
		}
	}
	
});