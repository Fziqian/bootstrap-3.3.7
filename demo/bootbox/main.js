/*
 * @Author: Fziqian
 * @Date: 2018-12-27 15:37:01
 * @Last Modified by: Fziqian
 * @Last Modified time: 2018-12-28 11:17:49
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
      closeButton: false,
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
    bootbox.confirm("确定。。。吗？", function(res) {
      console.log(res); //res:(true|false)
    });
  });
  $("#confirm2").click(function() {
    bootbox.confirm({
      size: "large",
      message: "确定吗？",
      callback: function(ret) {
        if (ret) {
          bootbox.alert({ size: "small", message: "确定" });
        } else {
          bootbox.alert({ size: "small", message: "取消" });
        }
      },
      buttons: {
        confirm: {
          label: "确定",
          className: "btn btn-success"
        },
        cancel: {
          label: "取消",
          className: "btn btn-danger"
        }
      },
      className: "animated bounce",
      backdrop: true
    });
  });

  //#endregion -------------------------------- confirm --------------------------------------
  //#region  -------------------------------- prompt --------------------------------------
  $("#prompt1").click(function() {
    bootbox.prompt("请输入。。。", function(text) {
      console.log(text);
    });
  });
  $("#prompt2").click(function() {
    bootbox.prompt({
      title: "请输入。。。",
      inputType: "checkbox", // (checkbox|select)
      inputOptions: [
        { text: "北京", value: "BJ" },
        { text: "上海", value: "SH" },
        { text: "广州", value: "GZ" }
      ],
      callback: function(ret) {
        console.log(ret);
      },
      buttons: {
        confirm: {
          label: "确定",
          className: "btn btn-success"
        },
        cancel: {
          label: "取消",
          className: "btn btn-danger"
        }
      },
      backdrop: true,
      size: "large"
    });
  });
  $("#prompt3").click(function() {
    bootbox.prompt({
      title: "请输入时间:",
      size: "small",
      inputType: "date", // (date|email|number|password|textarea|time)
      callback: function(date) {
        console.log(date);
      },
      buttons: {
        confirm: {
          label: "确定",
          className: "btn-success"
        },
        cancel: {
          label: "取消",
          className: "btn-danger"
        }
      }
    });
  });
  //#endregion -------------------------------- prompt --------------------------------------
  //#region  -------------------------------- dialog --------------------------------------
  $("#dialog1").click(function() {
    var dialog = bootbox.dialog({
      message: '<p className="text-center bg-info">please wait...</p>',
      closeButton: false,
      className: "animated bounce"
    });
    setTimeout(function() {
      dialog.modal("hide");
    }, 1500);
  });
  $("#dialog2").click(function() {
    var dialog = bootbox.dialog({
      title: "plase wait",
      message: '<p class="bg-warning">loading...</p>'
    });
    dialog.init(function() {
      setTimeout(() => {
        dialog
          .find(".bootbox-body")
          .html(
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi pariatur cum et non quibusdam perferendis animi, aut reprehenderit magni nemo illum, quod ab, fugit modi maiores corporis officia voluptatibus impedit."
          );
      }, 2000);
    });
  });
  $("#dialog3").click(function() {
    bootbox.dialog({
      title:'buttons',
      message:'<p className="bg-info">试试点击下面的按钮吧</p>',
      buttons:{
        cancel:{
          label:'取消',
          className:'btn btn-danger',
          callback:function(){
            console.log('点击了取消')
          }
        },
        noclose:{
          label:'不关闭',
          className:'btn btn-warning',
          callback:function(){
            console.log('点击按钮不能关闭')
            return false
          }
        },
        ok:{
          label:'确定',
          className:'btn btn-success',
          callback:function(){
            console.log('点击了确定')
          }
        }
      }
    })
  });
  //#endregion  -------------------------------- dialog --------------------------------------
});
