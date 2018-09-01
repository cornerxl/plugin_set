;
(function () {
    var plugin_01001 = function () {
    };
    plugin_01001.prototype = {
        init: function (view) {
            var me = this;
            me.province = {
                A: [{
                    name: '安徽省',
                }, {
                    name: '澳门特别行政区'
                }],
                B: [{
                    name: '北京市'
                }],
                C: [{
                    name: '重庆市'
                }],
                D: [],
                E: [],
                F: [{
                    name: '福建省'
                }],
                G: [{
                    name: '甘肃省'
                }, {
                    name: '广东省'
                }, {
                    name: '广西壮族自治区'
                }, {
                    name: '贵州省'
                }],
                H: [{
                    name: '海南省'
                }, {
                    name: '河北省'
                }, {
                    name: '黑龙江省'
                }, {
                    name: '河南省'
                }, {
                    name: '湖北省'
                }, {
                    name: '湖南省'
                }],
                I: [],
                J: [{
                    name: '江苏省'
                }, {
                    name: '江西省'
                }, {
                    name: '吉林省'
                }],
                K: [],
                L: [{
                    name: '辽宁省'
                }],
                M: [],
                N: [{
                    name: '内蒙古'
                }, {
                    name: '宁夏回族自治区'
                }],
                O: [],
                P: [],
                Q: [{
                    name: '青海省'
                }],
                R: [],
                S: [{
                    name: '陕西省'
                }, {
                    name: '山东省'
                }, {
                    name: '上海市'
                }, {
                    name: '山西省'
                }, {
                    name: '四川省'
                }],
                T: [{
                    name: '台湾省'
                }, {
                    name: '天津市'
                }],
                U: [],
                V: [],
                W: [],
                X: [{
                    name: '香港特别行政区'
                }, {
                    name: '新疆维吾尔族自治区',
                }, {
                    name: '西藏自治区'
                }],
                Y: [{
                    name: '云南省'
                }],
                Z: [{
                    name: '浙江省'
                }]
            }
            var template = `<div class="nd-plugin-location-box">
								<div class="nd-plugin-location-country">
									<span></span>
								</div>
								<div class="nd-plugin-location-popular">
									<span class="nd-plugin-location-star"></span>
									<span>热门省份</span>
								</div>
								<ul class="nd-plugin-location-popularlist">
									<li x-repeat="popular_country">
										<div name="{{name}}">{{name}}</div>
									</li>
								</ul>`;
            var letter = `<ul class="nd-plugin-location-letterlist">
							<span>定位</span>`;//字母
            for (var p in me.province) {
                if (me.province[p].length > 0) {
                    letter += `<li><a href=#nd-plugin-location-` + p + `>` + p + `</a></li>`;
                    template += `<div class="nd-plugin-location-letter">
									<div id=nd-plugin-location-` + p + `>` + p + `</div>
								</div>
								<div class="nd-plugin-location-provicesbox">`
                    for (var i = 0; i < me.province[p].length; i++) {
                        template += `<div class="nd-plugin-location-provices">
										<div name="` + me.province[p][i].name + `">` + me.province[p][i].name + `</div>
										<span class="nd-plugin-location-checked"></span>
									</div>`;
                    }
                    template += `</div>`;
                }
            }
            letter += `</ul>`;
            template += letter;
            template += `</div>`;
            view.innerHTML = template;
            DD.Compiler.compile(view, view.$module);
            view.$forceRender = true;
        },
        render: function (view) {
            var me = this;
            var data = view.$getData().data;
            if(data.data){
                data=data.data;
            }
            if (!data) {
                return;
            }
            setTimeout(function () {
                var pop = view.querySelector(".nd-plugin-location-popularlist");
                var fixed = view.querySelector(".nd-plugin-location-letterlist");
                var route = document.querySelector(".router-content");
                var color1 = data.small_div.color_1;
                var color2 = data.small_div.color_2;
                var color3 = data.small_div.color_3;
                var li = [];
                li = Array.from(fixed.getElementsByTagName("a"));
                li.forEach(function (i) {
                    DD.css(i, "color", color2);
                });
                li = Array.from(pop.getElementsByTagName("div"));
                li.forEach(function (i) {
                    DD.css(i, "background-color", color1);
                    DD.css(i, "background-color", "#ffffff");
                });
                li = document.querySelectorAll(".nd-plugin-location-A");
                li.forEach(function (i) {
                    DD.css(i, 'color', color3);
                });
                if (data.location_country) {
                    data.location_country = data.location_country.substring(0, 2);
                }
                if (data.popular_country) {
                    if (data.popular_country.length > 8) {
                        data.popular_country.splice(8, data.popular_country.length);
                    }
                    DD.css(view.querySelector('.nd-plugin-location-popularlist'), 'height', 33 * parseInt((2 + data.popular_country.length) / 3) + 'px');
                }
                var location_country = view.querySelector('.nd-plugin-location-country');
                for (var p in me.province) {
                    if (me.province[p].length > 0) {
                        for (var i = 0; i < me.province[p].length; i++) {
                            var span = view.querySelector('[name=' + me.province[p][i].name + ']').parentNode.querySelector('span');
                            if (DD.css(span, 'display') === 'block') {
                                DD.css(span, 'display', 'none');
                            }
                            if (me.province[p][i].name.substring(0, 2) === data.location_country) {
                                location_country.querySelector('span').innerHTML = '当前省份:' + me.province[p][i].name;
                                DD.css(span, 'display', 'block');
                            }
                        }
                    }
                }
                new DD.Event({
                    eventName: 'click',
                    view: view,
                    handler: function (e, d, v) {
                        if (DD.attr(e.path[0], 'name')) {
                            if (DD.attr(e.path[0], 'name').length === 2) {
                                for (var i = 0; i < e.path[2].querySelectorAll('div').length; i++) {
                                    DD.css(e.path[2].querySelectorAll('div')[i], 'background-color', '#ffffff');
                                }
                                window.my_li = e.path[0];
                            }
                            data.location_country = DD.attr(e.path[0], 'name').substring(0, 2);
                            view.$forceRender = true;
                        }
                    }
                });
            }, 0);
        }
    }
    DD.Plugin.create('plugin_01001', plugin_01001);
}());