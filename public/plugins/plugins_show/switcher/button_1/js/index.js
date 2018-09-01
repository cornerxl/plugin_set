;(function(){
	var plugin_12004=function(){};
    plugin_12004.prototype={
		init:function(view){
			var template=`<div class="nd-plugin-list-1">
	<div x-repeat="list_one" class="list_one">{{value}}</div>
</div>
<div class="nd-plugin-list-2">
	<div x-repeat="list_two" class="list_two">
	    <div class="list_i">{{value}}</div>{{name}}
	</div>
</div>
<div class="nd-plugin-list-3">
	<div x-repeat="list_three" class="list_three">
	<div class="list_i">{{value}}</div>
	</div>
</div>`;
			view.innerHTML=template;
			view.$forceRender=true;
		},
		render:function(view){
			var data=view.$getData().data;
			var color=[];
			color.push(data.color_1);
			color.push(data.color_2);
			color.push(data.color_3);
			setTimeout(function(){
				var dom=view.querySelectorAll(".list_one");
				var dom2=view.querySelectorAll(".list_two");
				var dom3=view.querySelectorAll(".list_three");
				dom.forEach(function(i,index,arr){
					DD.css(i,"background-color",color[index]);
					new DD.Event({
						view:i,
						eventName:'mouseenter',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color.substr(0,color.length-1);
							color=color.substr(0,color.length-1)+',0.5)';
							DD.css(v,"background-color",color);
						  }
						});
					new DD.Event({
						view:i,
						eventName:'mouseleave',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color=color.substr(0,color.length-6)+')';
							DD.css(v,"background-color",color)
						  }
						});
					});
				dom2.forEach(function(i,index,arr){
					DD.css(i,"background-color",color[index]);
					new DD.Event({
						view:i,
						eventName:'mouseenter',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color.substr(0,color.length-1);
							color=color.substr(0,color.length-1)+',0.5)';
							DD.css(v,"background-color",color);
						  }
						});
					new DD.Event({
						view:i,
						eventName:'mouseleave',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color=color.substr(0,color.length-6)+')';
							DD.css(v,"background-color",color)
						  }
						});
					});
				dom3.forEach(function(i,index,arr){
					DD.css(i,"background-color",color[index]);
					new DD.Event({
						view:i,
						eventName:'mouseenter',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color.substr(0,color.length-1);
							//0.5这里可以调整哦
							color=color.substr(0,color.length-1)+',0.5)';
							DD.css(v,"background-color",color);
						  }
						});
					new DD.Event({
						view:i,
						eventName:'mouseleave',
						handler:function(e,d,v){
							var color=DD.css(v,"background-color");
							color=color.substr(0,color.length-6)+')';
							DD.css(v,"background-color",color)
						  }
						});
					});

			},0);
		}
	};
	DD.Plugin.create("plugin_12004",plugin_12004);
})()