/*---------------------------------------------------------------------------------------------
 *    对弹出框的二次封装，调用本脚本之前需要先引用 bootstrap.js, toastr.min.js,bootbox.js
 *    Created by houpengpeng on 2016/12/23.
------------------------------------------------------------------------------------------------*/
/*
 * 函数说明：通知框封装  在 toastr.js的基础上封装
 * 使用说明：使用之前需要引用toastr.js
 * 参数说明：
 *      parContent： 消息框的内容，为任意的HTML文本
 *      messageType: 消息类型 信息:info 警告:warning 成功:success 错误:error
 *      示例：DialogMessageBox(ret.Message, "success");
 */
function DialogMessageBox(parContent, messageType) {
    //非阻塞通知框
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    switch (messageType.toLowerCase()) {
        case "info": toastr.info(parContent); break;
        case "warning": toastr.warning(parContent); break;
        case "success": toastr.success(parContent); break;
        case "error": toastr.error(parContent); break;
        default: throw new Error("messagetype is unfinished");
    }
};

/*
 * 函数说明：对alert 类型弹出框封装
 * 参数说明：
 *       options:{
 *          title: '提示',
 *          message: 'message？',             //alert弹出框内容
 *          size: null,                       //弹出框的宽度， 有small，large, 默认为null
 *       }
 * 调用实例：
 *      AlertBox({ message:"内容" })
 *     如果不带标题  AlertBox({ title:null, message:"内容" })
 */
function AlertBox(options) {
    var defaults = {
        title: "提示",
        message: "",
        backdrop: true,
        size: null,   //size 有small，large
        buttons: {
            ok: {
                label: '确定',
            }
        }
    }
    var opts = $.extend(defaults, options);
    bootbox.alert(opts);
};

/*
 * 函数说明：对alert 类型弹出框封装
 * 参数说明：
 *      message: 弹出框要显示的内容
 */
function AlertMesageBox(message) {
    var defaults = {
        title: "提示",
        message: message,
        backdrop: true,
        size: null,   //size 有small，large
        buttons: {
            ok: {
                label: '确定',
            }
        }
    }
    bootbox.alert(defaults);
};

/*
 * 函数说明：对confirm 类型弹出框封装   默认有两个按钮
 * 参数说明：
 *       options:{
 *          title: '提示信息',
 *          message: '确认要删除XX吗？',                  //confirm弹出框内容
 *          size: null,                                   //弹出框的宽度， 有small，large, 默认为null
 *          cancelcallback:function(){},                  //取消按钮回调函数，默认为null
 *          confirmcallback:function(){}                  //确认按钮回调函数,默认为null
 *       }
 */
function ConfirmBox(options) {
    var defaults = {
        title: "提示信息",
        message: "",
        size: null,
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确认'
            }
        },
        callback: null
    };
   
    var opts = $.extend(defaults, options);

    opts.callback = function (result) {
        if (result) {
            var confirmcallback = options.confirmcallback == undefined ? null : options.confirmcallback;
            if (confirmcallback != null) {
                if ($.isFunction(confirmcallback)) {
                    confirmcallback.call();
                } else {
                    throw new Error("confirmcallback必须是function类型");
                }
            }

        } else {
            var cancelcallback = options.cancelcallback == undefined ? null : options.cancelcallback;
            if (cancelcallback != null) {
                if ($.isFunction(cancelcallback)) {
                    cancelcallback.call();
                } else {
                    throw new Error("cancelcallback必须是function类型");
                }
            }
        }
    };
    bootbox.confirm(opts);
};
/*
 * 函数说明：对confirm 类型弹出框封装
 *           默认有两个按钮
 * 参数说明：
 *      message:弹出框提示内容
 *      cancelcallback：点击取消按钮的回调函数
 *      confirmcallback：点击确认按钮的回调函数
 */
