;(function(){
	var plugin_02004=function(){};
    plugin_02004.prototype={
		init:function(view){
			var template=`<div class="content" x-if="buffering_data.show">
			              <span class="my_span"></span>
			              <span class="my_span"></span>
			              <span class="my_span"></span>
			              <span class="my_span"></span>
			              <span class="my_span"></span>
			              </div>`;
			 view.innerHTML=template;
		},
		render:function(view){
			var me=this;
			var data=view.$getData().data;
			var color=data.buffering_data.color;
			var time=data.buffering_data.time;
            var height = parseInt(data.buffering_data.height);
            var width = parseInt(data.buffering_data.width);
			setTimeout(function(){
				var span=view.querySelectorAll(".my_span");
				var content = view.querySelector(".content");
                DD.css(content, "width", width + 'px');
				span.forEach(function(i,index){
					DD.css(i,"animation-delay",index*time/4+'s');
					DD.css(i,"background-color",color);
                    DD.css(i, "height", height + 'px');
                    DD.css(i, "width", ( 0.5 * width) / span.length + 'px');
				});
		},0);
		}
	};
	DD.Plugin.create("plugin_02004",plugin_02004);
})();