/**
 * Created by xll on 2018/6/28.
 */
(function () {
    DD.createRoute([
        {
            path: "/route",
            module: 'm_index',
            routes: [
                {
                    path: '/home',
                    module: 'm_home'
                }, {
                    path: '/plugin_list',
                    module: 'm_plugin_list',
                    routes: [{
                        path: '/instruction',
                        module: 'm_plugin_instruction'
                    },{
                        path: '/address',
                        module: 'm_plugin_address'
                    },{
                        path: '/buffering',
                        module: 'm_plugin_buffering'
                    },{
                        path: '/carousel',
                        module: 'm_plugin_carousel'
                    },{
                        path: '/checkBox',
                        module: 'm_plugin_checkBox'
                    },{
                        path: '/colorPicker',
                        module: 'm_plugin_colorPicker'
                    },{
                        path: '/dateInput',
                        module: 'm_plugin_dateInput'
                    },{
                        path: '/foldCollapse',
                        module: 'm_plugin_foldCollapse'
                    },{
                        path: '/imgShow',
                        module: 'm_plugin_imgShow'
                    },{
                        path:'/inputAuto',
                        module:'m_plugin_inputAuto'
                    },{
                        path:'/paging',
                        module:'m_plugin_paging'
                    },{
                        path:'/progress',
                        module:'m_plugin_progress'
                    },{
                        path:'/switcher',
                        module:'m_plugin_switcher'
                    },{
                        path:'/table',
                        module:'m_plugin_table'
                    },{
                        path:'/chart',
                        module:'m_plugin_chart'
                    },{
                        path:'/tree',
                        module:'m_plugin_tree'
                    }]
                }, {
                    path: '/plugin_download',
                    module: 'm_plugin_download',
                    routes:[{
                        path:'/Carousel_1',
                        module:'m_plugin_download_Carousel_1',
                        active:false
                    },{
                         path:'/Carousel_2',
                        module:'m_plugin_download_Carousel_2',
                        active:false
                    },{
                         path:'/Carousel_3',
                        module:'m_plugin_download_Carousel_3',
                        active:false
                    },{
                         path:'/Carousel_4',
                        module:'m_plugin_download_Carousel_4',
                        active:false
                    },{
                         path:'/Carousel_5',
                        module:'m_plugin_download_Carousel_5',

                    },{
                         path:'/Switch_1',
                        module:'m_plugin_download_Switch_1',
                        active:false
                    },{
                         path:'/Switch_2',
                        module:'m_plugin_download_Switch_2',
                        active:false
                    },{
                         path:'/Switch_3',
                        module:'m_plugin_download_Switch_3',
                        active:false
                    },{
                         path:'/Progress_1',
                        module:'m_plugin_download_Progress_1',
                        active:false
                    },{
                         path:'/Progress_2',
                        module:'m_plugin_download_Progress_2',
                        active:false
                    },{
                         path:'/Progress_3',
                        module:'m_plugin_download_Progress_3',
                        active:false
                    }
                    ,{
                         path:'/Page_1',
                        module:'m_plugin_download_Page_1',
                        active:false
                    },{
                         path:'/Page_2',
                        module:'m_plugin_download_Page_2',
                        active:false

                    },{
                         path:'/Page_3',
                        module:'m_plugin_download_Page_3',
                        active:false
                    },{
                        path:'/Magn_1',
                        module:'m_plugin_download_Magn_1',
                        active:false
                    },{
                         path:'/Complete_1',
                        module:'m_plugin_download_Complete_1',
                        active:false
                    },{
                        path:'/foldCollapse_1',
                        module:'m_plugin_download_foldCollapse_1',
                        active:false
                    },{
                        path:'/Table_1',
                        module:'m_plugin_download_Table_1',
                        active:false
                    },{
                        path:'/Animation_1',
                        module:'m_plugin_download_Animation_1',
                        active:false
                    },{
                        path:'/Animation_2',
                        module:'m_plugin_download_Animation_2',
                        active:false
                    },{
                        path:'/Animation_3',
                        module:'m_plugin_download_Animation_3',
                        active:false
                    },
                    {
                        path:'/Animation_4',
                        module:'m_plugin_download_Animation_4',
                        active:false
                    },
                    {
                        path:'/Animation_5',
                        module:'m_plugin_download_Animation_5',
                        active:false
                    }
                    ,{
                        path:'/Date_1',
                        module:'m_plugin_download_Date_1',
                        active:false
                    },{
                        path:'/Date_2',
                        module:'m_plugin_download_Date_2',
                        active:false
                    },{
                        path:'/Location_1',
                        module:'m_plugin_download_Location_1',
                        active:false
                    },{
                        path:'/Checkbox_1',
                        module:'m_plugin_download_Checkbox_1',
                        active:false
                    },{
                        path:'/Checkbox_2',
                        module:'m_plugin_download_Checkbox_2',
                        active:false
                    },{
                        path:"/Checkbox_3",
                        module:"m_plugin_download_Checkbox_3",
                        active:false
                    },{
                        path:'/Checkbox_4',
                        module:'m_plugin_download_Checkbox_4',
                        active:false
                    },{
                        path:'/Checkbox_5',
                        module:'m_plugin_download_Checkbox_5',
                        active:false
                    }
                    ,{
                        path:'/Button_1',
                        module:'m_plugin_download_Button_1',
                        active:false
                    },{
                        path:'/ColorPicker_1',
                        module:'m_plugin_download_ColorPicker_1',
                        active:false
                    },{
                        path:'/Tree_1',
                        module:'m_plugin_download_Tree_1',
                        active:false
                    },{
                        path:'/Chart_1',
                        module:'m_plugin_download_Chart_1',
                        active:true
                    },{
                        path:'/Chart_2',
                        module:'m_plugin_download_Chart_2',
                        active:false
                    },{
                        path:'/Chart_3',
                        module:'m_plugin_download_Chart_3',
                        active:false
                    },{
                        path:'/Chart_4',
                        module:'m_plugin_download_Chart_4',
                        active:false
                    },{
                        path:'/Chart_5',
                        module:'m_plugin_download_Chart_5',
                        active:false
                    },{
                        path:'/Icon_1',
                        module:'m_plugin_download_Icon_1',
                        active:false
                    }]
                },
            ]
        }
    ])
    DD.Router.switch.style='slide';
    DD.Router.switch.time=0.5;
}())