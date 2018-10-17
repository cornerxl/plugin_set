;(function(){
	var carous=function(){};
	carous.prototype={
		init:function(view){
			var tem=`<figure class='carous' x-model='img_ct'>
						<img src="{{url}}" alt="图片" x-repeat='imgs' class='img-trans'>
					</figure>
					<div class="spancont">
					<div class="span" x-model='img_ct'>
							<span class='inline-span' x-repeat='imgs'></span>
						</div>
					</div>`;
			view.innerHTML=tem;
		},
		render:function(view){
			var me=this;
			me.removespan=function(){
				me.span.forEach(function(i){
					DD.removeClass(i,'active');
				});
			};
			me.addspan=function(){
				var index=(me.imgs.length-me.count)%me.imgs.length;
				if(index<0)
					index+=me.imgs.length
				DD.addClass(me.span[index],'active');
			};
			me.updata=function(){
				clearInterval(window.timer);
				me.is_can=false;
				window.timer=setInterval(function(){
					me.is_can=false;
					me.count+=me.direct;
					me.removespan();
					me.addspan();
					me.content.style.transform = 'rotateY('+2*me.count*Math.PI/me.imgs.length+'rad)'
				},5000);
			};
			//获取旋转的y轴距离
			me.getheight=function(){
				var r=Math.PI*2;
				var rad=r/me.imgs.length;
				me.rotateZ=me.imgw/(2*Math.tan(rad/2));
			}
			setTimeout(function(){
				window.addEventListener('transitionend',function(){
					me.is_can=true;
				});
				me.is_can=false;
				me.count=0;
				me.direct=view.$getData().data.img_ct.direct;
				me.spans=view.querySelector('.span');
				me.content=document.querySelector('.carous');
				me.imgs=document.querySelectorAll('.img-trans');
				me.imgw=parseInt(DD.css(me.imgs[0],'width'));
				me.span=document.querySelectorAll('.inline-span');
				var temp=(me.imgs.length)*25;
				DD.css(me.spans,'width',temp+'px');
				me.getheight();
				me.content.style.transformOrigin = '50% 50% '+-1*me.rotateZ+'px';
				//transform-origin属性规定了旋转的点
				me.imgs.forEach(function(item,index){
					if(index){
						item.style.transformOrigin = '50% 50% '+-1*me.rotateZ+'px';
					}
					item.style.transform = 'rotateY('+index*Math.PI*2/me.imgs.length+'rad)'
				});
				me.removespan();
				me.addspan();
				me.updata();
			},0);
			new DD.Event({
				eventName:'swipeleft',
				view:view,
				handler:function(){
					if(me.is_can)
					{
						clearInterval(window.timer);
						me.is_can=false;
						me.count--;
						me.removespan();
				        me.addspan();
						me.content.style.transform = 'rotateY('+2*me.count*Math.PI/me.imgs.length+'rad)';
						me.updata();
					}
				}
			});
			new DD.Event({
				eventName:'swiperight',
				view:view,
				handler:function(){
					if(me.is_can)
					{
						clearInterval(window.timer);
						me.is_can=false;
						me.count++;
						me.removespan();
				        me.addspan();
						me.content.style.transform = 'rotateY('+2*me.count*Math.PI/me.imgs.length+'rad)';
						me.updata();
					}
				}
			});
		}
	};
	 DD.Plugin.create('carous', carous);
	 DD.createModule({
	 	el:'.carous_ct',
	 	data:{
	 		img_ct:{
	 			direct:-1,
	 			imgs:[{url:'img/1.jpg'},{url:'img/2.jpg'},{url:'img/3.jpg'},{url:'img/4.jpg'},{url:'img/1.jpg'},{url:'img/2.jpg'}]
	 		}
	 	},
	 	onBeforeFirstRender:function(){
	 		var me=this;
	 		if(window.data){
	 			if(window.data.right){
	 				me.data.img_ct.direct=1;
	 			}
	 			else{
	 				me.data.img_ct.direct=-1;
	 			}
	 		}
	 	}
	 });
})()