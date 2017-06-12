Ext.define('LOP.ExtCmmField', {
	
	FieldSet : function(title, items) {
		return {
			title : title,
			xtype : 'fieldset',
			layout : 'anchor',
			bodyStyle : 'padding:10px',
			flex : 1,
			items : items
			
		}
	},
	
	TextField : function(lable, name, labelAlign, width) {
		return {
			xtype : 'textfield',
			id : name,
			name : name,
			labelAlign : labelAlign == null ? 'left' : labelAlign,
			padding : '0 30 0 0',
			labelWidth : 60,
			width : width == null ? '100%' : width,
			fieldLabel : lable,
			flex : 1
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
			}, Cmm.Button.Search('검색', '', listeners) ]
		}
	}
});