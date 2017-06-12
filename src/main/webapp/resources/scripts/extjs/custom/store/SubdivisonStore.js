Ext.define('Ext.custom.store.SubdivisonStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelSubdivison'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'Ext.custom.model.ModelSubdivison',
            storeId: 'SubdivisionStoreId',
            data: [
                
            ]
        }, cfg)]);
    }
});