/*
 * @Author: Fziqian
 * @Date: 2018-12-26 17:48:34
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-27 11:00:50
 * @功能: collapse.js学习
 */

$(function() {
  $("#btn-toggle").click(function() {
    $("#collapseJS").collapse("toggle");
  });
  $("#btn-show").click(function() {
    $("#collapseJS").collapse("show");
  });
  $("#btn-hide").click(function() {
    $("#collapseJS").collapse("hide");
  });
  // options
  // parent:(false|slector) default:false,
  // toggle:boolean default:true
  // events (show|shown|hide|hidden)
  $("#collapseJS")
    .on("show.bs.collapse", function(e) {
      console.log("collapse show");
      // if (true) {
      //   e.preventDefault();
      // }
    })
    .on("shown.bs.collapse", function(e) {
      console.log("collapse shown");
    })
    .on("hide.bs.collapse", function(e) {
      console.log("collapse hide");
    })
    .on("hidden.bs.collapse", function(e) {
      console.log("collapse hidden");
    });
});
