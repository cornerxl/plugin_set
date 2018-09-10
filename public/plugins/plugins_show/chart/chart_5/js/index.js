
DD.createModule({
    el: '#app',
    data: {
        scatter: {
            "title": "散点图",
            "legend": "",
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
        },
    },
    methods: {
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
        changeSymbolSize(e, data) {
            data.symbolSize = parseInt(data.cs, 10);
        },
        addScatterData(e, data) {
            var cD = DD.clone(data.data);
            cD[0].datas.push({
                x: parseFloat(data.addX, 10),
                y: parseFloat(data.addY, 10)
            })
            data.data = cD;
        },
    }
})