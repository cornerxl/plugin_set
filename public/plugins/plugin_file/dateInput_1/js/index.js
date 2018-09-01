/**
 * 日期插件
 */

(function() {
    var xDate = function() {

    };

    xDate.prototype.init = function(view) {
        var dataYear = DD.attr(view, 'Year');
        var dataMonth = DD.attr(view, 'Month');
        var dataDay = DD.attr(view, 'Day');
        view.$dataYear = dataYear;
        view.$dataMonth = dataMonth;
        view.$dataDay = dataDay;
        view.removeAttribute('Year');
        view.removeAttribute('Month');
        view.removeAttribute('Day');
        var template = `<div class="xDate" x-model='xDate'>
 		<div class="xDate-input">
 		<input type="text" name="" id='xDate-input'>
 		</div>
 		<div class="xDate-calendar" x-if='show'>
 		<div class="xDate-date">
 		<div class="xDate-header">
 		<div class="xDate-btn fr" id='nextMonthBtn'>&gt;</div>
 		<div class="xDate-btn fl" id='preMonthBtn'>&lt;</div>
 		<div class="xDate-Date">{{year}}年{{month}}月<div id='goToToday' title='回到今日'></div></div>
 		<div class="clear"></div>
 		</div>
 		<div class="xDate-body">
 		<div class="xDate-table">
 		<div class="xDate-week">
 		<div class='xDate-day-header' x-repeat='xDate_day'>{{day}}</div>
 		</div>
 		<div class="xDate-week" x-repeat='xDate_week'>
 		<div class='xDate-day' x-repeat='xDate_days' x-class="{'xDate-today':'today','xDate-no-this-month':'month===0||month===2'}">{{day}}</div>
 		</div>
 		</div>
 		</div>
 		</div>
 		<div class="xDate-config" x-model='xDate_color'>
 		<div class="xDate-config-item">
 		<span>表头颜色</span><input class="xDate-color" type="color" x-field='header_color' value="{{header_color}}">
 		</div>
 		<div class="xDate-config-item">
 		<span>背景颜色</span><input class="xDate-color" type="color" x-field='bg_color' value="{{bg_color}}">
 		</div>
 		<div class="xDate-config-item">
 		<span>别月颜色</span><input class="xDate-color" type="color" x-field='day_color' value="{{day_color}}">
 		</div>
 		<div class="xDate-config-item">
 		<span>今日背景</span><input class="xDate-color" type="color" x-field='today_color' value="{{today_color}}">
 		</div>
 		<div class="xDate-config-item">
 		<span>本月颜色</span><input class="xDate-color" type="color" x-field='month_color' value="{{month_color}}">
 		</div>
 		<div class="xDate-config-item">
 		<button class='xDate-apply'>应用</button>
 		</div>
 		</div>
 		</div>
 		</div>`;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    xDate.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data;
        if (!data) {
            return;
        }
        var module;
        if (!data.module) {
            module = view.$module;
        } else {
            module = data.module;
        }
        if (!module) {
            return;
        }
        setTimeout(delayRender, 500);
        var input = view.querySelector('#xDate-input');
        var setDateInfo = function(year, month, day) {
            var date;
            if (!month || !year) {
                date = new Date();
            } else {
                if (day) {
                    date = new Date(year, month - 1, day);
                } else {
                    date = new Date(year, month - 1, 1);
                }
            }
            var nowDate = new Date();
            var thisYear = nowDate.getFullYear();
            var thisMonth = nowDate.getMonth() + 1;
            var thisDate = nowDate.getDate();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var today = date.getDate();
            var firstDay = new Date(year, month - 1, 1);
            var lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
            var allDays = new Date(year, month, 0).getDate();
            var weeks = [
                [],
                [],
                [],
                [],
                [],
                []
            ];
            var index = 0;
            for (var i = 1; i <= firstDay.getDay(); i++) {
                weeks[0].push({ day: lastDayOfLastMonth - firstDay.getDay() + i, month: 0, today: false });
            }
            for (var j = 1; j <= allDays; j++) {
                var state = year === thisYear && month == thisMonth && j == thisDate;
                if (weeks[index].length < 7) {
                    weeks[index].push({ day: j, month: 1, today: state });
                } else {
                    weeks[++index].push({ day: j, month: 1, today: state });
                }
            }
            for (var k = 0; k < weeks.length; k++) {
                if (weeks[k] == '') {
                    weeks.splice(k, 1);
                }
            }
            var nextMonthDays = 7 - weeks[weeks.length - 1].length;
            for (var day = 1; day <= nextMonthDays; day++) {
                weeks[weeks.length - 1].push({ day: day, month: 2, today: false });
            }
            data.xDate.year = year;
            data.xDate.month = month;
            data.xDate.day = today;
            data.xDate.xDate_week = [];
            for (var k = 0; k < weeks.length; k++) {
                data.xDate.xDate_week.push({ xDate_days: weeks[k] });
            }
            if (data.xDate.day > allDays) {
                data.xDate.day = allDays;
            }
        };

        if (data.xDate.year === "" || data.xDate.month === "") {
            setDateInfo();
        }

        function delayRender() {
            var updateCSS = function() {
                me.days = view.getElementsByClassName('xDate-day');
                me.header = view.querySelector('.xDate-header');
                me.bg = view.querySelector('.xDate-body');
                DD.css(me.header, 'background', data.xDate.xDate_color.header_color);
                DD.css(me.bg, 'background', data.xDate.xDate_color.bg_color);
                for (var i = 0; i < me.days.length; i++) {
                    if (me.days[i].className.indexOf('xDate-no-this-month') === -1) {
                        DD.css(me.days[i], 'color', data.xDate.xDate_color.month_color);
                    } else {
                        DD.css(me.days[i], 'color', data.xDate.xDate_color.day_color);
                    }
                    if (me.days[i].className.indexOf('xDate-today') !== -1) {
                        DD.css(me.days[i], 'border-color', data.xDate.xDate_color.today_color);
                    }
                }
            };
            //变量提升写在这
            updateCSS();
            var preMonth = function() {
                if (data.xDate.month === 1) {
                    data.xDate.year--;
                    data.xDate.month = 12;
                } else {
                    data.xDate.month--;
                }
                setDateInfo(data.xDate.year, data.xDate.month);
                updateCSS();
            };

            var nextMonth = function() {
                if (data.xDate.month === 12) {
                    data.xDate.year++;
                    data.xDate.month = 1;
                } else {
                    data.xDate.month++;
                }
                setDateInfo(data.xDate.year, data.xDate.month);
                updateCSS();
            };

            var backToday = function() {
                var date = new Date();
                data.xDate.month = date.getMonth() + 1;
                data.xDate.year = date.getFullYear();
                data.xDate.day = date.getDate();
                setDateInfo(data.xDate.year, data.xDate.month, data.xDate.day);
                updateCSS();
            };

            var changeShowState = function() { //view 渲染速度过慢会导致updateCss报错
                data.xDate.show = !data.xDate.show;
                // if(data.xDate.show){
                // 	setTimeout(updateCSS,100);
                // }
            };
            var chooseDay = function(e, d, v) {
                console.log(d);
                data.xDate.show = false;
                data.xDate.day = d.day;
                input.value = data.xDate.year + '/' + data.xDate.month + '/' + data.xDate.day;
            }

            if (data.xDate.show) {
                me.preBtn = view.querySelector('#preMonthBtn');
                me.nextBtn = view.querySelector('#nextMonthBtn');
                me.doBtn = view.querySelector('.xDate-apply');
                // var days=view.getElementsByClassName('xDate-day');
                me.todayBtn = view.querySelector('#goToToday');
                new DD.Event({
                    eventName: 'click',
                    view: me.preBtn,
                    handler: preMonth
                })

                new DD.Event({
                    eventName: 'click',
                    view: me.nextBtn,
                    handler: nextMonth
                })

                new DD.Event({
                    eventName: 'click',
                    view: me.doBtn,
                    handler: updateCSS
                })

                new DD.Event({
                    eventName: 'click',
                    view: me.todayBtn,
                    handler: backToday
                })

                for (var i = 0; i < me.days.length; i++) {
                    new DD.Event({
                        eventName: 'click',
                        view: me.days[i],
                        handler: chooseDay
                    })
                }
            }

            new DD.Event({
                eventName: 'click',
                view: input,
                handler: changeShowState
            })
        }
    }
    DD.Plugin.create("xDate", xDate);
    DD.createModule({
        name: 'm_plugin_download_Date_1',
        el:".plugin-date",
        data: {
            xDate: {
                year: "", //当前 年/月/日
                month: "",
                day: "",
                show: true,
                xDate_color: { //日历自定义颜色
                    header_color: '#e6e6e6',
                    bg_color: '#fff',
                    day_color: '#555555',
                    today_color: '#112233',
                    month_color: '#333333',
                },
                xDate_day: [{ //日历头部
                    day: "日"
                }, {
                    day: "一"
                }, {
                    day: "二"
                }, {
                    day: "三"
                }, {
                    day: "四"
                }, {
                    day: "五"
                }, {
                    day: "六"
                }],
                xDate_week: [] //日历日期内容
            }
        },
        onBeforeFirstRender:function(){
            var me=this;
            my_data=me.data.xDate.xDate_color;
             if(window.data){
                if(window.data.bg_color){
                    my_data.bg_color=window.data.bg_color;
                }
                if(window.data.header_color){
                    my_data.header_color=window.data.header_color;
                }
                if(window.data.day_color){
                    my_data.day_color=window.data.day_color;
                }
                if(window.data.today_color){
                    my_data.today_color=window.data.tody_color;
                }
                if(window.data.month_color){
                    my_data.month_color=window.data.month_color;
                }
            }
        }
    });
}());