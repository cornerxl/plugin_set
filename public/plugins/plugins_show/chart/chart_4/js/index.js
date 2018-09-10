
DD.createModule({
    el: '#app',
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
        addRadarData(e, data) {
            var cD = DD.clone(data.data);
            var ads = data.addData.split(' ');
            for(var i=0,l=ads.length; i<l; i++) {
                ads[i] = parseFloat(ads[i], 10);
            }
            cD.push({
                title: data.addTitle,
                datas: ads
            })
            data.data = cD;
        },
        changeRadarColors(e, data) {
            var radar = DD.clone(data.radar);
            radar.colors = data.changeColors.split(' ');
            data.radar = radar;
        }
    }
})