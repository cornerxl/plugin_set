(function() {
    var Loading = function() {}
    Loading.prototype = {
        init: function(view) {
            var me = this;
            var template = `<div class="nd-plugin-buffering-box-3" x-if="buffering_data.show">
                                <div class="nd-plugin-buffering-imgbox">
                                    <div class="nd-plugin-buffering-leftbox">
                                        <div class="nd-plugin-buffering-left"></div>
                                    </div>
                                    <div class="nd-plugin-buffering-rightbox">
                                        <div class="nd-plugin-buffering-right"></div>
                                    </div>
                                </div>
                            </div>`;
            view.innerHTML = template;
            var data = DD.attr(view, 'dataName') || 'data';
            //数据项名字
            view.$dataItem = data;
            //移除showItem
            view.removeAttribute('dataItem');
            //设置innerHTML
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function(view) {
            var me = this;
            var data = view.$getData().data[view.$dataItem];
            setTimeout(function() {
                var right = view.querySelector(".nd-plugin-buffering-right");
                var left = view.querySelector(".nd-plugin-buffering-left");
                var rightBox = view.querySelector(".nd-plugin-buffering-rightbox");
                var leftBox = view.querySelector(".nd-plugin-buffering-leftbox");
                var imgBox = view.querySelector('.nd-plugin-buffering-imgbox');
                var color = data.color_1;
                var time = parseInt(data.animation_time);
                if (time < 1)
                    time = 2;
                DD.css(imgBox, 'width', data.size + 'px');
                DD.css(imgBox, 'height', data.size + 'px');
                DD.css(left, "animation-duration", time + "s");
                DD.css(left, "border-left-color", color);
                DD.css(left, "border-bottom-color", color);
                DD.css(left, 'width', data.size + 'px');
                DD.css(left, 'height', data.size + 'px');
                DD.css(leftBox, 'width', data.size / 2 + 'px');
                DD.css(leftBox, 'height', data.size + 'px');
                DD.css(rightBox, 'width', data.size / 2 + 'px');
                DD.css(rightBox, 'height', data.size + 'px');
                DD.css(rightBox, 'left', data.size / 2 + 'px');
                DD.css(right, 'width', data.size + 'px');
                DD.css(right, 'height', data.size + 'px');
                DD.css(right, 'margin-left', - data.size / 2 + 'px');
                DD.css(right, "animation-duration", time + "s");
                DD.css(right, "border-left-color", color);
                DD.css(right, "border-bottom-color", color);
            }, 0);
        }
    };
    DD.Plugin.create("loading", Loading);
    DD.createModule({
        name: "m_plugin_download_Animation_3",
        el: '.el-loading',
        // templateUrl: BASEHTML + '/common/loading/loading.html',
        data: {
            buffering_data: {
                show: true,
                size: 64,
                color_1: '#409EFF',
                animation_time: 3
            }
        },
        onBeforeFirstRender: function() {
            var me = this;
            var tem = me.data.buffering_data;
            if (window.data) {
                Object.keys(window.data).forEach(i => {
                    tem[i] = window.data[i];
                });
            }
        }
    });
})()