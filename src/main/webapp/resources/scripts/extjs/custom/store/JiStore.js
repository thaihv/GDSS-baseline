Ext.define('Ext.custom.store.JiStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelJi'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Ext.custom.model.ModelJi',
            storeId: 'JiStoreId',
            data: [
                
            ],
            sorters: {
                property: 'code'
            }
        }, cfg)]);
    }
});