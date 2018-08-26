 /**
* switcher
*/

(function(){
	var plugin_02001 = function(){

	};

	plugin_02001.prototype.init = function(view){
		var me = this;
		var template = "<div class='nd-plugin-switcher-box'>" +
						"<div class='nd-plugin-switcher-btn'></div></div>";
		DD.addClass(view, 'nd-plugin-switcher');
		var data = DD.attr(view,'dataItem') || 'data';
		//数据项名字
		view.$dataItem = data;
		//移除showItem
		view.removeAttribute('dataItem');
		view.innerHTML = template;
		DD.Compiler.compile(view, view.$module);
		view.$forceRender = true;
	}

	plugin_02001.prototype.render = function(view){
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
			//初始化设置switcher
			var switcherBox = view.querySelector(".nd-plugin-switcher-box");
			var switcherBtn = view.querySelector(".nd-plugin-switcher-btn");
			DD.css(switcherBox, 'width', data.data.switcherData.switcherWidth + 'px');
			DD.css(switcherBox, 'height', data.data.switcherData.switcherHeight + 'px');
			DD.css(switcherBox, 'border-radius', data.data.switcherData.switcherHeight + 'px');
			DD.css(switcherBox, 'padding', '1px');
			DD.css(switcherBox, 'box-shadow', '0px 0px 2px #B0B0B0 inset');
			DD.css(switcherBtn, 'width', data.data.switcherData.switcherHeight + 'px');
			DD.css(switcherBtn, 'height', data.data.switcherData.switcherHeight + 'px');
			DD.css(switcherBtn, 'background-color', data.data.switcherData.btnColor );
			DD.css(switcherBtn, 'border-radius', '50%');
			DD.css(switcherBtn, 'box-shadow', '0px 0px 2px #CDCDCD inset');
			var slideWidth = parseInt(data.data.switcherData.switcherWidth) - parseInt(data.data.switcherData.switcherHeight);
			if(data.switcher){
				DD.css(switcherBox, 'background-color', data.data.switcherData.openColor);
				DD.css(switcherBtn, 'margin-left', slideWidth + 'px');
			}else {
				DD.css(switcherBox, 'background-color', data.data.switcherData.closeColor);

			}


			//点击事件
			var clickEvent = function(e, d, v){
				data.switcher = !data.switcher;
				if(data.switcher){
					DD.css(switcherBtn, 'margin-left', slideWidth + 'px');
				}else {
					DD.css(switcherBtn, 'margin-left', 0);
				}

				DD.css(switcherBox, 'transition-property', 'border');
				DD.css(switcherBox, 'transition-duration', '400ms');
				DD.css(switcherBox, '-webkit-transition-property', 'border');
				DD.css(switcherBox, '-webkit-transition-duration', '400ms');
				DD.css(switcherBox, 'transition-property', 'box-shadow');
				DD.css(switcherBox, 'transition-duration', '400ms');
				DD.css(switcherBox, '-webkit-transition-property', 'box-shadow');
				DD.css(switcherBox, '-webkit-transition-duration', '400ms');
				DD.css(switcherBox, 'transition-property', 'background-color');
				DD.css(switcherBox, 'transition-duration', '1200ms');
				DD.css(switcherBox, '-webkit-transition-property', 'background-color');
				DD.css(switcherBox, '-webkit-transition-duration', '1200ms');
				DD.css(switcherBtn, 'transition-property', 'margin-left');
				DD.css(switcherBtn, 'transition-duration', '500ms');
				DD.css(switcherBtn, '-webkit-transition-property', 'margin-left');
				DD.css(switcherBtn, '-webkit-transition-duration', '500ms');
				DD.css(switcherBtn, '-moz-transition-property', 'margin-left');
				DD.css(switcherBtn, '-moz-transition-duration', '500ms');
				DD.css(switcherBtn, '-o-transition-property', 'margin-left');
				DD.css(switcherBtn, '-o-transition-duration', '500ms');
				view.$forceRender = true;
			}

			//添加按钮事件
			new DD.Event({
				eventName:'click',
				view:view,
				handler:clickEvent
			});
		}
	}

	DD.Plugin.create("plugin_02001", plugin_02001);
}());