;(function(){
	el_svg=function(){};
	el_svg.prototype={
		init:function(view){
			var template=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200" viewBox="0,0,200,200">
    	    <path d="M 100,100 m0,-{{r}} a {{r}},{{r}},0,1,1,0,{{2*r}}  a {{r}},{{r}},0,1,1,0,{{-2*r}}" stroke={{color_1}} stroke-width="10" style="fill-opacity:0;"/>
    	    <path d="M 100,100 m0,-{{r}} a {{r}},{{r}},0,1,1,0,{{2*r}}  a {{r}},{{r}},0,1,1,0,{{-2*r}}" stroke={{color_2}} stroke-width="10" style="fill-opacity:0;stroke-dasharray:{{r1}}px,{{r2}}px;stroke-dashoffset:0px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s;stroke-linecap:round"/>
    </svg>`;
    view.innerHTML=template;
		},
		render:function(view){}
	}
	DD.Plugin.create("svg-1",el_svg);
	DD.createModule({
		name:"m_plugin_download_Progress_3",
		requires: [{ type: 'css', path: HTMLURL + "/plugin_download/progress_3/css/index.css" }],
        templateUrl: HTMLURL + "/plugin_download/progress_3/index.html",
		data:{
			name:"圆环进度条",
			r:90,
			r1:'',
			r2:'',
			per:1,
			color_1:'#f5f5f5',
			color_2:'#108ee9'
		},
		onBeforeFirstRender:function(){
			var me=this;
			me.data.per=1;
			me.data.r1=me.data.r*Math.PI*2*me.data.per/10;
			me.data.r2=me.data.r*Math.PI*2;
			me.data.r=90;
			me.data.color_1='#f5f5f5';
			me.data.color_2='#108ee9'
		},
		methods:{
			add:function(){
				var me=this;
				me.data.per+=me.data.per>9?0:1;
				me.data.r1=me.data.per/10*Math.PI*2*me.data.r;
				console.log(me.data.r1);
			},
			dele:function(){
				var me=this;
				me.data.per-=me.data.per<1?0:1;
				me.data.r1=me.data.per/10*Math.PI*2*me.data.r;
			},
			ensure: function() {
                var me = this;
                var obj = {
                    plugin_id: 503,
                    total: 0,
                    js:JSON.stringify({
                    	color_1:me.data.color_1.replace("#",""),
                    	color_2:me.data.color_2.replace("#","")
                    }),
                    flag:1,
                }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            }
		}
	})
})()