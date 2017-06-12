Ext.define("Ext.ux.editor.CKEditor", {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.ckeditor',

    constructor : function() {
    	this.callParent(arguments);//Must first construct the superclass object
    	this.addEvents("instanceReady");//Register a instanceReady event
    },
    
    initComponent: function () {
        this.callParent(arguments);
        this.on("afterrender", function(){
            Ext.apply(this.CKConfig, {
               height : this.getHeight(),
               width : this.getWidth()
            });
            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editor.name = this.name;//The name property assignment allocation in the name property for a CKEditor
            this.editor.on("instanceReady", function(){
                this.fireEvent("instanceReady", this, this.editor);//Trigger the instanceReady event
            }, this);
        }, this);
    },
    onRender: function (ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments)
    },
    setValue: function (value) {
        this.callParent(arguments);
        if (this.editor) {
            this.editor.setData(value);
        }
    },
    getRawValue: function () {//To override the getRawValue method, otherwise it will not get to the value
        if (this.editor) {
            return this.editor.getData();
        } else {
            return ''
        }
    },
    getValue: function () {
        return this.getRawValue();
    }
});