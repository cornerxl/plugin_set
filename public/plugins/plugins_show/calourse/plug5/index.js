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
				var index=me.count%me.imgs.length;
				if(index<0)
					index+=me.imgs.length
				DD.addClass(me.span[index],'active');
			};
			me.updata=function(){
				clearInterval(window.timer);
				me.is_can=false;
				window.timer=setInterval(function(){
					me.is_can=false;
					me.count++;
					me.removespan();
					me.addspan();
					me.content.style.transform = 'rotateY('+2*me.count*Math.PI/me.imgs.length+'rad)'
				},5000);
			};
			setTimeout(function(){
				window.addEventListener('transitionend',function(){
					me.is_can=true;
				});
				me.is_can=false;
				me.count=0;
				me.content=document.querySelector('.carous');
				me.imgs=document.querySelectorAll('.img-trans');
				me.imgw=parseInt(DD.css(me.imgs[0],'width'));
				me.span=document.querySelectorAll('.inline-span');
				me.content.style.transformOrigin = '50% 50%'+-1*me.imgw/2+'px';
				me.pi=Math.PI*2;
				me.imgs.forEach(function(item,index){
					if(index){
						item.style.transformOrigin = '50% 50% '+-1*me.imgw/2+'px';
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
					console.log(me.is_can);
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
	 			imgs:[{url:'1.jpg'},{url:'2.jpg'},{url:'3.jpg'},{url:'4.jpg'}]
	 		}
	 	}
	 });
})()