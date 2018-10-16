DD.createModule({
    name: "m_plugin_download_Chart_3",
    requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_3/css/index.css" }],
    templateUrl: HTMLURL + "/plugin_download/chart_3/index.html",
    data: {
        pie:{
            "title":"饼状图",
            "legend":"",
            "titleColor":"#000000",
            "showPercent":true,
            "showText":true,
            "legends":[
                {"value":"","text":"无"},
                {"value":"top","text":"顶部"},
                {"value":"right","text":"右侧"},
                {"value":"bottom","text":"底部"}
            ],
            "data":[
                {"value":300,"title":"数据一"},
                {"value":800,"title":"数据二"},
                {"value":600,"title":"数据三"},
                {"value":100,"title":"数据四"},
                {"value":400,"title":"数据五"},
                {"value":450,"title":"数据六"}
            ],
            addTitle: '',
            addData: ''
        },
    },
    methods: {
         ensure:function(){
            var me=this;
            var obj = {
                    plugin_id: 1703,
                    total: 0,
                    js:JSON.stringify({
                         titleColor:me.data.pie.titleColor.replace("#",""),
                         legend: me.data.pie.legend+''
                    }),
                    flag: 1
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
        }
    }
})