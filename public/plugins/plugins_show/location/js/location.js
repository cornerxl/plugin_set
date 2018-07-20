(function(){
	var Location = function() {
		var me = this;
		me.province = [
			{
				provinceTip: "A",
				evaryProvince: [
					{
						zhName: "安徽"
					}
				]
			},{
				provinceTip: "B",
				evaryProvince:[
					{
						zhName: "北京"
					}
				]
			},{
				provinceTip: "C",
				evaryProvince: [
					{
						zhName: "重庆"
					}
				]
			},{
				provinceTip: "F",
				evaryProvince: [
					{
						zhName: "福建"
					}
				]
			},{
				provinceTip: "G",
				evaryProvince: [
					{
						zhName: "甘肃"
					},{
						zhName: "广东"
					},{
						zhName: "广西"
					},{
						zhName: "贵州"
					}
				]
			},{
				provinceTip: "H",
				evaryProvince: [
					{
						zhName: "海南"
					},{
						zhName: "河北"
					},{
						zhName: "黑龙江"
					},{
						zhName: "河南"
					},{
						zhName: "湖北"
					},{
						zhName: "湖南"
					}
				]
			},{
				provinceTip: "J",
				evaryProvince: [
					{
						zhName: "江苏"
					},{
						zhName: "江西"
					},{
						zhName: "吉林"
					}
				]
			},{
				provinceTip: "L",
				evaryProvince: [
					{
						zhName: "辽宁"
					}
				]
			},{
				provinceTip: "N",
				evaryProvince: [
					{
						zhName: "内蒙古"
					},{
						zhName: "宁夏"
					}
				]
			},{
				provinceTip: "Q",
				evaryProvince: [
					{
						zhName: "青海"
					}
				]
			},{
				provinceTip: "S",
				evaryProvince: [
					{
						zhName: "山东"
					},{
						zhName: "上海"
					},{
						zhName: "陕西"
					},{
						zhName: "山西"
					},{
						zhName: "四川"
					}
				]
			},{
				provinceTip: "T",
				evaryProvince: [
					{
						zhName: "天津"
					}
				]
			},{
				provinceTip: "X",
				evaryProvince: [
					{
						zhName: "新疆"
					},{
						zhName: "西藏"
					}
				]
			},{
				provinceTip: "Y",
				evaryProvince: [
					{
						zhName: "云南"
					}
				]
			},{
				provinceTip: "Z",
				evaryProvince: [
					{
						zhName: "浙江"
					}
				]
			}
		];
	};

	Location.prototype.init = function(view){
		var me = this;
		var template = `<div class='nd-plugin-location-box'>
							<div class='nd-plugin-location-tipCity'>
								<div class='nd-plugin-location-tipCity-title'>
									<img class='nd-plugin-location-tipCity-title-img' src='img/hot.png'>
									<span class='nd-plugin-location-tipCity-title-name'>{{tipCityName}}</span>
								</div>
								<div class='nd-plugin-location-tipCity-list'>
									<span class='nd-plugin-location-tipCity-list-cityname nd-plugin-location-city' x-repeat='tipCity' x-class="{'nd-plugin-location-tipCity-list-marleft':'$index%3!==0','nd-plugin-location-tipCity-list-martop':'$index>2'}">{{cityName}}</span>
									<div class='clear'></div>
								</div>
							</div>`;
		DD.addClass(view, 'nd-plugin-location');
		var cityList = `<div class='nd-plugin-location-citylist'>`;
		me.province.forEach(function(item,index){
			cityList += `<div class='nd-plugin-location-citylist-group'>
						<span class='nd-plugin-location-citylist-group-tip'>`+ item.provinceTip + `</span>
						<div class='nd-plugin-location-citylist-group-city'>`;
			if(item.evaryProvince.length > 0){
				item.evaryProvince.forEach(function(items,indexs){
					cityList += `<span class='nd-plugin-location-citylist-group-city-item nd-plugin-location-city'>` + items.zhName + `</span>`
				});
			}
			cityList += `</div></div>`;
		});	
		cityList += `</div></div>`;
		template += cityList;
		//数据项名字
		var data = DD.attr(view,'dataName');
		view.$dataName = data;
		view.removeAttribute('dataName');
		//设置innerHTML
		view.innerHTML = template;
		DD.Compiler.compile(view, view.$module);	
		view.$forceRender = true;	
	}

	Location.prototype.render = function(view){
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
		function delayRender() {
			var citys = view.querySelectorAll(".nd-plugin-location-city");
			for (var i = 0; i < citys.length; i++) {
				//清除事件
				DD.getOwnProps(citys[i].$events).forEach(function(ev){
					citys[i].$events[ev].unbind();
				});
				var clickEvent = function(e, d, v){
					data[view.$dataName] = v.innerHTML || d.$fields.cityName;
					view.$forceRender = true;
				}

				//添加按钮事件
				new DD.Event({
					eventName:'click',
					delg: true,
					view:citys[i],
					handler:clickEvent
				});
			}
		}
	}

	DD.Plugin.create("location", Location);
	DD.createModule({
		el:'.test-location',
		data: {
			preLocation: "绵阳",
			tipCityName: "热门城市",
			tipCity: [
				{
					cityName: "杭州"
				},{
					cityName: "上海"
				},{
					cityName: "成都"
				},{
					cityName: "武汉"
				},{
					cityName: "北京"
				},{
					cityName: "重庆"
				},{
					cityName: "南京"
				},{
					cityName: "天津"
				},{
					cityName: "深圳"
				}
			]
		}
	})
}());
