Ext.define('LOP.ExtCmmMsg', {
	
	Alert : function(title, Msg, fn) {
		return Ext.MessageBox.alert(title, Msg, fn);
	}
});