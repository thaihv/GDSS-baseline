Ext.define('Ext.custom.view.SampleGrid', {
	extend : 'Ext.grid.Panel',

	// xtype으로 사용하려면 해당 alias를 추가
	alias : 'widget.samplegrid',

	requires : [ 'Ext.data.Store' ],

	// 필요한 설정값이 있다면 config 블럭안에 추가함. 해당 값은 create시 자동적으로 setter와 getter가 만들어짐
	config : {
		type : null,
		receiptNum : null
	},

	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},

	initComponent : function() {
		var me = this;

		Ext.apply(me, {
			layout : 'fit',

			// 스토어 정의
			store : Ext.create('Ext.custom.store.SampleGridStore', {
				listeners : {

					/* 로드할 때, 파라미터값을 같이 넘기고 싶다면 해당 이벤트를 걸어준다.
					 이외에 grid.getStore().getProxy().extraParams를 정의하여 외부에서
					 스토어를 로드하는 방법도 존재. */
					'beforeload' : me.onBeforeLoadEvent,
					scope : me
				},
				storeId : 'secondGridStore',

				// 렌더링과 동시에 스토어에서 데이터를 로딩할 것인지 결정
				autoLoad : false
			}),

			// 칼럼정의
			columns : [ {
				xtype : 'rownumberer'
			}, {
				text : 'location',
				dataIndex : 'LOCATION',
				flex : 1
			}, {
				text : 'jibun',
				dataIndex : 'JIBUN'
			} ],

			// 체크박스 설정. 필요없다면 정의하지 않음.
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE'
			})

		});

		this.callParent(arguments);
	},

	onBeforeLoadEvent : function(store, operation, eOpts) {
		operation.params = {
			type : this.type,
			receiptNum : this.receiptNum
		}
	}
});