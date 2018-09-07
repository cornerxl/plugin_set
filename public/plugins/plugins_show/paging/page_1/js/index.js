/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	var plugin_10001 = function() {};

    plugin_10001.prototype = {
		init: function(view) {
			var me = this;
			var template = `<div class="nd-plugin-paging">
					            <span>共<span class="red total">{{total}}</span>条记录</span>
					            <span>共<span class="red allpage">{{allpage}}</span>页</span>
					            <span>当前第<span class="red page">{{page}}</span>页</span>
					            <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
					            <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
					            <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
					            <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
					            <span>转到:</span>
					            <input type="number" x-field="to_page">
					            <div class="go-to">GO</div>
					        </div>`;
			view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
		},
		render:function(view){
			var data = view.$getData().data;
            if(data.total && data.row) {
                data.allpage = Math.ceil(data.total /data.row);
            }
            setTimeout(delayRender, 0);
            function delayRender() {
            	var red = document.querySelectorAll('.red');
            	red.forEach(function (item) {
					DD.css(item, 'color', data.page_color);
                })
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-first'),
                    handler:function(e,d,v){
                        if(this.data.page!==1){
                            this.data.page = 1;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-last'),
                    handler:function(e,d,v){
                        if(this.data.page!==this.data.allpage){
                            this.data.page = this.data.allpage;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-prev'),
                    handler:function(e,d,v){
                        if(this.data.page>1){
                            this.data.page--;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.to-next'),
                    handler:function(e,d,v){
                        if(this.data.page<this.data.allpage){
                            this.data.page++;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
                new DD.Event({
                    eventName:'click',
                    view:view.querySelector('.go-to'),
                    handler:function(e,d,v){
                        if(this.data.page !== this.data.to_page&&
                            this.data.to_page>=1&&
                            this.data.to_page<=this.data.allpage){
                            this.data.page = this.data.to_page;
                            this.module.methodFactory.methods.updatePage.call(this);
                        }
                    }
                });
            }

		}
	}
    DD.Plugin.create('plugin_10001', plugin_10001);
}());