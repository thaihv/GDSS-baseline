Ext.define('Ext.custom.model.ModelSubdivison', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'area',
            type: 'string'
        },
        {
            name: 'quantity',
            type: 'int'
        },
        {
            name: 'price',
            type: 'float'
        },
        {
            name: 'commission',
            type: 'float'
        },
        {
            name: 'tax',
            type: 'float'
        }
    ]
});