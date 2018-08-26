;
(function() {
    var el_animation_5 = function() {}
    el_animation_5.prototype = {
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
    DD.Plugin.create("animation-5",el_animation_5);
    DD.createModule({
    	name:'m_plugin_download_Animation_5',
    	el:'.el-animation-5',
    	data:{
    		name:'水滴动画',
    		color:" #363636",
    		datas:{
    			show:true
    		},
    		time:2
    	},
    	onBeforeFirstRender:function(){
    		var me=this;
    		if(window.data){
    			if(window.data.color){
    				me.data.color=window.data.color;
    			}
    			if(window.data.time){
    				me.data.time=window.data.time;
    			}
    		}
    	}
    })
})()