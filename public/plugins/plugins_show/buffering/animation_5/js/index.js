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
        },
        render: function(view) {
        	var data=view.$getData().data;
        	setTimeout(function(){
        		var dom=view.querySelectorAll(".small");
        		dom.forEach(function(i,index){
        			DD.css(i,"background-color",data.buffering_data.color);
                    DD.css(i,"width", 2 * data.buffering_data.radius + 'px');
                    DD.css(i,"height", 2 * data.buffering_data.radius + 'px');
        			DD.css(i,"animation-delay",(data.buffering_data.time/5)*index+'s');
        		});
        	},0)
        }
    };
    DD.Plugin.create("plugin_02005",plugin_02005);
})();