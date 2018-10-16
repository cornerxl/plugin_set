;(function(){
	var Loading=function(){};
    Loading.prototype={
        init: function(view) {
            var template = `<div class="content">
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
                              <span class="my_span"></span>
			              </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            var color = data.color;
            var time = data.time;
            var height = parseInt(data.height);
            var width = parseInt(data.width);
            setTimeout(function() {
                var span = view.querySelectorAll(".my_span");
                var content = view.querySelector(".content");
                DD.css(content, "width", width + 'px');
                span.forEach(function(i, index) {
                    DD.css(i, "animation-delay", index * time / 4 + 's');
                    DD.css(i, "background-color", color);
                    DD.css(i, "height", height + 'px');
                    DD.css(i, "width", ( 0.5 * width) / span.length + 'px');
                });
            }, 0);
        }
	};
	DD.Plugin.create("loading",Loading);
	DD.createModule({
		name:'m_plugin_download_Animation_4',
		el:'.el-animation-4',
		data:{
            buffering_data: {
                color: '#00bfff',
                time: 0.8,
                width: 150,
                height:70
            }
		},
		onBeforeFirstRender:function(){
			var me=this;
            var tem = me.data.buffering_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
		}
	})
})();