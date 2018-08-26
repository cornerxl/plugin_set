/**
 * 日期插件
 */

 (function(){
 	var xDate=function(){

 	};

 	xDate.prototype.init=function(view){
 		var me = this;
 		var template=`<div class="xDate" x-model='xDate'>
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
 		<div class='xDate-day' x-repeat='xDate_days' x-class="{'xDate-today':'today','xDate-no-this-month':'month!==1'}">{{day}}</div>
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
 		<div x-if="show" class="xDate-note" >
 		<div class="xDate-header">
 		{{year}}/{{month}}/{{day}}进程安排
 		<div class="close-btn">✖</div>
 		<div class="bottom-border"></div>
 		</div>
 		<div class="xDate-content">
 		<ul x-if="hasNotes">
 		<li x-repeat='xDate_notes'>
 		{{$index+1}}、{{note}}
 		<div class="xDate-note-del">✖</div>
 		</li>
 		</ul>
 		<div class="xDate-no-note" x-if='!hasNotes&&!hasEdit'>
 		暂无进程
 		</div>
 		<ul>
 		<li x-if="hasEdit"><input type="text" id="inputNote"><div class='xDate-confirm'>✔</div></li></ul>
 		</div>
 		<div class="xDate-operate">
 		<button class="xDate-btn" id='newNote'>
 		新增
 		</button>
 		</div>
 		</div>
 		</div>`;
 		view.innerHTML = template;
 		DD.Compiler.compile(view, view.$module);	
 		view.$forceRender = true;	
 	}

 	xDate.prototype.render=function(view){
 		var me = this;
 		var data = view.$getData().data;
 		if(!data){
 			return;
 		}
 		var module;
 		if(!data.module){
 			module = view.$module;
 		}else {
 			module = data.module;
 		}
 		if(!module){
 			return;
 		}
 		setTimeout(delayRender, 0);
 		var preBtn=view.querySelector('#preMonthBtn');
 		var nextBtn=view.querySelector('#nextMonthBtn');
 		var doBtn=view.querySelector('.xDate-apply');
 		var header=view.querySelector('.xDate-header');
 		var bg=view.querySelector('.xDate-body');
 		var days=view.getElementsByClassName('xDate-day');
 		var delBtns=view.getElementsByClassName('xDate-note-del');
 		var todayBtn=view.querySelector('#goToToday');
 		var setDateInfo=function(year,month,day){
 			var date;
 			if(!month||!year){
 				date=new Date();
 			}else{
 				if(day){
 					date=new Date(year,month-1,day);
 				}else{
 					date=new Date(year,month-1,1);
 				}
 			}
 			var nowDate=new Date();
 			var thisYear=nowDate.getFullYear();
 			var thisMonth=nowDate.getMonth()+1;
 			var thisDate=nowDate.getDate();
 			var year=date.getFullYear();
 			var month=date.getMonth()+1;
 			var today=date.getDate();
 			var firstDay=new Date(year,month-1,1);
 			var lastDayOfLastMonth=new Date(year,month-1,0).getDate();
 			var allDays=new Date(year,month,0).getDate();
 			var weeks=[[],[],[],[],[],[]];
 			var index=0;
 			for(var i=1;i<=firstDay.getDay();i++){
 				weeks[0].push({day:lastDayOfLastMonth-firstDay.getDay()+i,month:0,today:false,notes:[]});
 			}
 			for(var j=1;j<=allDays;j++){
 				var state=year===thisYear&&month==thisMonth&&j==thisDate;
 				if(weeks[index].length<7){
 					weeks[index].push({day:j,month:1,today:state,notes:[]});
 				}else{
 					weeks[++index].push({day:j,month:1,today:state,notes:[]});
 				}
 			}
 			for(var k=0;k<weeks.length;k++){
 				if(weeks[k]==''){
 					weeks.splice(k,1);
 				}
 			}
 			var nextMonthDays=7-weeks[weeks.length-1].length;
 			for(var day=1;day<=nextMonthDays;day++){
 				weeks[weeks.length-1].push({day:day,month:2,today:false,notes:[]});
 			}
 			data.xDate.year=year;
 			data.xDate.month=month;
 			data.xDate.day=today;
 			data.xDate.xDate_week=[];
 			for(var k=0;k<weeks.length;k++){
 				data.xDate.xDate_week.push({xDate_days:weeks[k]});
 			}
 			if(data.xDate.day>allDays){
 				data.xDate.day=allDays;
 			}
 		};

 		if(data.xDate.year===""||data.xDate.month===""){
 			setDateInfo();
 		}
 		var updateCSS = function(){
 			DD.css(header, 'background', data.xDate.xDate_color.header_color);
 			DD.css(bg, 'background', data.xDate.xDate_color.bg_color);
 			for(var i=0;i<days.length;i++){
 				if(days[i].className.indexOf('xDate-no-this-month')===-1){
 					DD.css(days[i], 'color', data.xDate.xDate_color.month_color);
 				}else{
 					DD.css(days[i], 'color', data.xDate.xDate_color.day_color);
 				}
 				if(days[i].className.indexOf('xDate-today')!==-1){
 					DD.css(days[i], 'border-color', data.xDate.xDate_color.today_color);
 				}
 			}
 		};
 		function delayRender(){
 			var preMonth = function(){
 				if(data.xDate.month===1){
 					data.xDate.year--;
 					data.xDate.month=12;
 				}else{
 					data.xDate.month--;
 				}
 				setDateInfo(data.xDate.year,data.xDate.month);
 			};

 			var nextMonth = function(){
 				if(data.xDate.month===12){
 					data.xDate.year++;
 					data.xDate.month=1;
 				}else{
 					data.xDate.month++;
 				}
 				setDateInfo(data.xDate.year,data.xDate.month);
 			};

 			var backToday=function(){
 				var date=new Date();
 				data.xDate.month=date.getMonth()+1;
 				data.xDate.year=date.getFullYear();
 				data.xDate.day=date.getDate();
 				setDateInfo(data.xDate.year,data.xDate.month,data.xDate.day);
 			};
 			var showNotes=function(e,d,v){
 				data.xDate.show=true;
 				data.xDate.hasNotes=d.notes.length!==0;
 				data.xDate.$set('xDate_notes',d.notes);
 				if(d.month===0){
 					preMonth();
 				}
 				if(d.month===2){
 					nextMonth();
 				}
 				if(d.day!==data.xDate.day){
 					data.xDate.day=d.day;
 				}else{
 					data.xDate.show=!data.xDate.show;
 					data.xDate.day=''
 				}
 			}

 			var hideNotes=function(){
 				data.xDate.show=false;
 			}

 			var delNote=function(e,d,v){
 				var index=d.$index;
 				data.xDate.xDate_notes.splice(index,1);
 				for(var i = 0;i<data.xDate.xDate_week.length;i++){
 					for(var j=0;j<data.xDate.xDate_week[i].xDate_days.length;j++){
 						if(data.xDate.xDate_week[i].xDate_days[j].day===data.xDate.day&&data.xDate.xDate_week[i].xDate_days[j].month===1){
 							data.xDate.hasNotes=data.xDate.xDate_notes.length!==0;
 							data.xDate.xDate_week[i].xDate_days[j].$set('notes',data.xDate.xDate_notes);
 							break;
 						}
 					}
 				}
 			}

 			var addNote=function(){
 				data.xDate.hasEdit=true;
 			};

 			var confrimAddNote=function(){
 				var content=noteInput.value;
 				if(content){
 					for(var i = 0;i<data.xDate.xDate_week.length;i++){
 						for(var j=0;j<data.xDate.xDate_week[i].xDate_days.length;j++){
 							if(data.xDate.xDate_week[i].xDate_days[j].day===data.xDate.day&&data.xDate.xDate_week[i].xDate_days[j].month===1){
 								data.xDate.xDate_week[i].xDate_days[j].notes.push({note:content});
 								data.xDate.$set("xDate_notes",data.xDate.xDate_week[i].xDate_days[j].notes);
 								break;
 							}
 						}
 					}
 				}
 				data.xDate.hasNotes=data.xDate.xDate_notes.length!==0;
 				data.xDate.hasEdit=false;
 				
 			};
 			new DD.Event({
 				eventName:'click',
 				view:preBtn,
 				handler:preMonth
 			})

 			new DD.Event({
 				eventName:'click',
 				view:nextBtn,
 				handler:nextMonth
 			})

 			new DD.Event({
 				eventName:'click',
 				view:doBtn,
 				handler:updateCSS
 			})
 			new DD.Event({
 				eventName:'click',
 				view:todayBtn,
 				handler:backToday
 			})


 			if(data.xDate.show){

 				var closeBtn=view.querySelector('.close-btn');
 				var newBtn=view.querySelector('#newNote');
 				var noteInput=view.querySelector('#inputNote');
 				if(data.xDate.hasEdit){
 					var confirmBtn=view.querySelector('.xDate-confirm');
 					new DD.Event({
 						eventName:'click',
 						view:confirmBtn,
 						handler:confrimAddNote
 					})
 				}
 				new DD.Event({
 					eventName:'click',
 					view:closeBtn,
 					handler:hideNotes
 				})

 				new DD.Event({
 					eventName:'click',
 					view:newBtn,
 					handler:addNote
 				})

 				
 			}

 			for(var i = 0;i<days.length;i++){
 				new DD.Event({
 					eventName:'click',
 					view:days[i],
 					handler:showNotes
 				})
 			}

 			for(var i = 0;i<delBtns.length;i++){
 				new DD.Event({
 					eventName:'click',
 					view:delBtns[i],
 					handler:delNote
 				})
 			}

 		}
 	}
 	DD.Plugin.create("xDate", xDate);
 	DD.createModule({
 		name:'m_date',
 		el:'.plugin-date',
 		data:{
 			xDate:{
 				hasEdit:false,//判断是否处于添加状态
 				show:false,//是否展示备忘录
 				year:"",//当前 年/月/日
 				month:"",
 				day:"",
 				hasNotes:false,//备忘录内容是否为空
 				xDate_notes:[//展示的备忘录内容
 				],
 				xDate_color:{//日历自定义颜色
 					header_color:'#e6e6e6',
 					bg_color:'#fff',
 					day_color:'#555555',
 					today_color:'#112233',
 					month_color:'#333333',
 				},
 				xDate_day:[{//日历头部
 					day:"日"
 				},{
 					day:"一"
 				},{
 					day:"二"
 				},{
 					day:"三"
 				},{
 					day:"四"
 				},{
 					day:"五"
 				},{
 					day:"六"
 				}],
 				xDate_week:[]//日历日期内容
 			}
 		}
 	});
 }());