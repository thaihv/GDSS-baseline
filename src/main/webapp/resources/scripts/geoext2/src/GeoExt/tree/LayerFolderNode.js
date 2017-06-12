Ext.define('GeoExt.tree.LayerFolderNode', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.gx_layerfolder', 
	requires: [
        'GeoExt.tree.CustomLayerLoader'
    ],
	defaultText: 'Lớp',
	store: null,
	
	init: function(target) {
		var me = this, checked = true, layer;
		var loader = me.loader;

        me.loader = (loader && loader instanceof GeoExt.tree.CustomLayerLoader) ?
            loader : new GeoExt.tree.CustomLayerLoader(loader);
            
        target.set('container', me);
        if (!target.get('text')) {
            target.set('text', me.defaultText);
            target.commit();
        }
        me.loader.store = me.store;
        me.loader.load(target);
		target.eachChild(function(node) {
			layer = node.get('layer');
			if(!layer.getVisibility()) checked = false;
			layer.events.on({
				'visibilitychanged' : me.onChildLayerVisibilityChanged,
				scope: me
			});
		});
		target.set('checked', null);

		target.on('afteredit', function(node, modifiedFields) {
			if(~Ext.Array.indexOf(modifiedFields, 'checked')) {
				me.onCheckChange();
			}
		});

		me.target = target;
	}, 
	
	onCheckChange: function() {
		var node = this.target,
		checked = this.target.get('checked'); 

		if(!node._visibilityChanging) return;

		node._visibilityChanging = true;
		node.eachChild(function(node) {
			node.get('layer').setVisibility(checked);
		});
		delete node._visibilityChanging;
	},
	
	onChildLayerVisibilityChanged: function() {
		var node = this.target;

		if(!node._visibilityChanging) return;

		var checked = true;
		node.eachChild(function(childNode) {
			if(!childNode.get('layer').getVisibility()) checked = false;
		});
		node._visibilityChanging = true;
		node.set('checked', checked);
		delete node._visibilityChanging;
	} 
}); 