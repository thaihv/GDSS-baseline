Ext.define('GeoExt.tree.CustomLayerLoader', {
    extend: 'Ext.util.Observable',
    requires: [
        'GeoExt.tree.LayerNode'
    ],

    store: null,

    filter: function(record) {
        return record.displayInLayerSwitcher === true;
    },
    
	baseAttrs: null,

	load: function(node) {
        if (this.fireEvent("beforeload", this, node)) {
            this.removeStoreHandlers();
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }

            for(var i=0;i<this.store.length;i++){
            	this.addLayerNode(node, this.store[i]);
            }
            
            this.addStoreHandlers(node);

            this.fireEvent("load", this, node);
        }
    },

    onStoreAdd: function(store, records, index, node) {
        if (!this._reordering) {
            var nodeIndex = node.get('container')
                .recordIndexToNodeIndex(index+records.length-1, node);
            for (var i=0, ii=records.length; i<ii; ++i) {
                this.addLayerNode(node, records[i], nodeIndex);
            }
        }
    },

    onStoreRemove: function(layerRecord, node) {
        if (!this._reordering) {
            this.removeLayerNode(node, layerRecord);
        }
    },
    
    addLayerNode: function(node, layerRecord, index) {
        index = index || 0;
        if (this.filter(layerRecord) === true) {
            var layer = layerRecord;
            var child = this.createNode({
                plugins: [{
                    ptype: 'gx_layer'
                }],
                layer: layer,
                text: layer.name,
                listeners: {
                    move: this.onChildMove,
                    scope: this
                }
            });
            if (index !== undefined) {
                node.insertChild(index, child);
            } else {
                node.appendChild(child);
            }
            node.getChildAt(index).on("move", this.onChildMove, this);
        }
    },

	removeLayerNode: function(node, layerRecord) {
        if (this.filter(layerRecord) === true) {
            var child = node.findChildBy(function(node) {
                return node.get('layer') == layerRecord.getLayer();
            });
            if (child) {
                child.un("move", this.onChildMove, this);
                child.remove();
            }
        }
    },

	onChildMove: function(node, oldParent, newParent, index) {
        var me = this,
            record = me.store.getByLayer(node.get('layer')),
            container = newParent.get('container'),
            parentLoader = container.loader;

        me._reordering = true;
        if (parentLoader instanceof me.self && me.store === parentLoader.store) {
            parentLoader._reordering = true;
            me.store.remove(record);
            var newRecordIndex;
            if (newParent.childNodes.length > 1) {
                var searchIndex = (index === 0) ? index + 1 : index - 1;
                newRecordIndex = me.store.findBy(function(r) {
                    return newParent.childNodes[searchIndex]
                        .get('layer') === r.getLayer();
                });
                if (index === 0) {
                    newRecordIndex++;
                }
            } else if (oldParent.parentNode === newParent.parentNode) {
                var prev = newParent;
                do {
                    prev = prev.previousSibling;
                } while (prev &&
                    !(prev.get('container') instanceof container.self &&
                    prev.lastChild));
                if (prev) {
                    newRecordIndex = me.store.findBy(function(r) {
                        return prev.lastChild.get('layer') === r.getLayer();
                    });
                } else {
                    var next = newParent;
                    do {
                        next = next.nextSibling;
                    } while (next &&
                        !(next.get('container') instanceof container.self &&
                        next.firstChild));
                    if (next) {
                        newRecordIndex = me.store.findBy(function(r) {
                            return next.firstChild.get('layer') === r.getLayer();
                        });
                    }
                    newRecordIndex++;
                }
            }
            if (newRecordIndex !== undefined) {
                me.store.insert(newRecordIndex, [record]);
            } else {
                me.store.insert(oldRecordIndex, [record]);
            }
            delete parentLoader._reordering;
        }
        delete me._reordering;
    },

    addStoreHandlers: function(node) {
        if (!this._storeHandlers) {
            this._storeHandlers = {
                "add": function(store, layerRecords, index) {
                    this.onStoreAdd(store, layerRecords, index, node);
                },
                "remove": function(parent, removedRecord) {
                    this.onStoreRemove(removedRecord, node);
                }
            };
            /*for (var evt in this._storeHandlers) {
                this.store.on(evt, this._storeHandlers[evt], this);
            }*/
        }
    },

    removeStoreHandlers: function() {
        if (this._storeHandlers) {
            for (var evt in this._storeHandlers) {
                this.store.un(evt, this._storeHandlers[evt], this);
            }
            delete this._storeHandlers;
        }
    },

    createNode: function(attr) {
        if (this.baseAttrs){
            Ext.apply(attr, this.baseAttrs);
        }

        return attr;
    },

    destroy: function() {
        this.removeStoreHandlers();
    }
});
