/**
 * Created by xll on 2018/6/28.
 */
(function () {
    DD.createModule({
        name: 'm_plugin_download',
        el:'.el-downlist',
        templateUrl: HTMLURL + '/plugin_download/plugin_download.html',
        data:{
        	public_path:"/plugin_set/public/plugin/plugin_down/",
        	src:''
        },
        methods:{
        	download:function(){
        		var me=this;
        		var params={
        			  background:"red",
        			  border:1+'px'+" "+"solid"+" "+"black",
        		};
        		params["font-size"]="1px";
        		DD.request({
        			params:params,
        			url:"http://localhost:3000/test?",
        			successFunc:function(r){
        				me.data.src=me.data.public_path+r.split("/")[r.split('/').length-1];
        			}
        		});
        	},
        	close:function(){
        		me.data.show=false;
        	}
        }
    })
}())