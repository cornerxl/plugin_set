;(function(){
	var Icon_base=function(){};
	Icon_base.prototype={
		init:function(view){
			var me=this;
			var template=`<div class="Icon-content">
	<div x-repeat="font" class="arr">
		<div class="Icon">{{font}}</div>
		<p>{{font}}</p>
	</div>
</div>`;
			view.innerHTML=template;
			view.$forceRender=true;
		},
		render:function(view){
		}
	};
	DD.Plugin.create("Icon-base",Icon_base);
	DD.createModule({
		name:"m_plugin_download_Icon_1",
		requires: [{ type: 'css', path: HTMLURL + "/plugin_download/icon_1/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/icon_1/index.html",
		data:{
			name:"图标列表",
			font:[]
		},
		onBeforeFirstRender:function(){
			var me=this;
			DD.request({
				params:{name:'font'},
				rand:true,
				url: "http://localhost:3000/api/json?",
				successFunc:function(r){
					var result=JSON.parse(r);
					me.data.$set("font",result.font.font);
				}
			});
		},
		methods:{
			 ensure: function() {
                var me = this;
                var obj = {
                    plugin_id: 1401,
                    total: 0,
                    flag:0
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
		}
	});
})()