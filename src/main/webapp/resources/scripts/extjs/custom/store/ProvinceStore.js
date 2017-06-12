Ext.define('Ext.custom.store.ProvinceStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelProvince'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Ext.custom.model.ModelProvince',
            storeId: 'ProvinceStoreId',
            proxy: {
                type: 'ajax',
                url: '/land-office/wih/land_split_step1/provinces.jsp',
                reader: {
                    type: 'json',
                    root: 'province'
                }
            }
        }, cfg)]);
    }
});