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
            console.log(str);
            view.innerHTML = str;
            DD.Compiler.compile(view, view.$module);
        }
    };
    DD.Plugin.create("tree", tree);
    DD.createModule({
        el: '.el-tree',
        data: {
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
        onBeforeFirstRender:function(){
            var me=this;
            me.data.one=1;
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
            check: function(e, d, v) {
                var me = this;
                d.click = !d.click;
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