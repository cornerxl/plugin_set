/**
 * Created by xll on 2018/5/10.
 *
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * pre_page:当前页
 * go_page:输入框的数据（到第几页）
 * all_page:总共多少页
 * @return {[type]} [description]
 */
;(function() {
    var plugin_10002 = function() {};

    plugin_10002.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="com-page" x-model="page">
                            <div class="com-go-pre"></div>
                            <div class="com-page-box">
                                <span class="com-page-item mar-left" x-repeat="page_rows" x-class="{'com-pre-page': 'page===pre_page'}" e-click="goPage">{{page}}</span>
                            </div>
                            <div class="com-go-next" e-click="goNext"></div>
                            <div class="com-go">
                                <span>前往</span>
                                <input type="text" x-field="go_page">
                                <span>页</span>
                                <button class="com-go-btn" e-click="goInputPage">GO</button>
                            </div>
                        </div>`;
            view.innerHTML = template;
            var data = DD.attr(view,'dataItem') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            DD.Compiler.compile(view,view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var data = view.$getData().data[view.$dataItem];
            data_rows = [];
            var me=this;
            if(!data){
                return;
            }
            var module;
            if(!data.module){
                module = view.$module;
            }else {
                module = data.module;
            }
            if(!module){
                return;
            }
            if(data.one){
            if(data.all_page >= 0) {
                // 动态修改页码数组
                if(data.all_page > 7) {
                    data.page_rows = [];
                    for(var i = 1; i < 7; i ++) {
                        if(i === 6) {
                            data.page_rows.push({
                                page: '...',
                                pre_page: data.pre_page
                            });
                        }else {
                            data.page_rows.push({
                                page: i,
                                pre_page: data.pre_page
                            })
                        }
                    }
                    data.page_rows.push({
                        page: data.all_page,
                        pre_page: data.pre_page
                    })
                }else {
                    // 清空数据
                    data.page_rows = [];
                    for(var i = data.all_page; i > 0; i --) {
                        data.page_rows.push({
                            page: data.all_page - i + 1,
                            pre_page: data.pre_page
                        });
                    }
                }
            }}
            data.one=false;
            setTimeout(function () {
                var box = view.querySelectorAll(".com-page-item");
                // box.forEach(function(i) {
                //     if(parseInt(i.innerText) === data.pre_page) {
                //         DD.css(i, "background-color", data.pre_color);
                //     } else {
                //         DD.css(i, "color", data.word_color);
                //     }
                //
                // });
                /**
                 * 修改page_rows
                 * @param pre_page   当前页
                 * @param all_page   总页数
                 */
                function changePageRows(pre_page, all_page) {
                    if(pre_page <= 6) {
                        if(all_page <= 6) {
                            data.page_rows = [];
                            for(var i = all_page; i > 0; i --) {
                                data.page_rows.push({
                                    page: all_page - i + 1,
                                    pre_page: pre_page
                                });
                            }
                        }else {
                            data.page_rows = [
                                {
                                    page: 1,
                                    pre_page: pre_page
                                },{
                                    page: 2,
                                    pre_page: pre_page
                                },{
                                    page: 3,
                                    pre_page: pre_page
                                },{
                                    page: 4,
                                    pre_page: pre_page
                                },{
                                    page: 5,
                                    pre_page: pre_page
                                },{
                                    page: 6,
                                    pre_page: pre_page
                                },{
                                    page: '...',
                                    pre_page: pre_page
                                },{
                                    page: all_page,
                                    pre_page: pre_page
                                }
                            ]
                        }
                    }else if(pre_page > 6 && pre_page <= all_page - 5) {
                        data.page_rows = [
                            {
                                page: 1,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: pre_page - 1,
                                pre_page: pre_page
                            },{
                                page: pre_page,
                                pre_page: pre_page
                            },{
                                page: pre_page + 1,
                                pre_page: pre_page
                            },{
                                page: pre_page + 2,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: all_page,
                                pre_page: pre_page
                            }
                        ]
                    }else if(pre_page > all_page - 5) {
                        data.page_rows = [
                            {
                                page: 1,
                                pre_page: pre_page
                            },{
                                page: '...',
                                pre_page: pre_page
                            },{
                                page: all_page - 5,
                                pre_page: pre_page
                            },{
                                page: all_page - 4,
                                pre_page: pre_page
                            },{
                                page: all_page - 3,
                                pre_page: pre_page
                            },{
                                page: all_page - 2,
                                pre_page: pre_page
                            },{
                                page: all_page - 1,
                                pre_page: pre_page
                            },{
                                page: all_page,
                                pre_page: pre_page
                            }
                        ];
                    }
                }
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-pre'),
                    handler:function(e,d,v){
                        var me = this;
                        if(data.pre_page === 1) {
                            return;
                        }
                        data.pre_page --;
                        changePageRows(data.pre_page, data.all_page);
                        // 请求数据
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-next'),
                    handler:function(e,d,v){
                        var me = this;
                        if(data.pre_page === data.all_page) {
                            return;
                        }
                        data.pre_page ++;
                        changePageRows(data.pre_page, data.all_page);
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.com-go-btn'),
                    handler:function(e,d,v){
                        var me = this;
                        if(parseInt(data.go_page) > data.all_page) {
                            return;
                        }
                        data.pre_page = parseInt(data.go_page);
                        changePageRows(data.pre_page, data.all_page);
                        // 请求数据
                        if(me.module.methodFactory.methods.updatePage){
                            me.module.methodFactory.methods.updatePage.call(this);
                        }
                        view.$forceRender = true;
                    }
                });
                var page_arr = view.querySelectorAll('.com-page-item');
                for(let i = 0; i < page_arr.length; i ++) {
                    new DD.Event({
                        eventName:'click',
                        view:page_arr[i],
                        handler:function(e,d,v){
                            if(d.page !== '...') {
                                data.pre_page = d.page;
                                changePageRows(data.pre_page, data.all_page);
                                if(me.module.methodFactory.methods.updatePage){
                                    me.module.methodFactory.methods.updatePage.call(this);
                                }
                                view.$forceRender = true;
                            }
                        }
                    });
                }
            },100)

        }
    }
    DD.Plugin.create('plugin_10002', plugin_10002);
}());