/**
 * @author cfx
 * @date 2018/8/4
 * @Description: 插件使用说明
 */

(function () {
    DD.createModule({
        name: 'm_plugin_instruction',
        templateUrl: HTMLURL + '/plugin_list/plugin_instruction/plugin_instruction.html',
        requires: [
            {type:'js',path:PLUGINURL + '/plugins_show/example/page_1/js/index.js'},
            {type:'css',path:PLUGINURL + '/plugins_show/example/page_1/css/index.css'},
            {type:'css',path:CSSURL + '/plugin_instruction.css'}
        ],
        data: {},
        modules:[{
            name:"m_instruction_example",
            el:'.el-instruction-example',
            data: {
                page: 1,
                row: 10,
                total:0,
                to_page:1,
                allpage:0,
            }
        }]
    });
}());