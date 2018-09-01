/**
 * Created by xll on 2018/6/28.
 */
//from雷创科技
//write in 2018 6 22
window.data = {
    //粒子碰撞后回来的速度
    speed: 0.04,
    //图片的src属性
    src: '',
    //填充每一个小粒子的长和宽
    size: '',
    //粒子上升的速度如[2,4]是一个数组 只含2项目 第一个为最小速度 第二个为最大速度 带线啊哦
    item_speed: [],
};
(function() {
    DD.createModule({
        name: 'm_home',
        el: '.el-my-home',
        templateUrl: HTMLURL + '/home/home.html',
        data: {
            //在第一次渲染前就设置高度防止出现视觉差
            canvas_height: '',
            link_href: [{
                content: '首页',
                route: '/route/home',
            }, {
                content: '插件',
                route: '/route/plugin_list',
            }, {
                content: '下载',
                route: '/route/plugin_download',
            }],
            img_code: {
                url_o: '',
                url_t: ''
            },
            from: '技术支持 By 雷创科技&web技术实验室 2017',
            link_us: 'qq交流群:    451626028',
            cooperate: 'MIT开源协议',
        },
        onBeforeFirstRender: function() {
            var me = this;
            me.data.canvas_height = window.innerHeight - 80;
            var params={
                id_1:1002,
                id_2:1003
            }
            DD.request({
                params:params,
                rand:true,
                url: "http://localhost:3000/api/imgs?",
                successFunc: function(r) {
                    var imgs=JSON.parse(r);
                    me.data.img_code.url_o=imgs[0].img_path;
                    me.data.img_code.url_t=imgs[1].img_path;
                }
            });
            setTimeout(function() {
                window.partical.init();
            }, 200);
        },
        onFirstRender:function(){
            var me=this;
            me.module.send("m_home_loading",{show:false})
        }
    });
    var partical = {
        canvasct: document.querySelector('.canvasct'),
        canvas1: document.querySelector('.canvas'),
        canvas2: document.createElement('canvas'),
        partical: [],
        partical_len: '',
        height: '',
        width: '',
        offset_w: '',
        offset_h: '',
        loaded: false,
        src: '/plugin_set/public/img/home.png',
        img: new Image(),
        count1: 0,
        size: 4,
        speed: '',
        item_speed: '',
        img_h: '',
        img_w: '',
        jump: 4,
        init: function() {
            var me = this;
            me.canvasct = document.querySelector('.canvasct');
            me.canvas1 = document.querySelector('.canvas');
            me.canvas2 = document.createElement('canvas');
            me.css_set();
            me.config();
            me.canvas1.width = me.width;
            me.canvas1.height = me.height;
            me.canvas1 = me.canvas1.getContext('2d');
            if (!me.loaded) {
                var me = this;
                me.img.src = me.src;
                me.img.onload = function() {
                    me.img_w = me.img.width;
                    me.img_h = me.img.height;
                    if (me.img.width >= window.innerWidth) {
                        me.img_w = window.innerWidth;
                        me.img_h = window.innerHeight - 80;
                    }
                    // if (window.innerWidth < 500)
                    //     me.size = 3;
                    me.offset_h = (me.height - me.img_h) / 2;
                    me.offset_w = (me.width - me.img_w) / 2;
                    me.getpoint();
                }
                me.loaded = true;
            } else {
                me.overdraw();
            }
        },
        //配置一些在插件中更改的样式
        config: function() {
            var me = this;
            me.src = window.data.src || me.src;
            me.size = window.data.size || 4;
            me.speed = window.data.speed || 0.02;
            if (window.data && window.data.item_speed) {
                window.data.item_speed.sort((a,b)=>a-b);
            }
            me.item_speed = window.data.item_speed || [2, 6];
        },
        overdraw: function() {
            var me = this;
            me.canvas1.clearRect(0, 0, me.width, me.height);
            me.canvas1.drawImage(me.img, 0, 0, me.img.width, me.img.height, me.offset_w, me.offset_h, me.img_w, me.img_h);
        },
        css_set: function() {
            var me = this;
            me.height = window.innerWidth > 1000 ? window.innerHeight - 80 : window.innerHeight - 80;
            me.width = window.innerWidth;
            me.canvasct.style.height = me.height + 'px';
            me.canvasct.style.width = me.width + 'px';
        },
        getpoint: function() {
            var me = this;
            me.canvas2 = document.createElement('canvas');
            me.canvas2.height = me.height;
            me.canvas2.width = me.width;
            me.canvas2 = me.canvas2.getContext('2d');
            me.canvas2.drawImage(me.img, 0, 0, me.img.width, me.img.height, 0, 0, me.img_w, me.img_h);
            var data = me.canvas2.getImageData(0, 0, me.img_w, me.img_h).data;
            var jump = me.jump;
            var k = 0;
            for (var i = 0; i < me.img_h; i += jump) {
                for (var j = 0; j < me.img_w; j += jump) {
                    var index = (i * me.img_w) * 4 + j * 4;
                    if (data[index] === 0 && data[index + 1] === 0 && data[index + 2] === 0) {
                        k++;
                        continue;
                    }
                    var color = 'rgba(' + data[index] + ',' + data[index + 1] + ',' + data[index + 2] + ',' + data[index + 3] + ')';
                    me.birthpatical(i, j, color);
                }
            }
            me.partical_len = me.partical.length;
            me.drawpatical();
        },
        birthpatical: function(i, j, c) {
            var me = this;
            //x起始的x坐标
            var y = me.height;
            var x = me.width / 2 - Math.random() * 20 - 10;
            //取整开始的粒子不能太整齐
            var dwindex = ~~(Math.random() * 100);
            //粒子的初始的速度
            var speed = Math.random() * Math.sqrt(dwindex) * me.width / 500;
            if (speed < 2) {
                speed = 2 + Math.random() * 4;
            }
            if (speed > 6) {
                speed = 6;
            }
            me.partical.push({
                top: 0,
                x: x,
                y: y,
                endx: me.offset_w + j,
                endy: me.offset_h + i,
                speed: speed,
                //y和x方向的比值系数正负代表方向
                //dx为相对于原位置的x的偏移量
                dx: y / ((me.offset_w + j) - x),
                //速度变化的值
                dspe: Math.random() * 1,
                //防止太过整齐
                dwindex: dwindex,
                //颜色
                color: c,
                //先上去再下来
                down: false,
                //完成的标记位
                finished: false
            });
        },
        drawpatical: function() {
            var me = this;
            me.canvas1.clearRect(0, 0, me.width, me.height);
            me.partical.forEach(function(item, index, arr) {
                if (item.dwindex > me.count1)
                    return;
                if (item.finished) {
                    item.x = item.endx;
                    item.y = item.endy;
                    me.drawrect.call(me, item);
                    return;
                }
                if (!item.down) {
                    item.x += item.speed / item.dx;
                    item.y -= item.speed;
                    me.drawrect.call(me, item);
                    if (item.y <= item.top) {
                        item.x = item.endx;
                        item.down = true;
                    }
                } else {
                    item.speed += me.speed;
                    item.y += item.speed;
                    item.x = item.endx;
                    me.drawrect.call(me, item);
                    if (item.y >= item.endy) {
                        item.finished = true;
                        me.partical_len--;
                    }
                }
            });
            me.count1++;
            if (me.partical_len > 0) {
                window.requestAnimationFrame(me.drawpatical.bind(me));
            } else {
                me.overdraw();
            }
        },
        drawrect: function(item) {
            var me = this;
            var size = me.size;
            me.canvas1.fillStyle = item.color;
            me.canvas1.fillRect(item.x - size / 2, item.y - size / 2, size, size);
        }
    }
    window.partical = partical;
}());