function ConfirmMessageBox(message, cancelcallback, confirmcallback) {
    var defaults = {
        title: "提示信息",
        message: "",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确认'
            }
        },
        callback: null  //点击确定按钮回调函数
    };
    defaults.callback = function (result) {
        if (result) {
            if (confirmcallback != null) {
                if ($.isFunction(confirmcallback)) {
                    confirmcallback.call();
                } else {
                    throw new Error("confirmcallback必须是function类型");
                }
            }

        } else {
            if (cancelcallback != null) {
                if ($.isFunction(cancelcallback)) {
                    cancelcallback.call();
                } else {
                    throw new Error("cancelcallback必须是function类型");
                }
            }
        }
    };
    bootbox.confirm(defaults);
};

/*
 * 函数说明：  自定义内容弹出框封装，内容可以是表格，默认带两个按钮           
 * 参数说明：
 *       options:{
 *          title: '新增',
 *          message: '<from></from>',                     //自定义弹出框内容，可以是HTML
 *          size: null,                                   //弹出框的宽度， 有small，large, 默认为null
 *          cancelcallback:function(){},                  //取消按钮回调函数，默认为null
 *          confirmcallback:function(){}                  //确认按钮回调函数,默认为null
 *       }
 * 返回结果： dialog 对象    
 * 调用实例： var dialog = DialogBox({title: "新增",  message: formObj});
 *            隐藏dialog.modal('hide');
 */
function DialogBox(options) {
    var defaults = {
        title: null,
        message: "",
        size: null,   //size 有small，large
        showIcon: true,
        buttons: {
            cancel: {
                label: '取消',
                callback: null
            },
            confirm: {
                label: '确认',
                callback: null
            }
        }
    }
    var opts = $.extend(defaults, options);
    opts.buttons["cancel"].callback = options.cancelcallback === undefined ? null : options.cancelcallback;
    opts.buttons["confirm"].callback = options.confirmcallback === undefined ? null : options.confirmcallback;

    if (opts.showIcon) {
        opts.buttons["cancel"].label = '<i class="fa fa-times"></i> 取消';
        opts.buttons["confirm"].label = '<i class="fa fa-check"></i> 确认';
    }
    var dialog = bootbox.dialog(opts);

    return dialog;
};
//var formgroups = [
//            { id: 'name', text: '姓名', inputType: 'text', valids: { IsValid: false, ValidLengthRange: '1,50' } },
//            { id: 'age', text: '年龄', inputType: 'text' },
//            { id: 'sex', text: '性别', inputType: 'select',options:[{value,text},{value,text}] }
//];

/*
 * 函数说明：  自定义内容弹出框封装，内容可以是表格
 *             默认有两个按钮
 * 参数说明：
 *       options:{
 *          id: 'modelform',                      //form控件ID
 *          title: '新增',
 *          formgroups:                           //自定义弹出框内容，可以是HTML
 *          [
 *               { id: 'name', text: '姓名', inputType: 'text', valids: { IsValid: false, ValidLengthRange: '1,50' } },
 *               { id: 'age', text: '年龄', inputType: 'text' },
 *               { id: 'sex', text: '性别', inputType: 'select',options:[{value:"1",text:"男"},{value:"2",text:"女"}] }
 *          ],            
 *          size: null,                          //弹出框的宽度， 有small，large, 默认为null
 *          cancelcallback:function(){},         //取消按钮回调函数，默认为null
 *          confirmcallback:function(){}         //确认按钮回调函数,默认为null
 *          initformcallbace:function(){}        //对表单初始化事件
 *       }
 * 返回 dialog 对象    
 *  调用 var dialog = DialogBox({title: "新增",  message: formObj});
 *      隐藏dialog.modal('hide');
 */
