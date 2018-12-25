/*
 * @Author: Fziqian
 * @Date: 2018-12-25 17:27:21
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-25 17:50:35
 * @功能: modal模态框学习
 */
$(function() {
  $("#submit").on("click", function() {
    console.log("click submit");
    $("#demo-modal").modal("hide");//手动隐藏 /show:手动显示
  });
  // show:表示显示开始时
  $("#demo-modal").on("show.bs.modal", function(e) {
    /* var a = 1;
    if (a > 0) {
      e.preventDefault();// 可以阻止模态框显示
      return;
    } */
    console.log('modal show')
    var $button = $(e.relatedTarget); // Button that triggered the modal
    console.log($button);
    var $modal = $(this);
  });
  // shown:表示显示动作结束后
  $("#demo-modal").on("shown.bs.modal", function() {
    console.log("modal shown");
  });
  // hide:表示隐藏动作开始时
  $("#demo-modal").on('hide.bs.modal',function(e){
    /* var a = 1;
    if (a > 0) {
      e.preventDefault();// 可以阻止模态框隐藏
      return;
    } */
    console.log('modal hide')
  })
  // hidden:表示隐藏动作结束后
  $("#demo-modal").on('hidden.bs.modal',function(){
    console.log('modal hidden')
  })
});
