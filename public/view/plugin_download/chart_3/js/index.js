DD.createModule({
    name: "m_plugin_download_Chart_3",
    requires: [{ type: 'css', path: HTMLURL + "/plugin_download/chart_3/css/index.css" }],
    templateUrl: HTMLURL + "/plugin_download/chart_3/index.html",
    data: {
        pie:{
            "title":"饼状图",
            "legend":"",
            "titleColor":"#000000",
            "legend":"",
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