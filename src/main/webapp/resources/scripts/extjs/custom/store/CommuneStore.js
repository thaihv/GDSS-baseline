Ext.define('Ext.custom.store.CommuneStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.custom.model.ModelCommune'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            model: 'Ext.custom.model.ModelCommune',
            storeId: 'CommuneStoreId',
            proxy: {
                type: 'ajax',
                url: '/land-office/wih/land_split_step1/communes.jsp',
                reader: {
                    type: 'json',
                    root: 'commune'
                }
            }
        }, cfg)]);
    }
});
