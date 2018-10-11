;
(function() {
    var tree = function() {};
    tree.prototype = {
        init: function(view) {},
        render: function(view) {
            var me = this;
            me.datas = view.$getData().data;
            if (!me.datas.one) {
                return;
            }
            me.datas.one = 0;
            //递归方法创建无限树
            me.create = function(arr) {
                var s = "";
                var tem = `  <div class="item" id="{{txt}}" x-repeat="arr" x-show="show">
                   <div class="ct">
                          <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
                          <span class="txt" e-click="show">{{txt}}</span>
                   </div>\r\n`;
                var arrd = [];
                var count = 0;
                arr.forEach(function(i, index, a) {
                    if (i.arr) {
                        arrd[count] = me.create(i.arr);
                        count += 1;
                    }
                });
                var length = 0;
                var max = "\r\n";
                arrd.forEach(i => {
                    if (i.length > length) {
                        max = i;
                        length = i.length;
                    }
                });
                return tem + max + `</div>\r\n`;
            };
            var str = me.create(me.datas.arr) + `</div>`;
            view.innerHTML = str;
            view.$forceRender = true;
            console.log(str);
            //重新编译
            DD.Compiler.compile(view, view.$module);
        }
    };
    DD.Plugin.create("tree", tree);
    DD.createModule({
        name: "m_plugin_download_Tree_1",
        requires: [{
            type: 'css',
            path: HTMLURL + "/plugin_download/tree_1/css/index.css"
        }],
        templateUrl: HTMLURL + "/plugin_download/tree_1/index.html",
        delayInit: true,
        data: {
            name: "树形组件",
            tree_data: {
                color_1: '#333333',
                color_2: '#1890ff',
                one: 1,
                arr: [{
                    click: false,
                    txt: "parent-1",
                    show: true,
                    arr: [{
                        click: false,
                        txt: "child-1",
                        show: false,
                        arr: [{
                            click: false,
                            txt: "child-1-1",
                            show: false
                        }, {
                            click: false,
                            txt: "child-1-2",
                            show: false
                        }]
                    }, {
                        click: false,
                        txt: "child-2",
                        show: false
                    }, {
                        click: false,
                        txt: "child-3",
                        show: false
                    }, {
                        click: false,
                        txt: "child-4",
                        show: false
                    }]
                }, {
                    click: false,
                    txt: "parent-2",
                    show: false,
                }, {
                    click: false,
                    txt: "parent-3",
                    show: true
                }, {
                    click: false,
                    txt: "parent-4",
                    show: true
                }]
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.tree_data = {
                color_1: '#333333',
                color_2: '#1890ff',
                one: 1,
                arr: [{
                    click: false,
                    txt: "parent-1",
                    show: true,
                    arr: [{
                        click: false,
                        txt: "child-1",
                        show: false,
                        arr: [{
                            click: false,
                            txt: "child-1-1",
                            show: false
                        }, {
                            click: false,
                            txt: "child-1-2",
                            show: false
                        }]
                    }, {
                        click: false,
                        txt: "child-2",
                        show: false
                    }, {
                        click: false,
                        txt: "child-3",
                        show: false
                    }, {
                        click: false,
                        txt: "child-4",
                        show: false
                    }]
                }, {
                    click: false,
                    txt: "parent-2",
                    show: true,
                    arr: [{
                        click: false,
                        txt: "child-1",
                        show: false,
                        arr: [{
                            click: false,
                            txt: "child-1-1",
                            show: false,
                            arr:[{
                                click: false,
                                txt: "child-1-1-1",
                                show: false
                            }, {
                                click: false,
                                txt: "child-1-1-2",
                                show: false
                            }]
                        }, {
                            click: false,
                            txt: "child-1-2",
                            show: false
                        }]
                    }, {
                        click: false,
                        txt: "child-2",
                        show: false
                    }, {
                        click: false,
                        txt: "child-3",
                        show: false
                    }, {
                        click: false,
                        txt: "child-4",
                        show: false
                    }]
                }, {
                    click: false,
                    txt: "parent-3",
                    show: true
                }, {
                    click: false,
                    txt: "parent-4",
                    show: true
                }]
            }
        },
        methods: {
            show: function(e, d, v) {
                var me = this;
                if (d.arr) {
                    d.arr.forEach(function(i) {
                        i.show = !i.show
                        //可以全部展开 此方法
                        // me.module.methodFactory.methods.show.call(me, e, i, v);
                    });
                }
            },
            sendPro: function(txt, data) {
                var me = this;
                var tem = null;
                data.forEach(i => {
                    if (i.arr) {
                        i.arr.forEach(it => {
                            if (it.txt === txt)
                                tem = i;
                            if (!tem) {
                                tem = me.module.methodFactory.methods.sendPro.call(me, txt, i.arr);
                            }
                        });
                    }
                });
                return tem;
            },
            check: function(e, d, v) {
                var me = this;
                d.click = !d.click;
                if (!d.click&& d.txt.indexOf("parent") === -1) {
                    parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.arr);
                    if (parent) {
                        parent.click = false;
                    }
                }
                if (d.click&& d.txt.indexOf("parent") === -1) {
                    parent = me.module.methodFactory.methods.sendPro.call(me, d.txt, me.data.arr);
                    if (parent) {
                        if(parent.arr.every(function(i){
                            return i.click;
                        })){
                            parent.click=true;
                        }
                    }
                }
                me.module.methodFactory.methods.checkall.call(me, d);
            },
            checkall: function(d) {
                var me = this;
                // d.click=!d.click;
                if (d.arr) {
                    d.arr.forEach(function(i) {
                        i.click = d.click;
                        if (i.arr) {
                            me.module.methodFactory.methods.checkall.call(me, i);
                        }

                    })
                }
            }
        }
    });
})()