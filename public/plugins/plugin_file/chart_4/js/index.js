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
    },
    methods: {
        changeTitleColor(e, data, view) {
            data.titleColor = e.target.value;
        },
        changeLegend(e, data, view) {
            data.legend = e.target.value;
        },
        changeMarker(e, data, view) {
            data.marker = e.target.checked;
        },
        changeLine(e, data) {
            data.gridLine = e.target.value;
        },
        changeLineColor(e, data) {
            data.gridLineColor = e.target.value;
        },
        addLineData(e, data) {
            var d = DD.clone(data.data);
            var o = {};
            var ad = data.addData.split(' ');
            var datas = [
                { "x": "1月" },
                { "x": "2月" },
                { "x": "3月" },
                { "x": "4月" },
                { "x": "5月" },
                { "x": "6月" }
            ]
            for (var i = 0, l = 6; i < l; i++) {
                datas[i].y = parseInt(ad[i], 10);
            }
            o.datas = datas;
            o.title = data.addTitle;
            d.push(o);
            data.data = d;
        },
        addPieData(e, data) {
            var cD = DD.clone(data.data);
            var d = {
                title: data.addTitle,
                value: parseInt(data.addData, 10)
            }
            cD.push(d);
            data.data = cD;
        },
        addScatterData(e, data) {
            var cD = DD.clone(data.data);
            cD[0].datas.push({
                x: parseFloat(data.addX, 10),
                y: parseFloat(data.addY, 10)
            })
            data.data = cD;
        },
        addRadarData(e, data) {
            var cD = DD.clone(data.data);
            var ads = data.addData.split(' ');
            for (var i = 0, l = ads.length; i < l; i++) {
                ads[i] = parseFloat(ads[i], 10);
            }
            cD.push({
                title: data.addTitle,
                datas: ads
            })
            data.data = cD;
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
        },
        changeSymbolSize(e, data) {
            data.symbolSize = parseInt(data.cs, 10);
        }
    }
})