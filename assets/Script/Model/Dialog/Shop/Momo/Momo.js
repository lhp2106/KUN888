
cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        nap:    cc.Node,
        rut:    cc.Node
    },
    init(){
        this.nap = this.nap.getComponent('momoNap');


        this.body = [this.nap];
        Promise.all(this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        }))
        .then(result => {
            this.header = result;
        });
    },
    onSelectHead: function(event, name){
        Promise.all(this.header.map(function(header) {
            if (header.node.name == name) {
                header.select();
            }else{
                header.unselect();
            }
        }));
        cc.log("onSelectHead:"+name);
        Promise.all(this.body.map(function(body) {
            if (body.node.name == name) {
                body.node.active = true;
            }else{
                body.node.active = false;
            }
        }));
    },
    onData: function(data){
        if (!!data.list) {
            this.nap.onData(data.list);
        }
    },

    copy:function(data,text){
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
});
