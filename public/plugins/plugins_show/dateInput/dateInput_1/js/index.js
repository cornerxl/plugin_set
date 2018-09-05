/**
 * 日期插件
 */

(function() {
    var plugin_06001 = function() {
    };

    plugin_06001.prototype.init = function(view) {
        var me = this;
        var template = `<div class="xDate" x-model='date_data'>
 		<div class="xDate-input">
 		<input type="text" name="" id='xDate-input'>
 		</div>
 		<div class="xDate-calendar" x-show='show'>
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
 		</div>
 		</div>`;
        view.innerHTML = template;
        var data = DD.attr(view, 'dataName') || 'data';
        //数据项名字
        view.$dataItem = data;
        //移除showItem
        view.removeAttribute('dataItem');
        //设置innerHTML
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }

    plugin_06001.prototype.render = function(view) {
        var me = this;
        var data = view.$getData().data[view.$dataItem];
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
            data.year = year;
            data.month = month;
            data.day = today;
            data.xDate_week = [];
            for (var k = 0; k < weeks.length; k++) {
                data.xDate_week.push({ xDate_days: weeks[k] });
            }
            if (data.day > allDays) {
                data.day = allDays;
            }
        };

        if (data.year === "" || data.month === "") {
            setDateInfo();
        }

        function delayRender() {
            var updateCSS = function() {
                me.days = view.getElementsByClassName('xDate-day');
                me.header = view.querySelector('.xDate-header');
                me.bg = view.querySelector('.xDate-body');
                DD.css(me.header, 'background', data.xDate_color.header_color);
                DD.css(me.bg, 'background', data.xDate_color.bg_color);
                for (var i = 0; i < me.days.length; i++) {
                    if (me.days[i].className.indexOf('xDate-no-this-month') === -1) {
                        DD.css(me.days[i], 'color', data.xDate_color.month_color);
                    } else {
                        DD.css(me.days[i], 'color', data.xDate_color.day_color);
                    }
                    if (me.days[i].className.indexOf('xDate-today') !== -1) {
                        DD.css(me.days[i], 'border-color', data.xDate_color.today_color);
                    }
                }
            };
            //变量提升写在这
            updateCSS();
            var preMonth = function() {
                if (data.month === 1) {
                    data.year--;
                    data.month = 12;
                } else {
                    data.month--;
                }
                setDateInfo(data.year, data.month);
                updateCSS();
            };

            var nextMonth = function() {
                if (data.month === 12) {
                    data.year++;
                    data.month = 1;
                } else {
                    data.month++;
                }
                setDateInfo(data.year, data.month);
                updateCSS();
            };

            var backToday = function() {
                var date = new Date();
                data.month = date.getMonth() + 1;
                data.year = date.getFullYear();
                data.day = date.getDate();
                setDateInfo(data.year, data.month, data.day);
                updateCSS();
            };

            var changeShowState = function() { //view 渲染速度过慢会导致updateCss报错
                data.show = !data.show;
                // if(data.show){
                // 	setTimeout(updateCSS,100);
                // }
            };
            var chooseDay = function(e, d, v) {
                data.show = false;
                data.day = d.day;
                input.value = data.year + '/' + data.month + '/' + data.day;
            }
            if (data.show) {
                me.preBtn = view.querySelector('#preMonthBtn');
                me.nextBtn = view.querySelector('#nextMonthBtn');
                var days=view.getElementsByClassName('xDate-day');
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
    DD.Plugin.create("plugin_06001", plugin_06001);
}());