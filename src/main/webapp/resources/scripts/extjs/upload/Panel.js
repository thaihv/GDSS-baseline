/**
 * The main upload panel, which ties all the functionality together.
 * 
 * In the most basic case you need just to set the upload URL:
 * 
 *     @example
 *     var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
 *         uploaderOptions: {
 *             url: '/api/upload'
 *         }
 *     });
 *     
 * It uses the default ExtJsUploader to perform the actual upload. If you want to use another uploade, for
 * example the FormDataUploader, you can pass the name of the class:
 * 
 *     @example
 *     var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
 *         uploader: 'Ext.ux.upload.uploader.FormDataUploader',
 *         uploaderOptions: {
 *             url: '/api/upload',
 *             timeout: 120*1000
 *         }
 *     });
 *     
 * Or event an instance of the uploader:
 * 
 *     @example
 *     var formDataUploader = Ext.create('Ext.ux.upload.uploader.FormDataUploader', {
 *         url: '/api/upload'
 *     });
 *     
 *     var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
 *         uploader: formDataUploader
 *     });
 * 
 */
Ext.define('Ext.ux.upload.Panel', {
    extend : 'Ext.panel.Panel',

    requires : [
        'Ext.ux.upload.ItemGridPanel',
        'Ext.ux.upload.Manager',
        'Ext.ux.upload.StatusBar',
        'Ext.ux.upload.BrowseButton',
        'Ext.ux.upload.Queue'
    ],

    config : {

        /**
         * @cfg {Object/String}
         * 
         * The name of the uploader class or the uploader object itself. If not set, the default uploader will
         * be used.
         */
        uploader : null,

        /**
         * @cfg {Object}
         * 
         * Configuration object for the uploader. Configuration options included in this object override the
         * options 'uploadUrl', 'uploadParams', 'uploadExtraHeaders', 'uploadTimeout'.
         */
        uploaderOptions : null,

        /**
         * @cfg {boolean} [synchronous=false]
         * 
         * If true, all files are uploaded in a sequence, otherwise files are uploaded simultaneously (asynchronously).
         */
        synchronous : true,

        /**
         * @cfg {String} uploadUrl
         * 
         * The URL to upload files to. Not required if configured uploader instance is passed to this panel.
         */
        uploadUrl : '',

        /**
         * @cfg {Object}
         * 
         * Params passed to the uploader object and sent along with the request. It depends on the implementation of the
         * uploader object, for example if the {@link Ext.ux.upload.uploader.ExtJsUploader} is used, the params are sent
         * as GET params.
         */
        uploadParams : {},

        /**
         * @cfg {Object}
         * 
         * Extra HTTP headers to be added to the HTTP request uploading the file.
         */
        uploadExtraHeaders : {},

        /**
         * @cfg {Number} [uploadTimeout=6000]
         * 
         * The time after the upload request times out - in miliseconds.
         */
        uploadTimeout : 60000,

        // strings
        textOk : 'OK',
        textUpload : 'Upload',
        textBrowse : 'Browse',
        textAbort : 'Abort',
        textRemoveSelected : 'Remove selected',
        textRemoveAll : 'Remove all',
        
        //moon9 custom strings

        // grid strings
        textFilename : 'Filename',
        textSize : 'Size',
        textType : 'Type',
        textStatus : 'Status',
        textProgress : '%',
		
        //m00n9 custom grid strings
        
        
        // status toolbar strings
        selectionMessageText : 'Selected {0} file(s), {1}',
        uploadMessageText : 'Upload progress {0}% ({1} of {2} souborů)',

        // browse button
        buttonText : 'Browse...',
        
        arFileCategoryStore : null,
        selectCategoryValue :'1'
        
    },

    /**
     * @property {Ext.ux.upload.Queue}
     * @private
     */
    queue : null,

    /**
     * @property {Ext.ux.upload.ItemGridPanel}
     * @private
     */
    grid : null,

    /**
     * @property {Ext.ux.upload.Manager}
     * @private
     */
    uploadManager : null,

    /**
     * @property {Ext.ux.upload.StatusBar}
     * @private
     */
    statusBar : null,

    /**
     * @property {Ext.ux.upload.BrowseButton}
     * @private
     */
    browseButton : null,
	
    itemid: 'mpanel',
    
    isReadOnly: false,
    /**
     * Constructor.
     */
    constructor : function(config) {
        this.initConfig(config);
        return this.callParent(arguments);
    },

    /**
     * @private
     */
    initComponent : function() {

        this.addEvents({
            /**
             * @event
             * 
             * Fired when all files has been processed.
             * 
             * @param {Ext.ux.upload.Panel} panel
             * @param {Ext.ux.upload.Manager} manager
             * @param {Ext.ux.upload.Item[]} items
             * @param {number} errorCount
             */
            'uploadcomplete' : true
        });

        this.queue = this.initQueue();

        this.grid = Ext.create('Ext.ux.upload.ItemGridPanel', {
            queue : this.queue,
            textFilename : this.textFilename,
            textSize : this.textSize,
            textType : this.textType,
            textStatus : this.textStatus,
            textProgress : this.textProgress,
            itemid: 'itemgridPanel'
        });

        this.uploadManager = this.createUploadManager();

        this.uploadManager.on('uploadcomplete', this.onUploadComplete, this);
        this.uploadManager.on('itemuploadsuccess', this.onItemUploadSuccess, this);
        this.uploadManager.on('itemuploadfailure', this.onItemUploadFailure, this);

        this.statusBar = Ext.create('Ext.ux.upload.StatusBar', {
            dock : 'bottom',
            selectionMessageText : this.selectionMessageText,
            uploadMessageText : this.uploadMessageText
        });

        Ext.apply(this, {
            title : this.dialogTitle,
            autoScroll : true,
            layout : 'fit',
            uploading : false,
            items : [
                this.grid
            ],
            dockedItems : [
                this.getTopToolbarConfig(), this.statusBar
            ]
        });

        this.on('afterrender', function() {
            this.stateInit();
        }, this);

        this.callParent(arguments);
    },

    createUploadManager : function() {
        var uploaderOptions = this.getUploaderOptions() || {};

        Ext.applyIf(uploaderOptions, {
            url : this.uploadUrl,
            params : this.uploadParams,
            extraHeaders : this.uploadExtraHeaders,
            timeout : this.uploadTimeout
        });

        var uploadManager = Ext.create('Ext.ux.upload.Manager', {
            uploader : this.uploader,
            uploaderOptions : uploaderOptions,
            synchronous: this.getSynchronous()
        });

        return uploadManager;
    },

    /**
     * @private
     * 
     * Returns the config object for the top toolbar.
     * 
     * @return {Array}
     */
    getTopToolbarConfig : function() {

        this.browseButton = Ext.create('Ext.ux.upload.BrowseButton', {
            id : 'button_browse',
            buttonText : this.buttonText
        });
        this.browseButton.on('fileselected', this.onFileSelection, this);

        return {
            xtype : 'toolbar',
            dock : 'top',
            items : [
                this.browseButton,
                '-',
                {
                    id : 'button_upload',
                    text : this.textUpload,
                    iconCls : 'ux-mu-icon-action-upload',
                    scope : this,
                    handler : this.onInitUpload
                },
                '-',
                {
                    id : 'button_abort',
                    text : this.textAbort,
                    iconCls : 'ux-mu-icon-action-abort',
                    scope : this,
                    handler : this.onAbortUpload,
                    disabled : true
                },
                '-',
                {
                	xtype: 'combobox',
                	store: this.arFileCategoryStore,
                	fieldLabel: 'category',
        		    labelAlign: 'right',
        		    displayField: 'categoryDisplay',
        		    valueField: 'categoryValue',
        		    itemid: 'fileCategoryField',
        		    labelWidth: 50,
        		    value:this.selectCategoryValue,
        		    listeners: {
        		        //afterrender: this.setDefaultComboValue
        		    }
                },
                '-',
                {
                	xtype: 'checkbox',
                	boxLabel: 'check validation',
                	itemid: 'checkValidationField'
                },{
					xtype: 'filedownloader',
					itemid: 'filedownloader',
					hidden: true,
					hideable: false
				},
                
                '->',
                {
                    id : 'button_remove_selected',
                    text : this.textRemoveSelected,
                    iconCls : 'ux-mu-icon-action-remove',
                    scope : this,
                    handler : this.onMultipleRemove
                },
                '-',
                {
                    id : 'button_remove_all',
                    text : this.textRemoveAll,
                    iconCls : 'ux-mu-icon-action-remove',
                    scope : this,
                    handler : this.onRemoveAll
                }
            ]
        }
    },

    /**
     * @private
     * 
     * Initializes and returns the queue object.
     * 
     * @return {Ext.ux.upload.Queue}
     */
    initQueue : function() {
        var queue = Ext.create('Ext.ux.upload.Queue');

        queue.on('queuechange', this.onQueueChange, this);

        return queue;
    },

    onInitUpload : function() {
        if (!this.queue.getCount()) {
            return;
        }

        this.stateUpload();
        this.startUpload();
    },

    onAbortUpload : function() {
        this.uploadManager.abortUpload();
        this.finishUpload();
        this.switchState();
    },

    onUploadComplete : function(manager, queue, errorCount) {
        this.finishUpload();
        this.stateInit();
        this.fireEvent('uploadcomplete', this, manager, queue.getUploadedItems(), errorCount);
        manager.resetUpload();
    },

    /**
     * @private
     * 
     * Executes after files has been selected for upload through the "Browse" button. Updates the upload queue with the
     * new files.
     * 
     * @param {Ext.ux.upload.BrowseButton} input
     * @param {FileList} files
     */
    onFileSelection : function(input, files) {
    	var fileCategoryValue = Ext.ComponentQuery.query('combobox[itemid=fileCategoryField]')[0].getValue();
    	var checkValidationValue = Ext.ComponentQuery.query('checkbox[itemid=checkValidationField]')[0].getValue();
    	console.log( '[categoryValue : ' + fileCategoryValue + '] [checkValidationValue : ' + checkValidationValue);
    	var i;
    	var num = files.length;

    	if( num){
    		for( i=0; i<num; i++){
    			files[i].filecategory = fileCategoryValue;
    			files[i].checkvalidation = checkValidationValue;
    			files[i].filesize = files[i].size;
    			files[i].fileid = '1111111111' + this.getRandomNumber(5);
    			console.log( 'fielid : ' + files[i].fileid);
    		}
    	}
    	
        //this.queue.clearUploadedItems();
        
        this.queue.addFiles(files);
        
        this.browseButton.reset();
    },

    /**
     * @private
     * 
     * Executes if there is a change in the queue. Updates the related components (grid, toolbar).
     * 
     * @param {Ext.ux.upload.Queue} queue
     */
    onQueueChange : function(queue) {
        this.updateStatusBar();
		
        if( this.isViewMode()){
    		this.setButtonviewMode();
    	}
    	else if( queue.getFirstReadyItem() == null){
			this.stateInit();
		}else{
			this.switchState();
		}        
    },

    /**
     * @private
     * 
     * Executes upon hitting the "multiple remove" button. Removes all selected items from the queue.
     */
    onMultipleRemove : function() {
        var records = this.grid.getSelectedRecords();
        console.log( 'onMultipleRemove start--------------------------------');
        
        if (!records.length) {
            return;
        }
		
		
        var keys = [];
        var i;
        var num = records.length;

        for (i = 0; i < num; i++) {
            keys.push(records[i].get('fileid'));
        }
        this.queue.removeItemsByKey(keys);
        console.log( 'onMultipleRemove end--------------------------------');
    },

    onRemoveAll : function() {
        this.queue.clearItems();
    },

    onItemUploadSuccess : function(manager, item, info) {

    },

    onItemUploadFailure : function(manager, item, info) {

    },

    startUpload : function() {
        this.uploading = true;
        this.uploadManager.uploadQueue(this.queue);
    },

    finishUpload : function() {
        this.uploading = false;
    },

    isUploadActive : function() {
        return this.uploading;
    },

    updateStatusBar : function() {
        if (!this.statusBar) {
            return;
        }

        var numFiles = this.queue.getCount();

        this.statusBar.setSelectionMessage(this.queue.getCount(), this.queue.getTotalBytes());
    },

    getButton : function(id) {
        return Ext.ComponentMgr.get(id);
    },

    switchButtons : function(info) {
        var id;
        for (id in info) {
            this.switchButton(id, info[id]);
        }
    },

    switchButton : function(id, on) {
        var button = this.getButton(id);

        if (button) {
            if (on) {
                button.enable();
            } else {
                button.disable();
            }
        }
    },

    switchState : function() {
    	if (this.uploading) {
            this.stateUpload();
        } else if (this.queue.getCount()) {
            this.stateQueue();
        } else {
            this.stateInit();
        }
    },
	
    stateInit : function() {
        this.switchButtons({
            'button_browse' : 1,
            'button_upload' : 0,
            'button_abort' : 0,
            'button_remove_all' : 1,
            'button_remove_selected' : 1
        });
    },

    stateQueue : function() {
        this.switchButtons({
            'button_browse' : 1,
            'button_upload' : 1,
            'button_abort' : 0,
            'button_remove_all' : 1,
            'button_remove_selected' : 1
        });
    },

    stateUpload : function() {
        this.switchButtons({
            'button_browse' : 0,
            'button_upload' : 0,
            'button_abort' : 1,
            'button_remove_all' : 1,
            'button_remove_selected' : 1
        });
    },
    
    setButtonviewMode: function(){
    	this.switchButtons({
            'button_browse' : 0,
            'button_upload' : 0,
            'button_abort' : 0,
            'button_remove_all' : 0,
            'button_remove_selected' : 0
        });
    	this.setFieldReadOnly();
    },
    
    setFieldReadOnly : function(){    	
    	Ext.ComponentQuery.query('combobox[itemid=fileCategoryField]')[0].setReadOnly( true);
    	Ext.ComponentQuery.query('checkbox[itemid=checkValidationField]')[0].setReadOnly( true);
    },
    setViewMode: function( input){
    	this.isReadOnly = input;
    },
    
    isViewMode: function(){
    	return this.isReadOnly;
    },
    
    setDefaultComboValue : function(combo) {
        var recordSelected = combo.getStore().getAt(0);
        console.log( '---setDefaultComboValue-----');
        console.log( recordSelected);
        combo.setValue(recordSelected.get('categoryValue'));
    },
    
    getRandomNumber : function( size){
    	return Math.floor(Math.random() * (Math.pow(10,size)));
    }

});