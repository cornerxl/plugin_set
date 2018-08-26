;
(function() {
    var check_list = function() {};
    check_list.prototype = {
        init: function(view) {
            var template = `<div class="check-one">
    <div class="item" x-class="{'check':'yes'}">
        <svg id="_san_41014" class="fill" viewBox="0 0 24 24">
            <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
    </div>
    <div class="item" x-class="{'no-check':'!yes'}">
        <svg id="_san_2030" class="fill" viewBox="0 0 24 24">
            <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
    </div>
</div>
<div class="check-two">
    <div x-class="{'check':'yes_1'}">
        favorite
    </div>
    <div x-class="{'no-check':'!yes_1'}">
        favorite_border
    </div>
</div>
<div class="check-three">
    <div x-class="{'check':'yes_2'}">
        visibility_off
    </div>
    <div x-class="{'no-check':'!yes_2'}">
        visibility
    </div>
</div>
<div class="check-four">
    <div class="item" x-class="{'no-check':true}">
        <svg id="_san_2030" class="fill" viewBox="0 0 24 24">
            <path id="_san_2032" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
    </div>
</div>
<div class="check-five">
    <div class="item" x-class="{'check':true}">
        <svg id="_san_41014" class="fill" viewBox="0 0 24 24">
            <path id="_san_2038" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
    </div>
</div>`;
            view.innerHTML = template;
        },
        render: function(view) {
            setTimeout(function() {
                new DD.Event({
                    view: view.querySelector(".check-one"),
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        me.data.yes = !me.data.yes;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".check-two"),
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        me.data.yes_1 = !me.data.yes_1;
                    }
                });
                new DD.Event({
                    view: view.querySelector(".check-three"),
                    eventName: "click",
                    handler: function(e, d, v) {
                        var me = this;
                        me.data.yes_2 = !me.data.yes_2;
                    }
                });
            }, 0);
        }
    };
    DD.Plugin.create("check_list", check_list);
    DD.createModule({
        el: '.nd-plugin-check-list',
        data: {
            yes: true,
            yes_1:true,
            yes_2:true,
        }
    });
})()