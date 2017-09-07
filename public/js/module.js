;(function (Icinga) {

    var Toplevelview = function (module) {
        this.module = module;
        this.initialize();
    };

    Toplevelview.prototype = {
        initialize: function () {
            var addCSSRule = function (sheet, selector, rules, index) {
                if ('insertRule' in sheet) {
                    sheet.insertRule(selector + '{' + rules + '}', index);
                } else if ('addRule' in sheet) {
                    sheet.addRule(selector, rules, index);
                } else {
                    Icinga.module.icinga.logger.debug('Can\'t insert CSS rule');
                }
            };

            var sheet = (function () {
                var style = document.createElement('style');
                // WebKit hack
                style.appendChild(document.createTextNode(''));
                document.head.appendChild(style);
                return style.sheet;
            })();

            addCSSRule(
                sheet,
                '#layout.twocols.wide-layout #col1.module-toplevelview,'
                + '#layout.twocols.wide-layout #col1.module-toplevelview ~ #col2',
                'width: 50%',
                0
            );

            this.module.on('click', '.tlv-view-tree .tlv-tree-node', this.processTreeNodeClick);
            this.module.on('rendered', this.collapseOnLoad);
        },

        processTreeNodeClick: function (event) {
            event.stopPropagation();
            var $el = $(event.currentTarget);
            var $parent = $el.parents('.tlv-tree-node');
            console.log($parent);
            var $all = $el.find('.tlv-tree-node');
            if (($parent.length === 0 && $all.hasClass('collapsed')) || $el.hasClass('collapsed')) {
                $el.removeClass('collapsed');
                $all.removeClass('collapsed');
            } else {
                $el.addClass('collapsed');
                $all.addClass('collapsed');
            }
        },

        collapseOnLoad: function (event) {
            var $el = $(event.currentTarget);
            console.log($el);
            $el.find('.tlv-view-tree .tlv-tree-node.collapsible.ok').addClass('collapsed');

        }
    };

    Icinga.availableModules.toplevelview = Toplevelview;
}(Icinga));