function ModelBox(options) {
    var defaults = {
        title: null,
        message: null,   //formgroups
        size: null,   //size 有small，large
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> 取消',
                callback: null
            },
            confirm: {
                label: '<i class="fa fa-check"></i> 确认',
                callback: null
            }
        }
    };
    var formgroupsDefaults = {
        id: null,
        text: null,
        inputType: "text",
        valids: null,
    };
    var formTemplates = {
        form:
          "<form class='form-horizontal' role='form'></form>",
        inputs: {
            text:
                "<div class='form-group'><label class='col-md-3 control-label'></label>"
                + "<div class='col-md-6'><input type='text' class='form-control' autocomplete='off'></div></div>",
            textarea:
              "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email:
                "<div class='form-group'><label class='col-md-3 control-label'></label>"
                + "<div class='col-md-6'><input type='email' class='form-control' autocomplete='off'></div></div>",
            select:
               " <div class='form-group'><label class='col-md-3 control-label'></label>"
              +"<div class='col-md-6'><select class='form-control'></select></div></div>",
            checkbox:
              "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date:
              "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time:
              "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number:
              "<div class='form-group'><label class='col-md-3 control-label'></label>"
                + "<div class='col-md-6'><input type='number' class='form-control' autocomplete='off'></div></div>",
            password:
                "<div class='form-group'><label class='col-md-3 control-label'></label>"
                + "<div class='col-md-6'><input type='password' class='form-control' autocomplete='off'></div></div>",
        }
    };
    var form = $(formTemplates.form);
    if (!options.id) {
        throw new Error("model的id属性不能为null");
    }
    form.attr("id", options.id);
    if (!options.title) {
        throw new Error("model的title属性不能为null");
    }
   
    var cancelcallback = options.cancelcallback == undefined ? null : options.cancelcallback;
    var confirmcallback = options.confirmcallback == undefined ? null : options.confirmcallback;
    if (cancelcallback != null) {
        if (!$.isFunction(cancelcallback)) {
            throw new Error("cancelcallback不是function类型");
        }
    }
    if (confirmcallback != null) {
        if (!$.isFunction(confirmcallback)) {
            throw new Error("confirmcallback不是function类型");
        }
    }
   
    if (!$.isArray(options.formgroups)) {
        throw new Error("formgroups不是一个数组");
    }

    if (!options.formgroups.length) {
        throw new Error("formgroups的length属性不能为null");
    }

    $.each(options.formgroups, function (index) {
        var $_this = $(this)[0];

        if (!$_this.id) {
            throw new Error("id属性不能为null");
        }
        if (!$_this.text) {
            throw new Error("text属性不能为null");
        }
        if (!$_this.inputType) {
            throw new Error("inputType属性不能为null");
        }
        if (!formTemplates.inputs[$_this.inputType]) {
            throw new Error("请检查inputType");
        }
        if ($_this.placeholder) {
            input.find("input").attr("placeholder", $_this.placeholder);
        }
        var input = $(formTemplates.inputs[$_this.inputType]);
        input.find("label").attr("for", $_this.id);
        input.find("label").html($_this.text);
        switch ($_this.inputType) {
            case "text":
            case "email":
            case "date":
            case "time":
            case "number":
            case "password":
                input.find("input").attr("id", $_this.id);
                break;
            case "select":
                var groups = {};
                var Options = $_this.options || [];
                if (!$.isArray(Options)) {
                    throw new Error("options必须是一个数组");
                }

                if (!Options.length) {
                    throw new Error("select options 必须有值");
                }
                $.each(Options, function (key, option) {
                    if (option.value === undefined || option.text === undefined) {
                        throw new Error("每一个 option 对象都需要一个’value‘ 和 a `text` property");
                    }
                    //先不考虑group情况
                    // var elem= "";
                    //if (option.group) {
                    //    // 如果有group, 则初始化 group 
                    //    if (!groups[option.group]) {
                    //        groups[option.group] = $("<optgroup/>").attr("label", option.group);
                    //    }

                    //    elem = groups[option.group];
                    //}
                    input.find("select").append("<option value='" + option.value + "'>" + option.text + "</option>");
                });
                input.find("select").attr("id", $_this.id);

                break;
            case "checkbox":
                //对checkbox特殊处理
                break;
        }
        if ($_this.valids) {
            $.each($_this.valids, function (key, value) {
                input.find("input").attr(key, value);
            });
        }
       
        form.append(input);
       
    });
   
    defaults.message = form;
    var opts = $.extend(defaults, options);
   
    var dialog = bootbox.dialog(opts);
    //初始化验证 需要在这之前引用相关验证函数脚本文件
    InitBlurValidByDiv(options.id);
    return dialog;
};

