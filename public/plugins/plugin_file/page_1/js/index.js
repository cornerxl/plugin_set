/**
 * 分页插件
 * 欲用此插件，必先在使用此插件的模块上有一个updatePage函数,用来点击之后刷新页面
 * page:当前页
 * to_page:输入框的数据（到第几页）
 * allpage:总共多少页
 * @return {[type]} [description]
 */
;(function() {
	var Paging = function() {};

	Paging.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-paging">
					            <span>共<span class="red">{{total}}</span>条记录</span>
					            <span>共<span class="red">{{allpage}}</span>页</span>
					            <span>当前第<span class="red">{{page}}</span>页</span>
					            <div class="to-first" x-class="{'can-not':'page==1'}">首页</div>
					            <div class="to-prev" x-class="{'can-not':'page==1'}">上一页</div>
					            <div class="to-next" x-class="{'can-not':'page==allpage'}">下一页</div>
					            <div class="to-last" x-class="{'can-not':'page==allpage'}">末页</div>
					            <span>转到:</span>
					            <input type="number" x-field="to_page">
					            <div class="go-to">GO</div>
					        </div>
					        <div class="clear"></div>
					        `;
            view.innerHTML = template;
            DD.Compiler.compile(view,view.$module);
            view.$forceRender = true;
        },
        render:function(view){
            var data=view.$getData().data;
            if(data.total && data.row) {
                data.allpage = Math.ceil(data.total /data.row);
            }
            setTimeout(function(){
                var red=[];
                var plugin=view.querySelector(".nd-plugin-paging");
                red=view.querySelectorAll(".red");
                red.forEach(function(i){
                    DD.css(i,"color",data.page_color);
                });
                DD.css(plugin,"color",data.word_color)

            },0)
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
    DD.Plugin.create('paging', Paging);
	DD.createModule({
		el: '.plugin-page',
		data: {
            page: 1,
            row: 10,
            total:0,
            to_page:1,
            allpage:0,
            //字体颜色
            word_color:"#000000",
            //页数颜色
            page_color:"#ff0000",
		},
		onFirstRender: function() {
            var me = this;
            if(window.data){
                me.data.word_color = window.data.word_color;
                me.data.page_color = window.data.page_color;
            }
        }

	})
}());