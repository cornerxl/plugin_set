DD.createModule({
    name: "m_plugin_download_Chart_4",
    requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_4/css/index.css" }],
    templateUrl: HTMLURL + "/plugin_download/chart_4/index.html",
    data: {
        scatter: {
            "title": "散点图",
            "legend": "",
            "marker": false,
            "titleColor": "#000000",
            "symbolSize": 12,
            "gridLine": 0,
            "gridLineColor": "#cccccc",
            "legends": [
                { "value": "", "text": "无" },
                { "value": "top", "text": "顶部" },
                { "value": "right", "text": "右侧" },
                { "value": "bottom", "text": "底部" }
            ],
            "lines": [
                { "value": 0, "text": "无" },
                { "value": 1, "text": "横向" },
                { "value": 2, "text": "纵向" },
                { "value": 3, "text": "全部" }
            ],
            "data": [{
                "title": "测试",
                "datas": [
                    {x: 10.0, y:8.04},
                    {x:8.0, y:6.95},
                    {x:13.0, y:7.58},
                    {x:9.0, y:8.81},
                    {x:11.0, y:8.33},
                    {x:14.0, y:9.96},
                    {x:6.0, y:7.24},
                    {x:4.0, y:4.26},
                    {x:12.0,y: 10.84},
                    {x:7.0, y:4.82},
                    {x:5.0, y:5.68}
                ],
                cs: 8
            }],
            addX: '',
            addY: ''
        }
    },
    methods: {
         ensure:function(){
            var me=this;
            var obj = {
                    plugin_id: 1704,
                    total: 0,
                    js:JSON.stringify({
                         titleColor:me.data.scatter.titleColor.replace("#",""),
                         legend: me.data.scatter.legend+'',
                         gridLine:me.data.scatter.gridLine,
                         gridLineColor:me.data.scatter.gridLineColor.replace("#",""),
                         cs:me.data.scatter.data.cs,
                         symbolSize:me.data.scatter.symbolSize
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
        },
        changeLine(e, data) {
            data.gridLine = e.target.value;
        },
        changeLineColor(e, data) {
            data.gridLineColor = e.target.value;
        },
        addScatterData(e, data) {
            var cD = DD.clone(data.data);
            cD[0].datas.push({
                x: parseFloat(data.addX, 10),
                y: parseFloat(data.addY, 10)
            })
            data.data = cD;
        }
    }
})