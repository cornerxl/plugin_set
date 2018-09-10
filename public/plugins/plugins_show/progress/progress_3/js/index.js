;(function(){
	plugin_11003=function(){};
    plugin_11003.prototype={
		init:function(view){
			var template=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200" viewBox="0,0,200,200">{{r1}}{{r2}}{{proR}}
				<path d="M 100,100 m0,-{{proR}} a {{proR}},{{proR}},0,1,1,0,{{2*proR}}  a {{proR}},{{proR}},0,1,1,0,{{-2*proR}}" stroke={{process_all_color}} stroke-width="10" style="fill-opacity:0;"/>
				<path d="M 100,100 m0,-{{proR}} a {{proR}},{{proR}},0,1,1,0,{{2*proR}}  a {{proR}},{{proR}},0,1,1,0,{{-2*proR}}" stroke={{process_percent_color}} stroke-width="10" style="fill-opacity:0;stroke-dasharray:{{r1}}px,{{r2}}px;stroke-dashoffset:0px;transition: stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s, stroke-width 0.06s ease 0.3s;stroke-linecap:round"/>
    		</svg>`;
    view.innerHTML=template;
		},
		render:function(view){}
	}
	DD.Plugin.create("plugin_11003",plugin_11003);
})()