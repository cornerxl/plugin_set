;
(function() {
    var Loading = function() {}
    Loading.prototype = {
        init: function(view) {
            var template = `<div class="com-loading">
                                <div class="spinner">
                                    <div class="bounce1 small"></div>
                                    <div class="bounce2 small"></div>
                                    <div class="bounce3 small"></div>
                                </div>
                            </div>`;
            view.$dataItem = DD.attr(view, "dataName");
            view.removeAttribute("dataName");
            view.innerHTML = template;
        },
        render: function(view) {
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var dom = view.querySelectorAll(".small");
                dom.forEach(function(i, index) {
                    DD.css(i, "background-color", data.color);
                    DD.css(i, "animation-delay", (data.time / 5) * index + 's');
                    DD.css(i, "width", 2 * data.radius + 'px');
                    DD.css(i, "height", 2 * data.radius + 'px');
                });
            }, 0)
        }
    };
    DD.Plugin.create("loading",Loading);
    DD.createModule({
    	name:'m_plugin_download_Animation_5',
    	el:'.el-animation-5',
    	data:{
    		name:'水滴动画',
            buffering_data: {
                color: "#363636",
                show: true,
                radius: 5
            }
    	},
    	onBeforeFirstRender:function(){
    		var me = this;
            var tem = me.data.buffering_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
    	}
    })
})()