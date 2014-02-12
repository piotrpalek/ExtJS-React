Ext.define('Ws.react.Cmp', {
    extend: 'Ext.Component',
    reactCached: null,
    initComponent: function() {
        if(Ext.isObject(this.react)){
            this.reactCached = React.createClass(this.react);
            this.mon(this, 'render', this.renderReact, this);
            this.mon(this, 'beforedestroy', this.destroyReact, this);
        }
        this.callParent(arguments);
    },
    renderReact: function () {
        var target = this.getEl();
        React.renderComponent(this.reactCached(), target.dom);
    },
    destroyReact: function () {
        React.unmountComponentAtNode(this.getEl());
    }
});