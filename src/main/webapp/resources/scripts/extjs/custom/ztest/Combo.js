labelWidth = '60px';
padding = '0px 60px 0px 0px';

Ext.define('web.Combo',{   
	extend: 'Ext.form.field.ComboBox',
	editable: false, 
	padding: padding,
	labelWidth: labelWidth,

    displayField: 'TITLE',
    valueField: 'DATA',
	store: [],

	config: {
		fieldLabel:'',
		GROUP_CD: ''
	},
	constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },
	initComponent : function() {
		me = this;
		this.setGROUP_CD('G1360');	
		this.store = this.addData1();
//		this.dataLoad();
//		console.log(this);
		this.callParent(arguments);
	},
	listeners: {
		'afterrender': function(){
//			this.store = this.addData1();
		},
		'select': function(){
			console.log('select');
//			this.store = this.addData1();
		}
	},
	load: function()	{
		console.log(this);
	},
	addData1 : function()	{
//		console.log("= GROUP_CD : " + this.GROUP_CD + " =============");
//		var model = Ext.create('web.store.Model',{});
//		model.fields = [
//			{name: 'DATA', type: 'string'},
//			{name: 'TITLE', type: 'string'}
//		];

		var store = Ext.create('web.store.Store',{});
//		store.setModel(model);
//		store.getProxy.url = '/land-office/common/CmmCode.do';
		store.setAutoLoad(false);
		store.reload({
			params : {
				GROUP_CD : this.GROUP_CD
			}
		});
		console.log(store);
		return store;
	}
});
	
	







