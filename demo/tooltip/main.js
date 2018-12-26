/*
 * @Author: Fziqian
 * @Date: 2018-12-26 16:26:39
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-26 17:38:24
 * @功能: tooltip.js学习
 */
$(function() {
  // 使用tooltip时，必须通过以下方式手动触发
  // $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="tooltip"]').tooltip({
    animation: true,
    container: "body",
    delay: { show: 0, hide: 0 }, //延迟显示/隐藏 默认都是0
    html: false, // default false: 为避免XSS攻击，推荐false
    title: "",
    placement: "top", // default:top {string|function} (if string (top|bottom|left|right))
    selector: false, // 这个没看懂什么意思
    template:
      "<div class='tooltip'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div><div>lalala~~~</div></div>",
    trigger: "hover focus" // (hover|focus|click|manual)
  });
  /**
   * 关于 template 属性的说明：
   * Base HTML to use when creating the tooltip.
   * The tooltip's title will be injected into the .tooltip-inner.
   * .tooltip-arrow will become the tooltip's arrow.
   * The outermost wrapper element should have the .tooltip class.
   */
  //手动显示
  $("#btn").tooltip("show"); // (show|hide|toggle)
  //events (show|shown|hide|hidden|inserted)
  $("#btn2").on("show.bs.tooltip", function(e) {
    console.log("tooltip show");
  });
});
