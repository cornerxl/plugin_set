;(function(){
	var el_animation_4=function(){};
	el_animation_4.prototype={
		init:function(view){
			var template=`<div class="content">
			              <span x-repeat="my_span" class="my_span"></span>
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
	DD.Plugin.create("el-animation-4",el_animation_4);
	DD.createModule({
		name:'m_plugin_download_Animation_4',
		el:'.el-animation-4',
		data:{
			my_span:[{},{},{},{},{},{},{}],
			color:'#00bfff',
			time:0.8
		},
		onBeforeFirstRender:function(){
			var me=this;
			 if(window.data){
                if(window.data.time){
                    me.data.time=window.data.time;
                }
            }
		}
	})
})();