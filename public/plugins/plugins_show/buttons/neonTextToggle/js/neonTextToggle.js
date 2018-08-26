/**
 * NEON TEXT TOGGLE
 */

 (function(){
 	var Switcher=function(){

 	};
 	Switcher.prototype.init=function(view){
 		var me =this;
 		var template=
 		"<div class='nd-plugin-switcher-box'><div class='nd-plugin-switcher' id='on'>ON</div><div class='nd-plugin-switcher' id='off'>OFF</div></div>";
 		var dataValue=DD.attr(view,'dataValue');
 		view.$dataValue=dataValue;
 		view.removeAttribute('dataValue');
 		view.innerHTML=template;
 		DD.Compiler.compile(view,view.$module);
 		view.$forceRender=true;
 	};
 	Switcher.prototype.render=function(view){
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
 		function delayRender(){
 			var switcherON=view.querySelector("#on");
 			var switcherOFF=view.querySelector("#off");
 			var switcherBox=view.querySelector('.nd-plugin-switcher-box');
 			DD.css(switcherBox, 'background','#272727');
 			DD.css(switcherBox,'padding','0 20px');
 			DD.css(switcherBox, 'width','400px');
 			DD.css(switcherBox,'cursor','pointer');
 			DD.css(switcherON, 'display', 'inline-block');
 			DD.css(switcherON,'transition', '220ms ease-in-out');
 			DD.css(switcherOFF,'transition', '220ms ease-in-out');
 			DD.css(switcherON, 'margin-right', '20px');
 			DD.css(switcherOFF, 'display', 'inline-block');
 			DD.css(switcherBox, 'font-size', '100px');
 			DD.css(switcherBox, 'color', '#FF9900');
 			DD.css(switcherBox, 'text-shadow', '0 0 90px transparent');
 			DD.css(view, 'user-select', 'none');
 			if(data.switcher){
 				DD.css(switcherOFF,'color','#363636');
 				DD.css(switcherON,'color','#FFF');
 				DD.css(switcherON,'text-shadow','0 0 5px #fff,0 0 10px #fff,0 0 20px #FF9900,0 0 35px #FF9900,0 0 40px #FF9900,0 0 50px #FF9900');
 					DD.css(switcherOFF,'text-shadow','none');
 			}else{
 				DD.css(switcherOFF,'color','#FFF');
 				DD.css(switcherON,'color','#363636');
 				DD.css(switcherOFF,'text-shadow','0 0 5px #fff,0 0 10px #fff,0 0 20px #FF9900,0 0 35px #FF9900,0 0 40px #FF9900,0 0 50px #FF9900');
 					DD.css(switcherON,'text-shadow','none');
 			}
 			var clickEvent=function(e,d,v){
 				if(data[view.$dataValue]){
 					data[view.$dataValue] = false;
 					DD.css(switcherOFF,'color','#FFF');
 					DD.css(switcherON,'color','#363636');
 					DD.css(switcherOFF,'text-shadow','0 0 5px #fff,0 0 10px #fff,0 0 20px #FF9900,0 0 35px #FF9900,0 0 40px #FF9900,0 0 50px #FF9900');
 					DD.css(switcherON,'text-shadow','none');
 					
 				}else{
 					data[view.$dataValue] = true;
 					DD.css(switcherOFF,'color','#363636');
 					DD.css(switcherON,'color','#FFF');
 					DD.css(switcherON,'text-shadow','0 0 5px #fff,0 0 10px #fff,0 0 20px #FF9900,0 0 35px #FF9900,0 0 40px #FF9900,0 0 50px #FF9900');
 					DD.css(switcherOFF,'text-shadow','none');
 				}
 				view.$forceRender = true;
 			}

 			new DD.Event({
 				eventName:'click',
 				view:view,
 				handler:clickEvent
 			});
 		};
 	};

 	DD.Plugin.create('textSwitcher',Switcher);
 	DD.createModule({
 		el:'.plugin-switcher',
 		data:{
 			switcher:false
 		}
 	});
 }());