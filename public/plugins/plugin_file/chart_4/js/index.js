DD.createModule({
    name: "m_plugin_download_Chart_4",
    el:".nd-plugin-chart",
    // requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_4/css/index.css" }],
    // templateUrl: HTMLURL + "/plugin_download/chart_4/index.html",
    data: {
        scatter: {
            "title": "散点图",
            "marker": false,
            "titleColor": "#000000",
            "legend": "",
            "symbolSize": 8,
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
                cs: ''
            }],
            addX: '',
            addY: ''
        }
    },
    onBeforeFirstRender:function(){
        var me=this;
        if(window.data){
            var tem=window.data;
            var to=me.data.scatter;
            Object.keys(tem).forEach(i=>{
                to[i]=tem[i];
            });
            to.data[0].cs=tem.cs;
        }
    }
})