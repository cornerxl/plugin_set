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
		el:".el-icon-content",
		data:{
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
		}
	});
})()