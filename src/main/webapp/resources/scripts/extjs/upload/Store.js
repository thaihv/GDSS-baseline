Ext.define('Ext.ux.upload.Store', {
    extend : 'Ext.data.Store',

    fields : [
        {
        	name : 'filecategory',
        	type: 'string'
        },
        {
            name : 'filename',
            type : 'string'
        }, {
            name : 'filesize',
            type : 'integer'
        }, 
        /*{
            name : 'type',
            type : 'string'
        },*/
        {
        	name : 'checkvalidation',
        	type : 'string'
        },
        {
            name : 'status',
            type : 'string'
        },{
        	name: 'progress',
        	type: 'string'
        }, 
        {
            name : 'message',
            type : 'string'
        },{
        	name: 'fileid',
        	type: 'string'
        }
    ],

    proxy : {
        type : 'memory',
        reader : {
            type : 'array',
            idProperty : 'fileid'
        }
    }
});