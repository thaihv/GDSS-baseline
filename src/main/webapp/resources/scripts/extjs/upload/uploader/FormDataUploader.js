/**
 * Uploader implementation which uses a FormData object to send files through XHR requests.
 * 
 */
Ext.define('Ext.ux.upload.uploader.FormDataUploader', {
    extend : 'Ext.ux.upload.uploader.AbstractXhrUploader',

    requires : [
        'Ext.ux.upload.data.Connection'
    ],

    method : 'POST',
    xhr : null,

    initConnection : function( extraParams) {
        var xhr = new XMLHttpRequest(),
            method = this.method,
            url = this.url;
        
        if( this.params){
        	url = Ext.urlAppend(url, Ext.urlEncode(this.params));
        }
        
        if( extraParams){
        	url = Ext.urlAppend(url, Ext.urlEncode(extraParams));        	
        }
        
        console.log( url);
        xhr.open(method, url, true);

        this.abortXhr = function() {
            this.suspendEvents();
            xhr.abort();
            this.resumeEvents();
        };

        return xhr;
    },

    uploadItem : function(item) {
        var file = item.getFileApiObject();
        item.setUploading();
        console.log( 'uploaditem start');
        console.log( file);
        var formData = new FormData();
        formData.append(file.name, file);
        
        var extraParams = {
        		fileCategory : item.getFileCategory(),
        		checkValidation : item.getCheckValidation(),
        		fileid : item.getFileid()
        };
        var xhr = this.initConnection( extraParams);

        xhr.setRequestHeader(this.filenameHeader, file.name);
        xhr.setRequestHeader(this.sizeHeader, file.filesize);
        xhr.setRequestHeader(this.typeHeader, file.type);

        var loadendhandler = Ext.Function.bind(this.onLoadEnd, this, [
                item
            ], true);

        var progresshandler = Ext.Function.bind(this.onUploadProgress, this, [
                item
            ], true);

        xhr.addEventListener('loadend', loadendhandler, true);
        xhr.upload.addEventListener("progress", progresshandler, true);

        xhr.send(formData);
    },

    /**
     * Implements {@link Ext.ux.upload.uploader.AbstractUploader#abortUpload}
     */
    abortUpload : function() {
        this.abortXhr();
    },

    /**
     * @protected
     * 
     * A placeholder for the abort procedure.
     */
    abortXhr : function() {
    },

    onLoadEnd : function(event, item) {
        var response = event.target;

        if (response.status != 200) {
            return this.onUploadFailure(response, null, item);
        }

        return this.onUploadSuccess(response, null, item);
    }
});