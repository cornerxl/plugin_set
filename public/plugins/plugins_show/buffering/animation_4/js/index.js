;(function(){
	var plugin_02004=function(){};
    plugin_02004.prototype={
		init:function(view){
			var template=`<div class="content">
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
			var color=data.color;
			var time=data.time;
			setTimeout(function(){
				var span=view.querySelectorAll(".my_span");
				span.forEach(function(i,index){
					DD.css(i,"animation-delay",index*time/4+'s');
					DD.css(i,"background-color",color);
				});
		},0);
		}
	};
	DD.Plugin.create("plugin_02004",plugin_02004);
})();