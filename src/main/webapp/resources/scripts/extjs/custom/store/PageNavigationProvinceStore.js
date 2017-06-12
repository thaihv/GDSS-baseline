Ext.define('Ext.custom.store.PageNavigationProvinceStore', {
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
            remoteSort: true,
            storeId: 'MyStoreId',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: '/land-office/wih/land_split_step1/pagination.jsp',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'totalCount'
                }
            }
        }, cfg)]);
    }
});