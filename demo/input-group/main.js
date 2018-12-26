/*
 * @Author: Fziqian
 * @Date: 2018-12-25 11:25:40
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-26 15:54:06
 * @功能: model
 */
$(function() {
  $($("#toggle4").data("target"))
    .on("show.bs.dropdown", function() {
      console.log("toggle4 show");
    })
    .on("hide.bs.dropdown", function() {
      console.log("toggle4 hide");
    });

  $("#toggle4").dropdown("toggle");
});
