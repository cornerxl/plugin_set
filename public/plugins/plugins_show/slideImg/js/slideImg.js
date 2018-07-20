/**
 * Created by xll on 2017/11/27.
 */
(function () {
    var SlideImg = function () {

    }
    
    SlideImg.prototype.init = function (view) {
        var me = this;
        DD.addClass(view, 'nd-plugin-slideimg');
        var data = DD.attr(view, 'dataName');
        view.$dataName = data;
        var template = `<div class="nd-plugin-slideimg-box" x-model="slideImg">
                            <div class="nd-plugin-slideimg-img" style="left: 0;">
                                <img src="{{url}}" alt="" x-repeat="rows">
                            </div>
                            <div class="nd-plugin-slideimg-circle" >
                                <span class="nd-plugin-slideimg-onecircle" x-repeat="rows" x-class="{'nd-plugin-marleft': '$index>1'}" x-show="$index!==0"></span>
                            </div>
                        </div>`;
        view.innerHTML = template;
        DD.Compiler.compile(view, view.$module);
        view.$forceRender = true;
    }
    
    SlideImg.prototype.render = function (view) {
        var me = this;
        var data = view.$getData().data;
        var clone = DD.extend({}, data[view.$dataName]);
        data.$set("cloneSlideImg", clone);
        var len = data[view.$dataName].rows.length;
        var firstImg = DD.extend({}, data[view.$dataName].rows[0]);
        var lastImg = DD.extend({}, data[view.$dataName].rows[len - 1]);
        data.cloneSlideImg.rows.push(firstImg);
        // data.cloneSlideImg.rows.unshift(lastImg);
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
            var slideImgBox = document.querySelector(".nd-plugin-slideimg-box");
            var slideImg = document.querySelector(".nd-plugin-slideimg-img");
            var slideCircle = document.querySelector(".nd-plugin-slideimg-circle");
            var imgArr = document.querySelectorAll("img");
            var slideImgParents = slideImgBox.parentNode.parentNode;
            var slideImgBoxWidth = document.defaultView.getComputedStyle(slideImgParents, null).width;
            var slideIMgBoxHeight = document.defaultView.getComputedStyle(slideImgParents, null).height;
            var slideCircleArr = slideCircle.children;

            //设置img盒子的宽度
            DD.css(slideImg, 'width', parseInt(slideImgBoxWidth) * (len + 1) + 'px');
            DD.css(slideImg, 'height', slideIMgBoxHeight);
            DD.css(slideImg, 'left', '0px');
            //设置img的width,height
            imgArr.forEach(function (item, index) {
               DD.css(item, 'width', slideImgBoxWidth);
               DD.css(item, 'height', slideIMgBoxHeight);
            });

            //设置circle盒子的宽度及位置
            var slideCircleWidth = (data[view.$dataName].rows.length-1) * 10 + (data[view.$dataName].rows.length-2) * 5;
            DD.css(slideCircle, 'width', slideCircleWidth + 'px');
            DD.css(slideCircle, 'margin-left', -slideCircleWidth / 2 + 'px');
            //自动播放
            var timer;
            var index = 0;
            var moveTimes = 0;
            var translateX = 0;
            DD.addClass(slideCircleArr[index + 1], 'nd-plugin-slideimg-active');
            timer = setInterval(function () {
                next();

            }, 2000);
            function next() {
                DD.removeClass(slideCircleArr[index], 'nd-plugin-slideimg-active');
                translateX = -index * parseInt(slideImgBoxWidth) + (- moveTimes * (parseInt(slideImgBoxWidth) * len));
                if(moveTimes !== 0 && index === 1){
                    DD.css(slideImg, 'left', (moveTimes * (parseInt(slideImgBoxWidth) * len)) + 'px');
                }
                if(index === len){
                    index = 1;
                    moveTimes += 1;
                }else {
                    index += 1;
                }
                DD.css(slideImg, 'transform', 'translateX('+ translateX +'px)');
                DD.addClass(slideCircleArr[index], 'nd-plugin-slideimg-active');
            }

            function pre() {
                if(index === 0){
                    index === len;
                }
                DD.removeClass(slideCircleArr[index], 'nd-plugin-slideimg-active');
                translateX = -(index - 2) * parseInt(slideImgBoxWidth) + (- moveTimes * (parseInt(slideImgBoxWidth) * len));
                if(index === 1){
                    index = len;
                    moveTimes -= 1;
                }else {
                    index -= 1;
                }
                DD.css(slideImg, 'transform', 'translateX('+ translateX +'px)');
                DD.addClass(slideCircleArr[index], 'nd-plugin-slideimg-active');
                if(index === len){
                    DD.css(slideImg, 'left', (moveTimes * (parseInt(slideImgBoxWidth) * len)) + 'px');
                }
            }

            new DD.Event({
                eventName:'swipeleft',
                view:view,
                handler:function(e,d,v){
                    clearInterval(timer);
                    next();
                    timer = setInterval(next, 2000);
                }
            });
            new DD.Event({
                eventName:'swiperight',
                view:view,
                handler:function(e,d,v){
                    clearInterval(timer);
                    pre();
                    timer = setInterval(next, 2000);
                }
            });

            new DD.Event({
                eventName:'swipedown',
                view:view,
                handler:function(e,d,v){
                    console.log(222);
                    timer = setInterval(next, 2000);
                }
            });

            new DD.Event({
                eventName:'swipeup',
                view:view,
                handler:function(e,d,v){
                    console.log(111);
                    clearInterval(timer);
                }
            });
        }
    }

    DD.Plugin.create("slideimg", SlideImg);
}());