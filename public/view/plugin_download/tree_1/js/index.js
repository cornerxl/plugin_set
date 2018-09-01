;
(function() {
    var tree = function() {};
    tree.prototype = {
        init: function(view) {
            console.log(this.__proto__);
        },
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
                var tem = `<div class="item" id="{{txt}}" x-repeat="arr" x-show="show">
                   <div class="ct">
                          <div   e-click="check" x-class="{'check':'click'}" class="input"></div>
                          <span class="txt" e-click="show">{{txt}}</span>
                   </div>\r\n`;
                arr.forEach(function(i, index, a) {
                    if (i.arr) {
                        s += me.create(i.arr);
                    }
                    tem += s;
                    s = "";
                });
                return tem + `</div>\r\n`;
            };
            var str = me.create(me.datas.arr);
            view.innerHTML = str;
            //重新编译
            DD.Compiler.compile(view, view.$module);
        }
    };
    DD.Plugin.create("tree", tree);
    DD.createModule({
        name: "m_plugin_download_Tree_1",
        requires: [{ type: 'css', path: HTMLURL + "/plugin_download/tree_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/tree_1/index.html",
        delayInit: true,
        data: {
            name: "树形组建",
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
                show: true
            }, {
                click: false,
                txt: "parent-3",
                show: true
            }, {
                click: false,
                txt: "parent-4",
                show: true
            }]
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.one = 1;
            me.data.color_1 = '#333333';
            me.data.color_2 = '#1890ff';
            me.data.arr = [{
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
                show: true
            }, {
                click: false,
                txt: "parent-3",
                show: true
            }, {
                click: false,
                txt: "parent-4",
                show: true
            }];
        },
        methods: {
            show: function(e, d, v) {
                var me = this;
                if (d.arr) {
                    d.arr.forEach(function(i) {
                        i.show = !i.show
                        // 此方法可以全部展开
                        // me.module.methodFactory.methods.show.call(me, e, i, v);
                    });
                }
            },
            check: function(e, d, v) {
                var me = this;
                d.click = !d.click;
                me.module.methodFactory.methods.checkall.call(me, d);
            },
            checkall: function(d) {
                var me = this;
                if (d.arr) {
                    d.arr.forEach(function(i) {
                        i.click = d.click;
                        if (i.arr) {
                            me.module.methodFactory.methods.checkall.call(me, i);
                        }
                    })
                }
            },
            ensure: function() {
                var me = this;
                var obj = {
                    plugin_id: 1601,
                    class0: JSON.stringify({
                        names: '.el-tree .content .ct .check',
                        total: 1,
                        color: {
                            names: 'background-color',
                            values: me.data.color_2.replace("#", "")
                        }
                    }),
                    class1: JSON.stringify({
                        names: '.el-tree .content .ct txt',
                        total: 1,
                        color: {
                            names: 'color',
                            values: me.data.color_1.replace("#", "")
                        }
                    }),
                    total: 2,
                    flag: 0
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
        }
    });
})()