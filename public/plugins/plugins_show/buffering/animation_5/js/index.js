;
(function() {
    var plugin_02005 = function() {}
    plugin_02005.prototype = {
        init: function(view) {
            var template = `<div class="com-loading" x-if="buffering_data.show">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
        	var data=view.$getData().data;
        	setTimeout(function(){
        		var dom=view.querySelectorAll(".small");
        		dom.forEach(function(i,index){
        			DD.css(i,"background-color",data[view.$dataItem].color);
                    DD.css(i,"width", 2 * data[view.$dataItem].radius + 'px');
                    DD.css(i,"height", 2 * data[view.$dataItem].radius + 'px');
        			DD.css(i,"animation-delay",(data[view.$dataItem].time/5)*index+'s');
        		});
        	},0)
        }
    };
    DD.Plugin.create("plugin_02005",plugin_02005);
})();