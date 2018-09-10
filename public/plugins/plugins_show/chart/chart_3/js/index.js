
DD.createModule({
    el: '#app',
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

        addPieData(e, data) {
            var cD = DD.clone(data.data);
            var d = {
                title: data.addTitle,
                value: parseInt(data.addData, 10)
            }
            cD.push(d);
            data.data = cD;
        }
    }
})