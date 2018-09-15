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
});})();