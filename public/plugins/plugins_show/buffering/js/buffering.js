
(function(){
	var Buffering = function(){

	};

	Buffering.prototype.init = function(view) {
		var me = this;
		var template = `<div class='nd-plugin-buffering-box'>
							<div class='mask'></div>
							<div class='nd-plugin-buffering-loader'>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>`;
		view.innerHTML = template;
		DD.Compiler.compile(view, view.$module);
		view.$forceRender = true;
	};

	Buffering.prototype.render = function(view) {
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
			var bufferingBox = document.querySelector(".nd-plugin-buffering-box");
			var bufferingBoxParents = bufferingBox.parentNode.parentNode;
			var bufferingBoxWidth = document.defaultView.getComputedStyle(bufferingBoxParents, null).width;
			var bufferingBoxHeight = document.defaultView.getComputedStyle(bufferingBoxParents, null).height;
			DD.css(bufferingBox, 'width', bufferingBoxWidth);
			DD.css(bufferingBox, 'height', bufferingBoxHeight);

			var mask = document.querySelector(".mask");
			DD.css(mask, 'width', bufferingBoxWidth);
			DD.css(mask, 'height', bufferingBoxHeight);
		};
	}

	DD.Plugin.create("buffering", Buffering);

	DD.createModule({
		el: '.plugin-buffering'
	});
}());