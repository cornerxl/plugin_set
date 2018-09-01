(function() {
    DD.createModule({
        name: "m_loading",
        el: '.com-loading-animation-3',
        // templateUrl: BASEHTML + '/common/loading/loading.html',
        data: {
            datas: {
                show: true, // 是否显示
            }
        },
        onReceive: function(module, data) {
            var me = this;
            me.data.$set('datas', data);
            AlertState.model = me;
            // 延迟隐藏
            AlertState.show = data.show;
        }
    });
})()