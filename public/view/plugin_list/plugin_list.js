/**
 * Created by xll on 2018/6/28.
 * 插件列表
 */
(function () {
    DD.createModule({
        name: 'm_plugin_list',
        el:'.el-plugin-list',
        templateUrl: HTMLURL + '/plugin_list/plugin_list.html',
        data:{
            plugin_list:[
                {
                    name:"分页插件",
                    path:"/route/plugin_list/A",
                    active:true
                },{
                    name:"Switcher插件",
                    path:"/route/plugin_list/B",
                    active:false
                },{
                    name:"日历插件",
                    path:"/route/plugin_list/C",
                    active:false
                }
            ]
        },
        onBeforeFirstRender:function () {
            var me = this;
            // me.data.plugin_list.forEach(function (item) {
            //     item.active=false;
            // })
        }
    })
}())
