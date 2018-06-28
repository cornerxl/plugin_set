/**
 * Created by xll on 2018/6/28.
 */
(function () {
    DD.createRoute([
        {
            path: "/route",
            module: 'm_index',
            routes:[
                {
                    path: '/home',
                    module: 'm_home'
                },{
                    path: '/plugin_list',
                    module: 'm_plugin_list'
                },{
                    path: '/plugin_download',
                    module: 'm_plugin_download'
                }
            ]
        }
    ])
}())