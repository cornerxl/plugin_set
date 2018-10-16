;(function(){
    console.log(111);
    DD.createModule({
        name: "m_plugin_download_Chart_5",
        el:".nd-plugin-chart",
        // requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_5/css/index.css" }],
        // templateUrl: HTMLURL + "/plugin_download/chart_5/index.html",
        data: {
           radar: {
                "title":"雷达图实例",
                "legend":"right",
                "marker":true,
                "titleColor":"#000000",
                "legends":[
                    {"value":"","text":"无"},
                    {"value":"top","text":"顶部"},
                    {"value":"right","text":"右侧"},
                    {"value":"bottom","text":"底部"}
                ],
                "radar": {
                    "titles": ['顶点一', '顶点二', '顶点三', '顶点四', '顶点五', '顶点六'],
                    "colors": ['#e6e6e6', '#f5f5f5'],
                    "lineColor": "#ccc"
                },
                "data":[
                    {
                        "title": '111',
                        "datas": [93, 55, 45, 78, 66, 45]
                    },
                    {
                        "title": '555',
                        "datas": [45, 79, 79, 88, 93, 67]
                    }
                ],
                addTitle: '',
                addData: '',
                changeColors: ''
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            if(window.data){
                var tem=window.data;
                var to=me.data.radar;
                Object.keys(tem).forEach(i=>{
                    to[i]=tem[i];
                });
            };
            to.radar.lineColor=window.data.lineColor;
            to.radar.colors = window.data.changeColors.split(' ');
        }
    });
})();