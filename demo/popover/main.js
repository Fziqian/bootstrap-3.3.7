/*
 * @Author: Fziqian
 * @Date: 2018-12-26 17:25:06
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-26 17:38:55
 * @功能:  popover.js学习
 */
$(function() {
  // popover需要手动开启
  // $('[data-toggle=popover]').popover();
  $("[data-toggle=popover]").popover({
    animation: true,
    container: "body",
    delay: { show: 0, hide: 0 }, //延迟显示/隐藏 默认都是0
    html: false, // default false: 为避免XSS攻击，推荐false
    title: "",
    placement: "right", // default:right {string|function} (if string (top|bottom|left|right))
    selector: false, // 这个没看懂什么意思
    template:
      '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    trigger: "click" // (hover|focus|click|manual)
  });
  /**
   * 关于 template 属性的说明：
   * Base HTML to use when creating the popover.
   * The popover's title will be injected into the .popover-title.
   * The popover's content will be injected into the .popover-content.
   * .arrow will become the popover's arrow.
   * The outermost wrapper element should have the .popover class.
   */
  //手动显示/隐藏 (show|hide|toggle)
  $("#btn")
    .popover("toggle")
    .popover("hide");
});
