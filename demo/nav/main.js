/*
 * @Author: Fziqian
 * @Date: 2018-12-26 16:07:50
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-26 16:22:44
 * @功能: tab.js学习
 */
$(function() {
  $("#myNav li a")
    .on("click", function(e) {
      e.preventDefault();
      $(this).tab("show");
    })
    .on("show.bs.tab", function(e) {
      console.log("tab show");
      console.log(e.relatedTarget);
    });
});
