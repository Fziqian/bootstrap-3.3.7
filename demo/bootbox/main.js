/*
 * @Author: Fziqian
 * @Date: 2018-12-27 15:37:01
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-27 17:42:35
 * @功能:  学习bootbox.js
 */
$(function() {
  //#region -------------------------------- alert --------------------------------------
  $("#alert1").click(function() {
    bootbox.alert("lalala~~~ <strong>hahaha</strong>");
  });
  $("#alert2").click(function() {
    bootbox.alert("lalala~~~", function() {
      bootbox.alert("this is alert's callback");
    });
  });
  $("#alert3").click(function() {
    bootbox.alert({
      size: "small", // small|large|无
      message: "lalalalala~~~",
      className: "animated bounce",
      callback: function() {
        bootbox.alert("this is alert's callback");
      },
      backdrop: true, // 点击背景可以隐藏alert
      buttons: {
        ok: {
          label: "<strong>@</strong>确定",
          className: "btn-info"
        }
      }
    });
  });
  //#endregion -------------------------------- alert --------------------------------------
  //#region  -------------------------------- confirm --------------------------------------
  $("#confirm1").click(function() {
    bootbox.confirm("确定。。。吗？",function(res){
      console.log(res);//res:(true|false)
    });
  });

  //#endregion -------------------------------- confirm --------------------------------------
});
