Ext.define('Ext.custom.store.StreetNameStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelStreetInfo'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Ext.custom.model.ModelStreetInfo',
            storeId: 'StreetModelId',
            data: [
                
            ],
            pageSize: 3,
            sorters: {
                property: 'no'
            }
        }, cfg)]);
    }
});