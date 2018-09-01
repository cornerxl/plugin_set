;
(function() {
    var plugin_02005 = function() {}
    plugin_02005.prototype = {
        init: function(view) {
            var template = `<div class="com-loading" x-if="datas.show">
        <div class="spinner">
            <div class="bounce1 small"></div>
            <div class="bounce2 small"></div>
            <div class="bounce3 small"></div>
        </div>
    </div>`;
            view.innerHTML = template;
        },
        render: function(view) {
        	var data=view.$getData().data;
        	setTimeout(function(){
        		var dom=view.querySelectorAll(".small");
        		dom.forEach(function(i,index){
        			DD.css(i,"background-color",data.color);
        			DD.css(i,"animation-delay",(data.time/5)*index+'s');
        		});
        	},0)
        }
    };
    DD.Plugin.create("plugin_02005",plugin_02005);
})();