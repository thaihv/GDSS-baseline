Ext.override(Ext.form.TextField, {
	labelSeparator:''
});

Ext.override(Ext.form.RadioGroup, {
	labelSeparator:''
});

Ext.override(Ext.grid.RowNumberer, {

    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        var rowspan = this.rowspan;
        if (rowspan){
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }
        metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';        
        return store.indexOfTotal(record) + 1;
    }
});


Ext.define('my.view.form.AmountField', {
    extend: 'Ext.form.NumberField',
    alias: 'widget.my-amountfield',
    spinDownEnabled: false,
    spinUpEnabled: false,
    hideTrigger: true,
    baseChars: '0123456789.',
    decimalPrecision: 2,
    minValue: 0.1,
    maxValue: 9999999.99,
    emptyText: '0.00',
    maxLength: 12,
    enforceMaxLength: true,

    parseValue: function (value) {
        value = parseFloat(String(value).replace(this.decimalSeparator, ".").replace(/,/g, ""));
        return isNaN(value) ? '' : value;
    },

    setValue: function (v) {
        var me = this;
        console.log(v);
        v = typeof v == 'number' ? v : String(v).replace(this.decimalSeparator, ".").replace(/,/g, "");

        v = isNaN(v) ? '' : Ext.util.Format.number(this.fixPrecision(String(v)), "0,000,000.00");
        me.setRawValue(v);
        return me.callParent(v);
    }
});

function requestMessageProcessor(proxy, response) {
	if (response && proxy) {			
		try {						
			var responseData = proxy.reader.getResponseData(response);
			
			if (responseData.message) {
				var messageDescription = 'Information'; // title of the alert box
				var messageIcon = Ext.MessageBox.INFO;
				
				if (!responseData.success)
				{
					var messageDescription = 'Error';
					var messageIcon = Ext.MessageBox.ERROR;
				}else if(responseData.message != null){
					var messageDescription = 'Warning ';
					var messageIcon = Ext.MessageBox.WARNING ;
					
				}
				
				Ext.MessageBox.show({
					title: messageDescription,
					msg: responseData.message,
					buttons: Ext.MessageBox.OK,
					icon: messageIcon
				});
			}
		}
		catch(err) {
			// Malformed response most likely
			//console.log(err);
		}
	}
}; 