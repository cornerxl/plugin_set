DD.createModule({
    name: "m_plugin_download_Chart_5",
    requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_5/css/index.css" }],
    templateUrl: HTMLURL + "/plugin_download/chart_5/index.html",
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
    methods: {
         ensure:function(){
            var me=this;
            var obj = {
                    plugin_id: 1705,
                    total: 0,
                    js:JSON.stringify({
                         titleColor:me.data.radar.titleColor.replace("#",""),
                         legend: `${me.data.radar.legend}`,
                         marker:me.data.radar.marker,
                         lineColor:me.data.radar.radar.lineColor.replace("#",""),
                         changeColors:me.data.radar.changeColors.replace("#","")
                    }),
                    flag: 1
                }
             if(view.innerHTML.indexOf('Less') > -1) {
                 obj.isLess = true;
             }else {
                 obj.isLess = false;
             }
                me.module.send('m_plugin_download', {
                    upload: true,
                    obj: obj
                });
            
        },
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },
        changeRadarLineColor(e, data) {
            var radar = DD.clone(data.radar);
            radar.lineColor = e.target.value;
            data.radar = radar;
        },
        changeRadarColors(e, data) {
            var radar = DD.clone(data.radar);
            radar.colors = data.changeColors.split(' ');
            data.radar = radar;
        }
    }
})