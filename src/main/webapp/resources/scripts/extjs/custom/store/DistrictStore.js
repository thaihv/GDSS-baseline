Ext.define('Ext.custom.store.DistrictStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelDistrict'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Ext.custom.model.ModelDistrict',
            storeId: 'DistrictStoreId',
            proxy: {
                type: 'ajax',
                url: '/land-office/wih/land_split_step1/districts.jsp',
                reader: {
                    type: 'json',
                    root: 'district'
                }
            }
        }, cfg)]);
    }
});