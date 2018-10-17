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
    var Paging = function() {};

    Paging.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="com-page" x-model="page">
                            <div class="com-go-pre"></div>
                            <div class="com-page-box">
                                <span class="com-page-item mar-left" x-repeat="page_rows" x-class="{'com-pre-page': 'page===pre_page'}">{{page}}</span>
                            </div>
                            <div class="com-go-next"></div>
                            <div class="com-go">
                                <span>前往</span>
                                <input type="text" x-field="go_page">
                                <span>页</span>
                                <button class="com-go-btn" >GO</button>
                            </div>
                        </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var data = view.$getData().data;
            var me = this;
            if (data.one) {
                if (data.page.all_page >= 0) {
                    // 动态修改页码数组
                    if (data.page.all_page > 7) {
                        data.page.page_rows = [];
                        for (var i = 1; i < 8; i++) {
                            if (i === 7) {
                                data.page.page_rows.push({
                                    page: '...',
                                    pre_page: data.page.pre_page
                                });
                            } else {
                                data.page.page_rows.push({
                                    page: i,
                                    pre_page: data.page.pre_page
                                })
                            }
                        }
                        data.page.page_rows.push({
                            page: data.page.all_page,
                            pre_page: data.page.pre_page
                        })
                    } else {
                        // 清空数据
                        data.page.page_rows = [];
                        for (var i = data.page.all_page; i > 0; i--) {
                            data.page.page_rows.push({
                                page: data.page.all_page - i + 1,
                                pre_page: data.page.pre_page
                            });
                        }
                    }
                }
            }
            data.one = 0;
            var module;
            if (!data.module) {
                module = view.$module;
            } else {
                module = data.module;
            }
            if (!module) {
                return;
            }
            setTimeout(function() {
                var box = [];
                box = view.querySelectorAll(".com-page-item");
                console.log(data)
                box.forEach(function(i) {
                    if(parseInt(i.innerText) === data.page.pre_page) {
                        DD.css(i, "background-color", data.color_2);
                        DD.css(i, "color", '#ffffff');
                    } else {
                        DD.css(i, "background-color", '#ffffff');
                        DD.css(i, "color", data.color_1);
                    }

                });
                /**,
                 * 修改page_rows
                 * @param pre_page   当前页
                 * @param all_page   总页数
                 */
                function changePageRows(pre_page, all_page) {
                    if (pre_page <= 6) {
                        if (all_page <= 6) {
                            data.page.page_rows = [];
                            for (var i = all_page; i > 0; i--) {
                                data.page.page_rows.push({
                                    page: all_page - i + 1,
                                    pre_page: pre_page
                                });
                            }
                        } else {
                            data.page.page_rows = [{
                                page: 1,
                                pre_page: pre_page
                            }, {
                                page: 2,
                                pre_page: pre_page
                            }, {
                                page: 3,
                                pre_page: pre_page
                            }, {
                                page: 4,
                                pre_page: pre_page
                            }, {
                                page: 5,
                                pre_page: pre_page
                            }, {
                                page: 6,
                                pre_page: pre_page
                            }, {
                                page: '...',
                                pre_page: pre_page
                            }, {
                                page: all_page,
                                pre_page: pre_page
                            }]
                        }
                    } else if (pre_page > 6 && pre_page <= all_page - 5) {
                        data.page.page_rows = [{
                            page: 1,
                            pre_page: pre_page
                        }, {
                            page: '...',
                            pre_page: pre_page
                        }, {
                            page: pre_page - 1,
                            pre_page: pre_page
                        }, {
                            page: pre_page,
                            pre_page: pre_page
                        }, {
                            page: pre_page + 1,
                            pre_page: pre_page
                        }, {
                            page: pre_page + 2,
                            pre_page: pre_page
                        }, {
                            page: '...',
                            pre_page: pre_page
                        }, {
                            page: all_page,
                            pre_page: pre_page
                        }]
                    } else if (pre_page > all_page - 5) {
                        data.page.page_rows = [{
                            page: 1,
                            pre_page: pre_page
                        }, {
                            page: '...',
                            pre_page: pre_page
                        }, {
                            page: all_page - 5,
                            pre_page: pre_page
                        }, {
                            page: all_page - 4,
                            pre_page: pre_page
                        }, {
                            page: all_page - 3,
                            pre_page: pre_page
                        }, {
                            page: all_page - 2,
                            pre_page: pre_page
                        }, {
                            page: all_page - 1,
                            pre_page: pre_page
                        }, {
                            page: all_page,
                            pre_page: pre_page
                        }];
                    }
                    data.page.$set("page_rows", data.page.page_rows);
                }
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.com-go-pre'),
                    handler: function(e, d, v) {
                        var me = this;
                        if (data.page.pre_page === 1) {
                            return;
                        }
                        data.page.pre_page--;
                        changePageRows(data.page.pre_page, data.page.all_page);
                        // 请求数据
                        // this.module.methodFactory.methods.updatePage.call(this);
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.com-go-next'),
                    handler: function(e, d, v) {
                        var me = this;
                        if (data.page.pre_page === data.page.all_page) {
                            return;
                        }
                        data.page.pre_page++;
                        changePageRows(data.page.pre_page, data.page.all_page);
                        // console.log(data);
                        // 请求数据
                        // this.module.methodFactory.methods.updatePage.call(this);
                        view.$forceRender = true;
                    }
                });
                new DD.Event({
                    eventName: 'click',
                    view: view.querySelector('.com-go-btn'),
                    handler: function(e, d, v) {
                        var me = this;

                        if (parseInt(data.page.go_page) > data.page.all_page) {
                            return;
                        }
                        data.page.pre_page = parseInt(data.page.go_page);
                        changePageRows(data.page.pre_page, data.page.all_page);
                        // 请求数据
                        // this.module.methodFactory.methods.updatePage.call(this);
                        view.$forceRender = true;
                    }
                });
                var page_arr = view.querySelectorAll('.com-page-item');
                for (let i = 0; i < page_arr.length; i++) {
                    new DD.Event({
                        eventName: 'click',
                        view: page_arr[i],
                        handler: function(e, d, v) {
                            if (d.page !== '...') {
                                data.page.pre_page = d.page;
                                changePageRows(data.page.pre_page, data.page.all_page);
                                // 请求数据
                                // this.module.methodFactory.methods.updatePage.call(this);
                                view.$forceRender = true;
                            }
                        }
                    });
                }
            }, 100)

        }
    }

    DD.Plugin.create('paging', Paging);
    DD.createModule({
        el: '.plugin-page',
        data: {
            color_1: '#999999',
            color_2: '#5eaee3',
            page: {
                pre_page: 1,
                go_page: 1,
                all_page: 16,
                page_rows: []
            },
            one: 1
        },
        onFirstRender: function() {
            var me = this;
            if(window.data){
                me.data.color_1 = window.data.color_1;
                me.data.color_2 = window.data.color_2;
            }
        }

    })
}());