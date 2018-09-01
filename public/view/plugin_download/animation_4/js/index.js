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
		requires: [{ type: 'css', path: HTMLURL + "/plugin_download/animation_4/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/animation_4/index.html",
		data:{
			name:"闪烁动画",
			my_span:[{},{},{},{},{},{},{}],
			color:'#00bfff',
			time:0.8
		},
		onBeforeFirstRender:function(){
			var me=this;
			me.data.color="#00bfff";
			me.data.time=0.8;
		},
		methods:{
			  ensure: function() {
                var me = this;
                if (me.data.time < 0) {
                    me.data.time = 1;
                }
                var obj = {
                    plugin_id: 904,
                    class0: JSON.stringify({
                        names: '.el-animation-4 .content span',
                        total: 1,
                        background_color: {
                            names: 'background-color',
                            values: me.data.color.replace("#","")
                        }
                    }),
                    total: 1,
                    js:JSON.stringify({
                    	time:me.data.time
                    }),
                    flag: 1,
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
		}
	})
})();