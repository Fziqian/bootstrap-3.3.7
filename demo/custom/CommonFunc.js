/*
 * 该脚本文件存放经常使用并且可以复用的JS函数，以减少重复写代码
 * 添加函数的时候请不要与现有的函数重名
 * 如果要调用该文件，请放在最后面调用，以保证其引用的正确性
 * sbin amend 2010-07-09
 */

//是否验证通过
var IsValidPass = false;

// 定义BoolType
if (typeof BoolType == "undefined") {
    var BoolType = {};
    BoolType.And = "and";
    BoolType.Or = "or";
    BoolType.Not = "not";
}


//设置表格的普通样式，即设置字体和提示信息
function SetStyle(value, object, record) {
    return "<div style='font-family:宋体; font-size:12px'>" + value + "</div>";
}

function SetNullStyle(value, object, record) {
    if (value !=null)
        return "<div style='font-family:宋体; font-size:12px'>" + value + "</div>";
    else return "<div style='font-family:宋体; font-size:12px'>" + "" + "</div>";
}

//根据出生日期获取年龄
function GetAgeByBirth(str) {
    if (str == undefined || str == null || str == "") return null;
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return null;
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return Y - r[1];
    }
    return null;
}

//替换敏感字符
function ReplaceJs(str) {
    if (str != null) {
        str = str.replace(/\"/g, "&quot;");
        str = str.replace(/\(/g, "&#40;");
        str = str.replace(/\)/g, "&#41;");
        str = str.replace(/%/g, "&#37;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }

    return str;
}

function SetPasswordStyle(value, object, record) {
    return "<div style='font-family:宋体; font-size:12px' >******</div>";
}

//设置性别的展示样式
function SetGenderStyle(value, object, record) {
    var ret = "";
    if (value == "1") {
        ret = "<div style='font-family:宋体; font-size:12px' >男</div>";
    } else if (value == "2") {
        ret = "<div style='font-family:宋体; font-size:12px' >女</div>";
    } else if (value == "0") {
        ret = "<div style='font-family:宋体; font-size:12px' >不确定</div>";
    } else if (value == "-1") {
        ret = "<div style='font-family:宋体; font-size:12px' >未知</div>";
    }
    return ret;
}

/**  
 * 时间对象的格式化;  
 */  
Date.prototype.format = function(format) {   
    /*  
     * eg:format="yyyy-MM-dd hh:mm:ss";  
     */
    var o = {
        "M+" :this.getMonth() + 1, // month   
        "d+" :this.getDate(), // day   
        "h+" :this.getHours(), // hour   
        "m+" :this.getMinutes(), // minute   
        "s+" :this.getSeconds(), // second   
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter   
        "S" :this.getMilliseconds()   
    // millisecond   
    }
    if (/(y+)/.test(format)) {   
        format = format.replace(RegExp.$1, (this.getFullYear() + "")   
                .substr(4 - RegExp.$1.length));   
    }  
    for ( var k in o) {   
        if (new RegExp("(" + k + ")").test(format)) {   
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]   
                    : ("00" + o[k]).substr(("" + o[k]).length));   
        }   
    }   
    return format;   
}

/**//*功能:返回与某日期相距N天(N个24小时)的日期
*参数:numnumber类型可以为正负整数或者浮点数,默认为1;
*　　　　type0(秒)or1(天),默认为天
*返回:新的Date对象
*/
Date.prototype.dateAfter = function (num, type) {
    num = (num == null ? 1 : num);
    if (typeof (num) != "number") throw new Error(-1, "dateAfterDays(num,type)的num参数为数值类型.");
    type = (type == null ? 1 : type);
    var arr = [1000, 86400000];
    return new Date(this.valueOf() + num * arr[type]);
}

//判断是否是闰年,返回true或者false
Date.prototype.isLeapYear = function () {
    var year = this.getFullYear();
    return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
}

//返回该月天数
Date.prototype.getDaysOfMonth = function () {
    return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate();
}

//日期比较函数,参数date:为Date类型,如this日期晚于参数:1,相等:0早于:-1
Date.prototype.dateCompare = function (date) {
    if (typeof (date) != "object" || !(/Date/.test(date.constructor)))
        throw new Error(-1, "dateCompare(date)的date参数为Date类型.");
    var d = this.getTime() - date.getTime();
    return d > 0 ? 1 : (d == 0 ? 0 : -1);
}

/**//*功能:返回两日期之差
*参数:pd　PowerDate对象
*　　type:返回类别标识.yy:年,mm:月,ww:周,dd:日,hh:小时,mi:分,ss:秒,ms:毫秒
*　　intOrFloat:返回整型还是浮点型值0:整型,不等于0:浮点型
*　　output:输出提示,如:时间差为#周!
*/
Date.prototype.calDateDistance = function (date, type, intOrFloat, output) {
    if (typeof (date) != "object" || !(/Date/.test(date.constructor)))
        throw new Error(-1, "calDateDistance(date,type,intOrFloat)的date参数为Date类型.");
    type = (type == null ? 'dd' : type);
    if (!((new RegExp(type + ",", "g")).test("yy,mm,ww,dd,hh,mi,ss,ms,")))
        throw new Error(-1, "calDateDistance(pd,type,intOrFloat,output)的type参数为非法.");
    var iof = (intOrFloat == null ? 0 : intOrFloat);
    var num = 0;
    var o = {
        "ww": 7 * 86400000,
        "dd": 86400000,
        "hh": 3600000,
        "mi": 60000,
        "ss": 1000,
        "ms": 1
    }
    switch (type) {
        case "yy": num = this.getFullYear() - date.getFullYear(); break;
        case "mm": num = (this.getFullYear() - date.getFullYear()) * 12 + this.getMonth() - date.getMonth(); break;
        default:
            var sub = this.valueOf() - date.valueOf();
            if (o[type])
                num = (sub / o[type]).fmtRtnVal(iof);
            break;
    }
    return (output ? output.replace(/#/g, "" + num + "") : num);
}


// 时间戳日期格式化 Date(1436457600000)
function UnixDateFormat(dateStr, format) {
    if (dateStr == null || dateStr == "") {
        return "";
    }
    var date = new Date(parseInt(dateStr.replace("/Date(", "").replace(")/", ""), 10));
    return date.format(format);
}



// 日期格式化
function DateFormat(dateStr, format) {
    var date = new Date(dateStr);
    return date.format(format);
}

//设置只显示日期的的样式
function SetDateStyle(value) {
    if (value == null || value.length < 1) {
        return "";
    }

    value = value.replace(new RegExp('(^|[^\\\\])\/Date\\((-?[0-9]+)\\)\/', 'g'), "$1new Date($2)");
    value = eval("(" + value + ")");
    value = value.format("yyyy-MM-dd");
    value = value == "1-01-01" ? "" : value;
    return value;
}

//设置只显示时间的的样式
function SetTimeStyle(value) {
    if (value == null || value.length < 1) {
        return "";
    }
    value = value.replace(new RegExp('(^|[^\\\\])\/Date\\((-?[0-9]+)\\)\/', 'g'), "$1new Date($2)");
    value = eval("(" + value + ")");
    value = value.format("hh:mm:ss");
    return value;
}

//设置显示日期和时间的样式
function SetDateTimeStyle(value) {
    if (value == null || value.length < 1) {
        return "";
    }
    value = value.replace(new RegExp('(^|[^\\\\])\/Date\\((-?[0-9]+)\\)\/', 'g'), "$1new Date($2)");
    value = eval("(" + value + ")");
    value = value.format("yyyy-MM-dd hh:mm:ss");
    value = value == "yyyy-1-1 8:00:00" ? "" : value;
    return value;
}

//设置显示日期和时间的样式 yyyy-MM-dd hh:mm:ss
function SetDateTimeStyleNormal(value) {
    if (value == null || value.length < 1) {
        return "";
    }
    value = value.replace(new RegExp('(^|[^\\\\])\/Date\\((-?[0-9]+)\\)\/', 'g'), "$1new Date($2)");
    value = eval("(" + value + ")");
    value = value.format("yyyy-MM-dd hh:mm:ss");
    value = value == "yyyy-01-01 08:00:00" ? "" : value;
    return value;
}

//获取距离今天前几天或者后几天的日期
//如 前天："+GetDateStr(-2)
//   昨天："+GetDateStr(-1)
//   今天："+GetDateStr(0)
//   明天："+GetDateStr(1)
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期    
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期    
    var d = dd.getDate();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}

//获取指定日期前一天日期
function getYestoday(date) {
    var yesterday_milliseconds = date.getTime() - 1000 * 60 * 60 * 24;
    var yesterday = new Date();
    yesterday.setTime(yesterday_milliseconds);

    var strYear = yesterday.getFullYear();
    var strDay = yesterday.getDate();
    var strMonth = yesterday.getMonth() + 1;
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    datastr = strYear + "-" + strMonth + "-" + strDay;
    return datastr;
}

//获得上个月在昨天这一天的日期   
function getLastMonthYestdy(date) {
    var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
    var strYear = date.getFullYear();
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    if (strYear % 4 == 0 && strYear % 100 != 0) {
        daysInMonth[2] = 29;
    }
    if (strMonth - 1 == 0) {
        strYear -= 1;
        strMonth = 12;
    }
    else {
        strMonth -= 1;
    }
    strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    datastr = strYear + "-" + strMonth + "-" + strDay;
    return datastr;
}

//获得上一年在昨天这一天的日期  
function getLastYearYestdy(date) {
    var strYear = date.getFullYear() - 1;
    var strDay = date.getDate();
    var strMonth = date.getMonth() + 1;
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    datastr = strYear + "-" + strMonth + "-" + strDay;
    return datastr;
}

//获得n天、或n个月、或n年前/后的日期时间
//参数说明：
//        n：时间间隔（n取负数表示n天 / 月 / 年前）
// timeUnit: 时间单位（timeUnit，取值"d"、"M"、"y"分别表示天，月，年）
function initDefaultDate(n, timeUnit) {
    var curr_date = new Date();
    if (timeUnit === 'd') {
        curr_date.setDate(curr_date.getDate() + n);
    } else if (timeUnit === 'M') {
        curr_date.setMonth(curr_date.getMonth() + n);
    } else if (timeUnit === 'y') {
        curr_date.setFullYear(curr_date.getFullYear() + n);
    }
    var strYear = curr_date.getFullYear();
    var strMonth = curr_date.getMonth() + 1;
    var strDay = curr_date.getDate();
    //var strHours = curr_date.getHours();
    //var strMinutes = curr_date.getMinutes();

    //var datastr = strYear + '-' + formatNumber(strMonth) + '-'
    //    + formatNumber(strDay) + ' ' + formatNumber(strHours) + ':' + formatNumber(strMinutes);
    var datastr = strYear + '-' + formatNumber(strMonth) + '-'
       + formatNumber(strDay);
    return datastr;
}
//简易格式化显示日期的函数，作用为自动补0，如1=01。
function formatNumber(value) {
    return (value < 10 ? '0' : '') + value;
}

//将Bool型的数据显示成为checkbox的形式
function CheckRender(val) {
    val = val.toString().toLowerCase();
    if (val == 'true' || val == 'yes' || val == '1') {
        return "<input type='checkbox' checked='checked' />";
    }
    else {
        return "<input type='checkbox' />";
    }
}

function loading($obj){
    if (!$obj) return;

    $obj.append(' <div class="csm_load"><div class="csm_loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>');
}

function loadingHide($obj) {
    if (!$obj) return;

    $obj.find(".csm_load").remove();
}

//点击页签的切换的事件
function tabClick(idx, count) {
    for (i_tr = 0; i_tr < count; i_tr++) {
        if (i_tr == idx) {
            var tabImgLeft = document.getElementById('tabImgLeft__' + idx);
            var tabImgRight = document.getElementById('tabImgRight__' + idx);
            var tabLabel = document.getElementById('tabLabel__' + idx);
            var tabContent = document.getElementById('tabContent__' + idx);

            tabImgLeft.src = BasePath + '/Content/Images/Menu/tab_active_left.gif';
            tabImgRight.src = BasePath + '/Content/Images/Menu/tab_active_right.gif';
            tabLabel.style.backgroundImage = "url(" + BasePath + "/Content/Images/Menu/tab_active_bg.gif)";
            tabContent.style.visibility = 'visible';
            tabContent.style.display = 'block';
            continue;
        }
        var tabImgLeft = document.getElementById('tabImgLeft__' + i_tr);
        var tabImgRight = document.getElementById('tabImgRight__' + i_tr);
        var tabLabel = document.getElementById('tabLabel__' + i_tr);
        var tabContent = document.getElementById('tabContent__' + i_tr);

        tabImgLeft.src = BasePath + '/Content/Images/Menu/tab_unactive_left.gif';
        tabImgRight.src = BasePath + '/Content/Images/Menu/tab_unactive_right.gif';
        tabLabel.style.backgroundImage = "url(" + BasePath + "/Content/Images/Menu/tab_unactive_bg.gif)";
        tabContent.style.visibility = 'hidden';
        tabContent.style.display = 'none';
    }
    document.getElementById('FrameWork_YOYO_LzppccSelectIndex').value = idx;
}

function CreateFilterItem(itemDivName, tableDivName, colModelConfig, itemTypes, isMultiTitleRow) {
    //多表头的情况下请使用下面的这行代码
    if (isMultiTitleRow) {
    	$("#"+itemDivName).html($($("#"+tableDivName).find("table")[1]).find("thead").parent().html());
    }
    else {
        $("#"+itemDivName).html($("#"+tableDivName).find("table").find("thead").parent().html());
    }
    var nCount = $("#"+tableDivName).find("table").find("thead").find("td").length;
    for (i = 0; i < nCount; i++) {
        InnerStr = "";
        nWidth = $($("#"+itemDivName).find("THEAD").find("TD")[i]).css("width");
        nWidth = nWidth.substring(0, nWidth.length - 2) - 4;
        if (i == '0') {
            InnerStr = "<input type='checkbox' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' />";
        } else {
            if (itemTypes[i - 1].toLowerCase() == "select") {
                InnerStr = "<select style='width:" + nWidth + "px' id='" + colModelConfig[i].dataIndex + "'></select>";
            }
            else if (itemTypes[i - 1].toLowerCase() == "password") {
                InnerStr = "<input type='hidden' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' />";
            }
            else if (itemTypes[i - 1].toLowerCase() == "int") {
                InnerStr = "<input type='text' textType = 'int' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' />";
            }
            else {
                InnerStr = "<input type='text' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' />";
            }
        }

        $("#"+itemDivName).find("THEAD").find("TD")[i].innerHTML = InnerStr;
    }
}
/*
* 创建基于表格的查询条件元素，带有选择器列，支持文本和下拉
* 参数：
* itemDivName:包含查询条件元素的Div的名字
* tableDivName:表格Div的名字
* colModelConfig:表格的ColModel对象的Config属性
* itemTypes:元素类型数组，不包含选择器列，支持select(下拉框)和text(文本框)，不区分大小写
* validList:元素验证信息；notnull:非空验证，int:整数验证
* isMultiTitleRow:是否是多表头表格
* */
function CreateValidFilterItem(itemDivName, tableDivName, colModelConfig, itemTypes, validList, isMultiTitleRow) {
    //多表头的情况下请使用下面的这行代码
    if (isMultiTitleRow) {
        $("#" + itemDivName).html($($("#" + tableDivName).find("table")[1]).find("thead").parent().html());
    }
    else {
        $("#" + itemDivName).html($("#" + tableDivName).find("table").find("thead").parent().html());
    }
    var nCount = $("#" + tableDivName).find("table").find("thead").find("td").length;
    for (i = 0; i < nCount; i++) {
        InnerStr = "";
        nWidth = $($("#" + itemDivName).find("THEAD").find("TD")[i]).css("width");
        nWidth = nWidth.substring(0, nWidth.length - 2) - 4;
        if (i == '0') {
            InnerStr = "<input type='checkbox' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' />";
        } else {
            //验证信息
            var parVidStr = GetValidStr(validList[i - 1]);
            if (itemTypes[i - 1].toLowerCase() == "select") {
                InnerStr = "<select style='width:" + nWidth + "px' id='" + colModelConfig[i].dataIndex + "' caption='" + colModelConfig[i].header + "' " + parVidStr + "></select>";
            }
            else if (itemTypes[i - 1].toLowerCase() == "password") {
                InnerStr = "<input type='hidden' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' caption='" + colModelConfig[i].header + "' " + parVidStr + "/>";
            }
            else if (itemTypes[i - 1].toLowerCase() == "int") {
                InnerStr = "<input type='text' textType = 'int' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' caption='" + colModelConfig[i].header + "' " + parVidStr + "/>";
            }
            else {
                InnerStr = "<input type='text' id='" + colModelConfig[i].dataIndex + "' style='width:" + nWidth + "px' caption='" + colModelConfig[i].header + "' " + parVidStr + "/>";
            }
        }

        $("#" + itemDivName).find("THEAD").find("TD")[i].innerHTML = InnerStr;
    }
}
//验证附加属性
function GetValidStr(validType) {
    var parVidStr = "";
    if (validType.toLowerCase() == "notnull") {
        parVidStr = "IsValid = 'false' ValidNull='true'";
    } else if (validType.toLowerCase() == "int") {
        parVidStr = "IsValid = 'false' ValidInt='true'";
    }
    return parVidStr;
}
/*
*  改变表头宽度的时候执行的方法
*  参数说明： GridDivId： 表格所在的Div的ID，一般默认为"hello"
*            FilterDivId: 过滤条件所在的Table的ID，一般默认为"FilterDiv"
*/
function AutoFitGridWidth(GridDivId, FilterDivId) {
//多表头的情况下请使用下面的这行代码
var DataArr = new Array();
var nCount = $("#" + FilterDivId).find("THEAD").find("TD").length;
for (i = 0; i < nCount; i++) {
    var TdNode = $($("#" + FilterDivId).find("THEAD").find("TD")[i]);
    var DataNode = null;
    if (TdNode.find("input")[0] != null) {
        DataNode = TdNode.find("input")[0];
    } else {
        DataNode = TdNode.find("select")[0];
    }
    DataArr[i] = DataNode;
}

$("#" + FilterDivId).html($("#" + GridDivId).find("table").find("thead").parent().html());

for (i = 0; i < nCount; i++) {
    InnerStr = "";
    nWidth = $($("#" + GridDivId).find("table").find("thead").find("TD")[i]).css("width");
    nWidth = nWidth.substring(0, nWidth.length - 2) - 4;
    nWidth = nWidth + "px";
    var obj = DataArr[i];
    if (obj != null) {
        obj.style.width = nWidth;
    }
    $("#" + FilterDivId).find("THEAD").find("TD")[i].innerHTML = obj.outerHTML;
}
}

/*
*  改变表头列的顺序的时候执行的方法
*  参数说明： GridDivId： 表格所在的Div的ID，一般默认为"hello"
*            FilterDivId: 过滤条件所在的Table的ID，一般默认为"FilterDiv"
*/
var doMove = false;
function AutoFitGridControls(GridDivId, FilterDivId, oldIndex, newIndex) {
if (oldIndex == newIndex) {
    return true;
}
if (doMove == false) {
    doMove = true;
    return;
}
//多表头的情况下请使用下面的这行代码
var DataArr = new Array();

var nCount = $("#" + FilterDivId).find("THEAD").find("TD").length;
for (i = 0; i < nCount; i++) {
    var TdNode = $($("#" + FilterDivId).find("THEAD").find("TD")[i]);
    var DataNode = null;
    if (TdNode.find("input")[0] != null) {
        DataNode = TdNode.find("input")[0];
    } else {
        DataNode = TdNode.find("select")[0];
    }
    DataArr[i] = DataNode;
}

var OldObj = DataArr[oldIndex];
//这个地方逻辑有问题，不是换位置了，而是从新排序了
if (oldIndex > newIndex) {  //向前拖动
    for (var i = oldIndex; i > newIndex; i--) {
        DataArr[i] = DataArr[i - 1];
    }
    DataArr[newIndex] = OldObj;
} else if (oldIndex < newIndex) {
    for (var i = oldIndex; i < newIndex; i++) {
        DataArr[i] = DataArr[i + 1];
    }
    DataArr[newIndex] = OldObj;
}


$("#" + FilterDivId).html($("#" + GridDivId).find("table").find("thead").parent().html());

for (i = 0; i < nCount; i++) {
    InnerStr = "";
    nWidth = $($("#" + GridDivId).find("table").find("thead").find("TD")[i]).css("width");
    nWidth = nWidth.substring(0, nWidth.length - 2) - 4;
    nWidth = nWidth + "px";
    var obj = DataArr[i];
    if (obj != null) {
        obj.style.width = nWidth;
    }
    $("#" + FilterDivId).find("THEAD").find("TD")[i].innerHTML = obj.outerHTML;
}
doMove = false;
}

// 将对象数组转换成下拉框内容
// objs：对象数组
// addEmptyItem：是否有空选项
// idName：ID属性名称（用于处理数据）
// nameName：名称属性名称（用于显示）
// bisAttributes:业务属性列表 
// gaojb 2010-11-20
function MakeSelectOptions(objs, addEmptyItem, idName, nameName, bisAttributes) {
	var innerStr="";
	if (addEmptyItem) { innerStr = "<option value='0'>请选择</option>"; }
	$(objs).each(function (i, d) {
		if (bisAttributes == null || bisAttributes.length == 0) {
		    innerStr += "<option value='" + d[idName] + "' title='" + d[nameName] + "'>" + d[nameName] + "</option>";
		}
		else {
		    var curBisAttributesHtml = "";
		    for (var i = 0; i < bisAttributes.length; i++) {
                var curbisAttribute = bisAttributes[i]
                curBisAttributesHtml += " " + curbisAttribute + "='" + d[curbisAttribute] + "'"
            }
            innerStr += "<option value='" + d[idName] + "' title='" + d[nameName] + "'" + curBisAttributesHtml + ">" + d[nameName] + "</option>";
		}
	});
	return innerStr;
}

// 将对象转换为下拉框选项
// $obj：对象，如$("#id")
// zNodes：对象
// parSingle：是否单选
// parFilter：是否可查询
function MultipleSelect($obj, zNodes, parSingle, parFilter) {
    $obj.multipleSelect({
        placeholder: "请选择",
        single: parSingle == null ? true : parSingle, //单选
        filter: parFilter == null ? true : parFilter,  //查询 
    });
    for (var n = 0; n < zNodes.length; n++) {
        var value = zNodes[n].id;
        var text = zNodes[n].name;
        var $opt = "";
       
        $opt = $("<option />", {
            value: text, //这里暂时value 设置为text
            text: text
        });
        
        $obj.append($opt).multipleSelect("refresh");
    }
}

// 查询的where条件数组类，对应后台SQLMapper类的WhereConditions属性
function conditionsClass() {
	this.data=new Array();
}
	
// 如果没有填写条件值，则不做为查询条件进入conditionsClass
// 这里使用prototype，为避免引用data而产生闭包
conditionsClass.prototype.Add=function(cond) {
	if ((cond.ConditionValue!="")&&(cond.ConditionValue!="null")) {	this.data.push(cond);}
}
	
// 获取查询条件数组
conditionsClass.prototype.Get=function() {
	return this.data;
}	
	
// 具体的查询条件类，对应后台的FieldWhereCondition类
function aCondition(fname, condition, cvalue) {
    this.EName = fname;
	this.FieldName = fname;
	this.Condition = condition;
	this.ConditionValue = cvalue;
	this.Value = cvalue;
}

/*
* 获取过滤条件列表的方法，针对表格下面的过滤条件
* Obj :  当前收集到的查询条件对象
* FilterDivId ： 过滤框的ID，一般默认为"FilterDiv"
* FieldMap: 字段的映射，用来处理显示的字段和提交的字段不一致的情况
*           使用方法类似：var FieldMap = new Object();
                        FieldMap["DeptID"] = "DeptName";
            意思是：DeptID的值去找ID为DeptName的控件的Value.
            有多个的情况按照这种方法继续写，如果没有可以不传或者传null
*/
function GetFilterConditions(Obj, FilterDivId, FieldMap) {
	var ConditionArr = new conditionsClass();
	for (var o in Obj) {
	    var oval = o.toString();
	    if (Obj[oval] != "") {
	        var curObj = $("#" + FilterDivId).find("#" + oval);
	        if (curObj == null || curObj.length < 1) {
	            if (oval.toUpperCase() != "ID" && FieldMap != null) {
	                curObj = $("#" + FilterDivId).find("#" + FieldMap[oval]);
	            }
	        }

	        if (curObj != null && curObj.length > 0) {
	            if (curObj[0].type == "hidden") {
	                continue;
	            }
	            else {
	                var fname = escape($.trim(oval));
	                var condition = "eq";

                    var dataType = Obj["DataType_" + fname] == null? "varchar": Obj["DataType_" + fname];
	                if (curObj[0].type == "text") {
	                    condition = "like";
	                    if ($("#" + FilterDivId).find("#" + oval)[0].id == "ID" || curObj[0].textType == "int" || dataType == "int") {
	                        condition = "eq";
	                    }
	                }
	                var ConditionValue = new Array();
	                ConditionValue[0] = Obj[oval];
	                var Condi = new aCondition(fname, condition, ConditionValue);
	                if (Obj["DataType_" + fname] != null) {
	                    Condi["Type"] = Obj["DataType_" + fname];
                    }
	                ConditionArr.Add(Condi)
                }
            }
	            
	    }
	}
	return ConditionArr;
}

/*
* 除去数组值中的空格
*/
function TrimArray(curArray) {
	for (var i = 0; i < curArray.length; i++) {
	    if ($.isArray(curArray[i]))
	        TrimArray(curArray[i]);
	    else
	        curArray[i] = escape($.trim(unescape(curArray[i])));
	}
}

/*
* 根据就诊类型代码得到就诊类型名称
* I：住院；O：门诊；H：转院；E：急诊
*/
function GetAdmName(admType) {
    if (admType == "O" || admType == "门诊") {
	    return "门诊";
    } else if (admType == "I" || admType == "住院") {
	    return "住院";
    } else if (admType == "E" || admType == "急诊") {
	    return "急诊";
	} else if (admType == "H") {
	    return "转院";
	} else {
	    return "其他";
    }
       
}

/*
*  查找在数组中和指定的对象相同的对象，只要指定的键匹配，就认为是相同的
*  Obj: 指定的对象
*  Arr: 数组
*  KeyArr: 匹配的键
*/
function FindObjInArr(Obj, Arr, KeyArr) {
	var ret = null;
	if (Obj != null && Arr.length > 0 && KeyArr.length > 0) {
	    for (var i = 0; i < Arr.length; i++) {
	        var curObj = Arr[i];
	        var flag = true;
	        for (var j = 0; j < KeyArr.length; j++) {
	            var p = KeyArr[j];
	            if (curObj[p] != Obj[p]) {
	                flag = false;
	            }
	        }
	        if (!flag) {
	            continue;
	        } else {
	            ret = curObj;
	        }
	    }
	}
	return ret;
}

//JSON字串转化为对象
String.prototype.parseJSON = function () {
	return (new Function("return " + this.replace(/\n/g, '<br/>')))();
}

//含有中文的日期字符串转换成数字日期,例如:2014年6月3日--->2014-06-03
String.prototype.toDateEx = function () {
    var data = { y: 0, M: 0, d: 0, h: 0, m: 0, s: 0, ms: 0 };
    //中文单位与英文单位对应
    var cn = { "年": "y", "月": "M", "日": "d", "时": "h","分": "m", "秒": "s", "毫秒": "ms" };
    //第一步，取出数字与单位，如10月,2009年
    var result = this.match(/\d+((ms)|[yMdhms年月日时分秒]|(毫秒))/ig);
if(result == null) return null;
    //第二步，循环取出数字，再根据单位把数据赋值到data中
    for (var i = 0; i < result.length; i++) {
        RegExp(/(\d+)([yMdhms年月日时分秒]|(毫秒))/).test(result[i]);
        //例：2009年这个时间中，RegExp.$2应该是年，而data[年]是取不到合法的值的，
        //所以值为undefined，这样我们就可以判断是中文的值
        if (data[RegExp.$2] == undefined) {
            data[cn[RegExp.$2]] = RegExp.$1;
        }
        else {
            data[RegExp.$2] = RegExp.$1;
        }
    }
    return new Date(data.y, data.M - 1, data.d, data.h, data.m, data.s, data.ms);
}

/*
* 数组克隆方法(浅拷贝)
*/
Array.prototype.clone = function () { var a = []; for (var i = 0, l = this.length; i < l; i++) a.push(this[i]); return a; }

/*
* 数据克隆方法(深拷贝)
*/
Array.prototype.dClone = function () { var a = []; for (var i = 0, l = this.length; i < l; i++) a.push(ObjCopy(this[i])); return a; }


Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
/*
　 *　方法:Array.remove(dx)
　 *　功能:删除数组元素.
　 *　参数:dx删除元素的下标.
　 *　返回:在原数组上修改数组
*/
//经常用的是通过遍历,重构数组.
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};


/*
*增加对数组元素的插入操作
*/
Array.prototype.insert = function (dx, obj) {
	if (isNaN(dx) || dx > this.length) {
	    return false;
	}
	this.push(obj);
	for (var i = this.length - 1; i > dx; i--) {
	    this[i] = this[i - 1];
	}
	this[dx] = obj;
	return true;
}

//加入数组
Array.prototype.pushList = function (parList) {
	if (parList == undefined || parList == null || parList.length == undefined) return false;

	for (var i = 0; i < parList.length; i++) {
	    this.push(parList[i]);
	}
	return true;
}

/*
* 判断数组中是否包含某一项
*/
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}


/*
* 数组的indexOf方法
*/
Array.prototype.indexOf = function (Object) {  
    for(var i = 0;i<this.length;i++){  
        if(this[i] == Object){  
            return i;  
        }  
    }  
    return -1;  
}

/*
* 按指定属性查找数组中是否存在对象
*/
Array.prototype.indexOfByProperty = function (parObj, parKeyArray) {
    var ret = -1;
    if (this.length == 0) return ret;
    if (parObj == null) return ret;
    if (parKeyArray == null || parKeyArray.length == 0) return ret;

    for (var i = 0; i < this.length; i++) {
        var curArrayObj = this[i];
        var curExist = true;
        for (var j = 0; j < parKeyArray.length; j++) {
            var curProperty = parKeyArray[j];
            if (curArrayObj[curProperty] != parObj[curProperty]) {
                curExist = false;
            }
        }
        if (curExist) {
            ret = i;
        } else {
            continue;
        }
    }
    return ret;
}

/*
* 查找数组中指定属性等于指定值的项
*/
Array.prototype.findByProperty = function (parProperty, parPropertyValue) {
    var ret = null;
    if (this.length == 0) return ret;
    if (parProperty == null || parProperty == "") return ret;

    for (var i = 0; i < this.length; i++) {
        var curObj = this[i];
        if (curObj[parProperty] == parPropertyValue) {
            ret = curObj;
            break;
        }
    }
    return ret;
}

/*
* 查找数组中指定属性等于指定值的项的索引
*/
Array.prototype.findIndexByProperty = function (parProperty, parPropertyValue) {
    var ret = -1;
    if (this.length == 0) return ret;
    if (parProperty == null || parProperty == "") return ret;

    for (var i = 0; i < this.length; i++) {
        var curObj = this[i];
        if (curObj[parProperty] == parPropertyValue) {
            ret = i;
            break;
        }
    }
    return ret;
}
/*
* 模仿Linq中的Where表达式
*/
Array.prototype.where = function (conditionCheck) {
    var ret = [];
    for (var i = 0; i < this.length; i++) {
        if (conditionCheck(this[i])) {
            ret.push(this[i]);
        }
    }
    return ret;
}
/*
* 模仿Linq中的Select表达式
*/
Array.prototype.select = function (selectExpression) {
    var ret = [];
    for (var i = 0; i < this.length; i++) {
        ret.push(selectExpression(this[i]));
    }
    return ret;
}

/*
* 对象拷贝：序列化和反序列化实现
*/
function ObjCopy(obj){
	var objStr = $.toJSON(obj);
	return eval("(" + objStr + ")");
}
/*
* 显示字段的错误信息
*/
$.fn.extend({
	showError: function (msg) {
	    var curOldBG = this.css("background-color");
	    this.css("background-color", "red");
	    var $curParentObj = this.parent();
	    if ($curParentObj.find("#tip").length == 0) {
	        $curParentObj.append("<div id='tip' class='tipClass'>" + msg + "</div>");
	    }
	    else {
	        $curParentObj.find("#tip").text(msg);
	    }
	    var $tipObj = $curParentObj.find("#tip");
	    this.bind("mouseover.tip", function (e) {
	        $tipObj.css({ left: e.clientX, top: e.clientY });
	        $tipObj.show();
	    });
	    this.bind("mouseout.tip", function (e) {
	        $tipObj.hide();
	    });
	    var $curObj = this;
	    this.blur(function () {
	        $curObj.css("background-color", curOldBG);
	        $curObj.unbind("mouseover.tip mouseout.tip");
	        $tipObj.hide();
	    });
	}
});
    
//获取今天日期
function GetToDayDate() {
	var today = new Date();
	return today.getYear() + "-" + (today.getMonth() +　1) + "-" + today.getDate(); 
}

/*
 * 函数说明：单个按钮的对话框
 * 参数说明：
 *  parTitle： 对话框的标题，可以传null，默认为"提示信息"
 *  parContent： 对话框的内容，为任意的HTML文本
 *  parText： 确定按钮的文本，可以传null，默认为"确定"
 *  parFunc： 点击确定按钮的时候回调函数，按钮默认关闭对话框
 * 返回值：
 *  执行modal之后的dom，可以在dom之后绑定自定义的js方法或事件
*/
function DialogOK(parTitle, parContent, parText, parFunc) {
    parTitle = (parTitle == null || parTitle == "") ? "提示信息" : parTitle;
    parText = (parText == null || parText == "") ? "确定" : parText;
    var modalStr = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
    + '<div class="modal-dialog">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
    + '<h4 class="modal-title" id="myModalLabel">'
    + parTitle
    + '</h4></div>'
    + '<div class="modal-body">'
    + parContent
    + '</div><div class="modal-footer">'
    + '<button type="button" class="btn btn-primary" data-dismiss="modal" style="width:100px"><i class="fa fa-check"></i> '
    + parText
    + '</button>'
    + '</div></div></div></div></div>';
    var curModal = $(modalStr).modal().on("hidden.bs.modal", function () { $(this).remove() });
    curModal.find(".btn-success").bind("click", parFunc);

    return curModal;
}

/*
 * 函数说明：单个按钮的对话框的简单版
 * 参数说明：
 *  parContent： 对话框的内容，为任意的HTML文本
 * 返回值：
 *  执行modal之后的dom，可以在dom之后绑定自定义的js方法或事件
*/
function DialogOKSimple(parContent) {
    return DialogOK(null, parContent);
}

/*
 * 两个按钮的对话框
 * 参数说明：
 * parTitle： 对话框的标题，可以传null，默认为"提示信息"
 * parContent： 对话框的内容，为任意的HTML文本
 * parOKText： 确定按钮的文本，可以传null，默认为"确定"
 * parCancelText： 取消按钮的文本，可以传null，默认为"取消"
 * parOKFunc： 点击确定按钮的时候回调函数,可以传null
 * parCancelFunc： 点击取消按钮的时候回调函数,可以传null,取消按钮默认关闭对话框
 * 返回值：
 *  执行modal之后的dom，可以在dom可以在dom之后绑定自定义的js方法或事件
*/
function DialogOKCancel(parTitle, parContent, parOKText, parCancelText, parOKFunc, parCancelFunc) {
    parTitle = (parTitle == null || parTitle == "") ? "提示信息" : parTitle;
    parOKText = (parOKText == null || parOKText == "") ? "确定" : parOKText;
    parCancelText = (parCancelText == null || parCancelText == "") ? "取消" : parCancelText;
    var modalStr = '<div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
    + '<div class="modal-dialog">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
    + '<h4 class="modal-title" id="myModalLabel">'
    + parTitle
    + '</h4></div>'
    + '<div class="modal-body">'
    + parContent
    + '</div><div class="modal-footer">'
    + '<button type="button" id="ok" class="btn btn-primary" data-dismiss="modal" style="width:100px"><i class="fa fa-check"></i> '
    + parOKText
    + '</button>'
    + '<button type="button" id="cancel" class="btn btn-primary" data-dismiss="modal" style="width:100px"><i class="fa fa-remove"></i> '
    + parCancelText
    + '</button>'
    + '</div></div></div></div></div>';
    var curModal = $(modalStr).modal().on("hidden.bs.modal", function () { $(this).remove() });

    curModal.find("#ok").bind("click", parOKFunc);
    curModal.find("#cancel").bind("click", parCancelFunc);

    return curModal;
}

/*
 * 函数说明：无按钮的对话框的简单版
 * 参数说明：
 *  parContent： 对话框的内容，为任意的HTML文本
 * 返回值：
 *  执行modal之后的dom，可以在dom之后绑定自定义的js方法或事件
*/
function DialogNoButton(parContent) {
    //非阻塞通知框
    toastr.options = {
        "positionClass": "toast-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    toastr.info(parContent);
}

/*
 * 函数说明：bootstrap-table单元格内容过长时截断并显示"..."
 * 参数说明：
 * 返回值：
 *  添加CSS样式后的内容
*/
function setFormatter(value, row, index) {
    return "<p style='margin-bottom:0px;width:" + this.width + "px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' title='" + (value == null ? "" : value) + "'>" + (value == null ? "" : value) + "</p>";
}

/*
 * 函数说明：bootstrap-table最后一列操作列
 * 参数说明："tableId":table的id值，不带#号。"updateFunc":修改的回调函数。"deleteFunc":删除的回调函数
 * 返回值：
 *  操作列
*/
function getOpColumn(tableId, updateFunc, deleteFunc,updateDis,deleteDis) {
    var column = {
        title: "操作",
        align: 'center',
        valign: 'middle',
        width: 60,
        cellStyle: function cellStyle(value, row, index) {
            return {classes:"OpCol"}
        },
        formatter: function OpFormatter(value, row, index) {
            //return "<div style='width:60px'>" +
            //       "<a class='update' href='javascript:;' title='修改' style='margin-right:20px;font-size:16px;display:" + updateDis + "'>"
            //       "<i class='glyphicon glyphicon-edit'></i></a>" +
            //       "<a class='delete' href='javascript:;' title='删除' style='font-size:16px;color:red;display:" + deleteDis + "'>"
            //       "<i class='glyphicon glyphicon-trash'></i></a></div>";
            if (updateDis == null && deleteDis == null) {
                return [
            "<div style='width:60px'>",
            "<a class='update' href='javascript:void(0)' title='修改' style='margin-right:10px;font-size:16px'>",
            "<i class='glyphicon glyphicon-edit'></i>",
            "</a> ",
            "<a class='delete' href='javascript:void(0)' title='删除' style='font-size:16px; color:red'>",
            "<i class='glyphicon glyphicon-trash'></i>",
            "</a>",
            "</div>"
                ].join("");
            }
            else {
                return [
            "<div style='width:60px'>",
            "<a class='update' href='javascript:void(0)' title='修改' style='margin-right:10px;font-size:16px;display:" + updateDis + "'>",
            "<i class='glyphicon glyphicon-edit'></i>",
            "</a> ",
            "<a class='delete' href='javascript:void(0)' title='删除' style='font-size:16px; color:red;display:" + deleteDis + "'>",
            "<i class='glyphicon glyphicon-trash'></i>",
            "</a>",
            "</div>"
                ].join("");
            }
        }

    };
    $("#" + tableId).on("click", "a.update", updateFunc);
    $("#" + tableId).on("click", "a.delete", deleteFunc);
    return column;
}

/*
 * 函数说明：封装表单弹出框Modal
 * 参数说明：
 * parFormDivId 表单父DIV的id值，不带#号
 * parTitle： 对话框的标题
 * parOKText： 确定按钮的文本
 * parClearText： 清空按钮的文本
 * parOKFunc： 点击确定按钮的时候回调函数,可以传null
 * parClearFunc： 点击清空按钮的时候回调函数,可以传null
 * parShownFunc： modal弹出时事件函数，可用于更新时向表单注入相应数据
 * 返回值：
 *  模态框
*/
function FormModal(parFormDivId, parTitle, parOKText, parClearText, parOKFunc, parClearFunc, parShownFunc) {
    var form = $("#" + parFormDivId).html();
    $("#" + parFormDivId).data("form", form);
    $("#" + parFormDivId).empty();
    parClearText = (parClearText == null || parClearText == "") ? "清空" : parClearText;
    var modalStr = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="myFormModal" data-show=false>'
                        + '<div class="modal-dialog">'
                        + '<div class="modal-content">'
                        + '<div class="modal-header">'
                        + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" >×</button>'
                        + '<h4 class="modal-title" id="myModalLabel">'
                        + parTitle
                        + '</h4></div>'
                        + '<div class="modal-body">'
                        + form
                        +'<div class="clearfix"><div class="col-md-11" style="padding-right:0px"><div class="btn-group pull-right">'
                        + '<button type="button" id="okBtn"  class="btn btn-primary" style="width:100px">'
                        + (parOKText == "新增" ? '<span class="glyphicon glyphicon-plus"><span>' : '<span class="glyphicon glyphicon-edit"><span>')
                        + parOKText
                        + '</button>'
                        + '<button type="button" id="clearBtn"  class="btn btn-primary" style="width:100px"><span class="glyphicon glyphicon-remove"><span>'
                        + parClearText
                        + '</button>'
                        + '</div></div></div></div></div></div></div>';
    var curModal = $(modalStr).modal().on("hidden.bs.modal", function () {
        $(this).remove();
        $("#" + parFormDivId).html($("#" + parFormDivId).data("form"));
        $("#" + parFormDivId).data("form",null);
    });
    curModal.on("shown.bs.modal", function () {
        InitBlurValidByDiv("myFormModal");
        curModal.find("input").on("focus", function () {
            $(this).parent().next("span.pl10").remove();
        });
    });
    curModal.on("shown.bs.modal", parShownFunc);
    curModal.find("#okBtn").on("click", parOKFunc);
    curModal.find("#clearBtn").on("click", function () {
        curModal.find("span.pl10").remove();
    });
    
    if (parClearFunc) {
        curModal.find("#clearBtn").on("click", parClearFunc);
    } else {
        curModal.find("#clearBtn").on("click", function () {
            curModal.find("input[type='text'],textarea").val("");
            $sArr = curModal.find("select");
            $.each($sArr, function () {
                $(this).find("option:first").prop("selected", true);
            });
            curModal.find("input[type='checkbox']").prop("checked", false);
        });
    }
    return curModal;
}

/*
 * 函数说明：封装树形弹出框
 * 参数说明：
 * parId 要初始化为popover的元素的id值，不带#号
 * parDataUrl： 数据路径
 * level： 树的层级，1层为1，2层为2
 * 返回值：
 *  Popover
*/
function getTreePopover(parId,parDataUrl,level,parData) {
    var str = "<input type='text' class='form-control' placeholder='搜索' id='popoverSearch' style='margin-bottom:2px'/>";
    str+="<table class='table table-bordered table-striped' id='popoverTable' style='margin:0'>";
    str+="<tbody><tr><td>";
    str+="<div id=popoverTree class='ztree' style='width:220px;height:300px;max-height:300px;overflow:auto;padding:0'></div>";
    str+="</td></tr></tbody></table>";
    str+="<div style='text-align:right;margin-top:10px'>";
    str+="<button id='popoverOkBtn' class='btn btn-success' type='button' style='margin-right:10px'>确定</button>";
    str+="<button id='popoverCloseBtn' class='btn btn-primary' type='button'>关闭</button></div>";
    var popover = $("#"+parId).popover({
                    placement: 'left',
                    html: 'true',
                    content: str
    }).on('shown.bs.popover', function () {
        $("body").find("span[aria-describedby]").not("#" + parId).popover("hide");
        parData = parData == undefined ? null : parData;
        AjaxInvoke(parDataUrl, parData, "POST", function (ret) {
            //zTree定义
            var setting = {
                view: {
                    selectedMulti: false
                },
                callback: {
                    onDblClick: function (event, treeId, treeNode) {
                        $("#" + parId).parent().find("input").val(treeNode.name);
                        $("#" + parId).data("ID", treeNode.id);
                        $("#" + parId).data("Name", treeNode.name);
                        $("#" + parId).popover('hide');
                    }
                }
            };
            var treeObj = $.fn.zTree.init($("#popoverTree"), setting, ret.DataObject);
            for (var i = 0; i < level - 1; i++) {
                $("#popoverTree li a.level" + i).addClass("btn disabled");
            }
            var node = treeObj.getNodeByParam("name", $("#" + parId).parent().find("input").val(), null);
            treeObj.selectNode(node, false);
            var $okBtn = $("#" + parId).next("div.popover").find("#popoverOkBtn");
            var $closeBtn = $("#" + parId).next("div.popover").find("#popoverCloseBtn");
            $okBtn.click(function () {
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length == 0) {
                    $("#" + parId).popover('hide');
                    return;
                }
                $("#" + parId).parent().find("input").val(nodes[0].name);
                $("#" + parId).data("ID", nodes[0].id);
                $("#" + parId).data("Name", nodes[0].name);
                $("#" + parId).popover('hide');
            });
            $closeBtn.click(function () {
                $("#" + parId).popover('hide');
            });
            //搜索树形结构
            var $search = $("#" + parId).next("div.popover").find("#popoverSearch");
            $search.keydown(function (event) {
                if (event.keyCode == 13) {
                    var searchVal = $search.val().trim();
                    var treeObj = $.fn.zTree.getZTreeObj("popoverTree");
                    var nodes = treeObj.getNodesByParamFuzzy("name", searchVal, null);
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].level == level-1) {
                            treeObj.selectNode(nodes[i], false);
                            return;
                        }
                    }
                }
            });
        }, false);
    });
}



/*
 * 函数说明：封装表格弹出框
 * 参数说明：
 * parId 要初始化为popover的元素的id值，不带#号
 * parDataUrl： Ajax数据路径
 * parData： Ajax请求数据，格式{"":""}
 * parNameField： 表格column第一列的Field值,可传null,默认值“Name”
 * parNameFieldTitle： 表格column第一列的Title值,可传null,默认值“名称”
 * parCodeField： 表格column第二列的Field值,若无可传null
 * parCodeFieldTitle： 表格column第一列的Title值,若无可传null
 * singleSelect：是否单选
 * parInputField：填充到输入文本框的列的Field值,默认“Name”
 * 返回值：
 *  Popover
*/
function getTablePopover(parId, parDataUrl, parData, parNameField, parNameFieldTitle, parCodeField, parCodeFieldTitle, singleSelect, parInputField) {
    var str = " <div style='height:395px;max-height:395px'>"
            + " <table style='width:245px' id='pTable'></table>"
            + " </div>"
            + " <div style='text-align:right;margin-top:10px'>"
            + " <button id='pOkBtn' class='btn btn-success' type='button'>确定</button>"
            + " <button id='pCloseBtn' class='btn btn-primary' type='button' style='margin-left:10px'>关闭</button>"
            + " </div>";
    var popover = $("#" + parId).popover({
        placement: 'left',
        html: 'true',
        content: str
    }).on('shown.bs.popover', function () {
        $("body").find("span[aria-describedby]").not("#" + parId).popover("hide");
        AjaxInvoke(parDataUrl, parData, "POST", function (ret) {
            parNameField = parNameField ? parNameField : "Name";
            parNameFieldTitle = parNameFieldTitle ? parNameFieldTitle : "名称";
            parInputField = parInputField ? parInputField : "Name";
            var firstWidth = 180,secondWidth=0;
            if (parCodeField) {
                firstWidth=100, secondWidth = 80;
            }
            var column = [
                            { checkbox: true },
                            { field: "ID", visible: false },
                            { field: "" + parNameField, title: parNameFieldTitle, width: firstWidth, formatter: setFormatter }
            ];
            if (parCodeField) {
                column.push({ field: "" + parCodeField, title: parCodeFieldTitle, width: secondWidth, formatter: setFormatter });
            }

            GetBootstrapTableByObj($("#" + parId).next("div.popover").find("table"), {
                height: 395,
                data: ret.DataObject,
                pagination:false,
                singleSelect: singleSelect,
                columns: column,
                onDblClickRow: function (row) {
                    $("#" + parId).parent().find("input").val(row[parInputField]);
                    $("#" + parId).data("ID", row.ID);
                    $("#" + parId).popover('hide');
                }
            });

            if (singleSelect) {
                $("#" + parId).next("div.popover").find("table").bootstrapTable("checkBy", { field: parInputField, values: [$("#" + parId).parent().find("input").val()] });
            } else {
                $("#" + parId).next("div.popover").find("table").bootstrapTable("checkBy", { field: parInputField, values: $("#" + parId).parent().find("input").val().split(",") });
            }
            $("#" + parId).next("div.popover").find("#pOkBtn").click(function () {
                var rows = $("#" + parId).next("div.popover").find("table").bootstrapTable("getSelections");
                var valArr = new Array();
                var idArr = new Array();
                for (var i = 0; i < rows.length; i++) {
                    valArr.push(rows[i][parInputField]);
                    idArr.push(rows[i].ID);
                }
                $("#" + parId).parent().find("input").val(valArr.join(","));
                $("#" + parId).data("ID", idArr.join(","));
                $("#" + parId).popover('hide');
            });
            $("#" + parId).next("div.popover").find("#pCloseBtn").click(function () {
                $("#" + parId).popover('hide');
            });
        }, false);
    });
}

/*
 * 函数说明：封装的表单类型的弹出框，使用之前需要引用checkform.js
     函数名：CreateDialog
 * 参数说明：
 *   modalId: 弹出框ID
 *   formId：表单的ID  
 *   parTitle：表单标题  
 *   lists: 表单控件数组
 *   buttons: 表单按钮数组
 */
function CreateDialog(modalId, formId, parTitle, lists, buttons) {
    CreateHtml(modalId, formId, parTitle, lists, buttons);
    $('#' + modalId).modal("show");
    //表单验证
    InitBlurValid();
}

function CreateHtml(modalId, formId, parTitle, lists, buttons) {

    if ($('#' + modalId).length > 0)
        return;
    lists = (lists == null || lists == "") ? 0 : lists;
    buttons = (buttons == null || buttons == "") ? 0 : buttons;
    var htmlStr = "";
    var htmBtnStr = "";
    if (lists.length > 0) {
        for (var i = 0; i < lists.length; i++) {
            var name = (lists[i].name == undefined) ? "" : lists[i].name;
            htmlStr += '<div class="form-group form-group-custom">';
            if (lists[i].IsValidNull) {
                htmlStr += '<div class="col-md-3"  style="text-align:right"><label class="control-label" style="color:red">* </label><label class="control-label">' + lists[i].label + '</label></div><div class="col-md-8">';
            } else {
                htmlStr += '<div class="col-md-3"  style="text-align:right"><label class="control-label">' + lists[i].label + '</label></div><div class="col-md-8">';
            }

            switch (lists[i].type) {
                case 'text':
                    var placeholder = (lists[i].placeholder == undefined) ? "" : lists[i].placeholder;
                    var iconClass = (lists[i].iconClass == undefined || lists[i].iconClass == "") ? null : lists[i].iconClass;
                    htmlStr += '<div><input type="text" class="form-control form-control-custom" id="' + lists[i].id + '" placeholder="' + placeholder + '"';
                    if (name != '') {
                        htmlStr += 'name = "'+ name + '"';
                    }
                    if (lists[i].IsValidNull) {
                        htmlStr += 'IsValid="false" ValidNull="true"';
                    }
                    if (iconClass != null) {
                        htmlStr += 'disabled="disabled" /><span class="' + iconClass + '" style="position:absolute;top:-2px;right:15px;z-index:2;display:block;width:34px;height:34px;line-height:34px;text-align:center;"  id="sel' + lists[i].id + '"></span>';
                    } else {
                        htmlStr += '/><span></span>';
                    }
                    htmlStr += '</div>'
                    break;
                case 'textarea':
                    var rows = (lists[i].rows == undefined) ? "5" : lists[i].rows;
                    var cols = (lists[i].cols == undefined) ? "" : lists[i].cols;
                    htmlStr += '<textarea class="form-control form-control-custom" rows="' + rows + '"';
                    if (cols != "") {
                        htmlStr += 'cols="' + cols + '"';
                    }
                    if (lists[i].IsValidNull) {
                        htmlStr += 'IsValid="false" ValidNull="true"';
                    }
                    htmlStr += 'id="' + lists[i].id + '"></textarea>';
                    break;
                case 'select':
                    htmlStr += '<div><select class="form-control form-control-custom" id="' + lists[i].id + '"> ';
                    if (lists[i].option.length > 0) {
                        for (var r = 0; r < lists[i].option.length; r++) {
                            htmlStr += '<option value="' + r + '">' + lists[i].option[r].value + '</option>';
                        }
                        htmlStr += '</select></div>';
                    }
                    break;
                case 'checkbox':
                    var radios = (lists[i].radios == undefined) ? 0 : lists[i].radios;
                    htmlStr += '<div class="checkbox" id="' + lists[i].id + '">';
                    if (name != '') {
                        htmlStr += 'name = "' + name + '"';
                    }
                    if (radios.length > 0) {
                        for (var r = 0; r < radios.length; r++) {
                            htmlStr += '<label><input type="radio" name="ck' + lists[i].id + '" value="' + radios[r].value + '"/> ' + radios[r].value + '</label>';
                        }
                        htmlStr += '</div>';
                    }
                    break;
            }

            htmlStr += '</div></div>';
        }
    }

    if (buttons.length > 0) {
        htmBtnStr += '<div class="form-group" style="text-align:right;"><div class="col-md-11">';
        for (var j = 0; j < buttons.length; j++) {
            var cssClass = (buttons[j].cssClass == undefined) ? "btn-primary" : buttons[j].cssClass;
            var iconClass = (buttons[j].iconClass == undefined) ? null : buttons[j].iconClass;
            htmBtnStr += '<button type="button" class="btn ' + cssClass + '"style="width:100px;margin-left:5px" id="' + buttons[j].id + '">';
            if (iconClass != null) {
                htmBtnStr += '<span class="' + iconClass + '" aria-hidden="true"></span>&nbsp;';
            }
            htmBtnStr += buttons[j].value + '</button>';
        }
        htmBtnStr += '</div></div>';
    }

    var modalStr = '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">× </button>'
        + '<h4 class="modal-title">' + parTitle + '</h4></div><div class="modal-body">'
        + '<form id="' + formId + '" class="form-horizontal">' + htmlStr + htmBtnStr + '</form>' + '</div></div></div></div>';
    $("body").append(modalStr);

    //绑定按钮回调函数
    if (buttons.length > 0) {
        for (var i = 0; i < buttons.length; i++) {
            var func = (buttons[i].onClick == undefined) ? null : buttons[i].onClick;

            $("#" + modalId).find("#" + buttons[i].id).bind("click", func);
        }
    }
};

/*
 * 函数说明：清空指定表单数据
 * 参数说明：
 *   formId：表单的ID  
 */
var clearForm = function (formId) {
    $('#' + formId).find("input[type='text']").val("");
    $('#' + formId).find("input[type='password']").val("");
    $('#' + formId).find("textarea").val("");
    $('#' + formId).find("select").find('option[value="0"]').attr("selected", true);
    $('#' + formId).find("input[type='radio']").each(function () {
        this.checked = false;
    });

    $("#" + formId).find("span.pl10").remove();
};

//得到URL中传入的参数，param为参数的key
function GetParameter(param) {
    var ret = "";
    var ParamStrArr = location.href.split("?");
    if (ParamStrArr.length > 1) {
        var ParamsArr = ParamStrArr[1].split("&");
        if (ParamsArr.length > 0) {
            for (var i = 0; i < ParamsArr.length; i++) {
                var keyValueDic = ParamsArr[i].split("=");
                if (keyValueDic.length > 0) {
                    var ParamKey = keyValueDic[0];
                    if (ParamKey.toLowerCase() == param.toLowerCase()) {
                        ret = keyValueDic[1];
                        return ret;
                    }
                }
            }
        }
    }
    return ret;
}

//获取今天的日期YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//计算天数差的函数，通用  
function DateDiff(sDate1, sDate2) {    //sDate1和sDate2是2002-12-18格式  
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2002格式  
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数  
    return iDays
}


/**
* 左补齐字符串
* 
* @param length
*            要补齐的长度
* @param char
*            要补齐的字符
* @return
*/
String.prototype.padLeft = Number.prototype.padLeft = function (length, char) {
    if (!length) return this;

    length = parseInt(length);
    char = (char == null || (typeof char === 'undefined')) ? ' ' : String(char);
    var _s = String(this);
    var _len = _s.length;
    var padLen = length - _len;
    if (padLen <= 0) return this;
    for (var i = 0; i < padLen; i++) {
        _s = char + _s;
    }
    return _s;
}
/**
* 右补齐字符串
* 
* @param length
*            要补齐的长度
* @param char
*            要补齐的字符
* @return
*/
String.prototype.padRight = Number.prototype.padRight = function (length, char) {  
    if (!length) return this;  
   
    length = parseInt(length);  
    char = (char == null || (typeof char === 'undefined')) ? ' ' : String(char);  
    var _s = String(this);  
    var _len = _s.length;  
    var padLen = length - _len;  
    if (padLen <= 0) return this;  
    for (var i = 0; i < padLen; i++) {  
        _s += char;  
    }  
    return _s;  
}  


/**
 * 字符串压缩
 */
function Compress(strNormalString) {
    var strCompressedString = "";

    var ht = new Array();
    for (i = 0; i < 128; i++) {
        ht[i] = i;
    }

    var used = 128;
    var intLeftOver = 0;
    var intOutputCode = 0;
    var pcode = 0;
    var ccode = 0;
    var k = 0;

    for (var i = 0; i < strNormalString.length; i++) {
        ccode = strNormalString.charCodeAt(i);
        k = (pcode << 8) | ccode;
        if (ht[k] != null) {
            pcode = ht[k];
        } else {
            intLeftOver += 12;
            intOutputCode <<= 12;
            intOutputCode |= pcode;
            pcode = ccode;
            if (intLeftOver >= 16) {
                strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
                intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
                intLeftOver -= 16;
            }
            if (used < 4096) {
                used++;
                ht[k] = used - 1;
            }
        }
    }

    if (pcode != 0) {
        intLeftOver += 12;
        intOutputCode <<= 12;
        intOutputCode |= pcode;
    }

    if (intLeftOver >= 16) {
        strCompressedString += String.fromCharCode(intOutputCode >> (intLeftOver - 16));
        intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
        intLeftOver -= 16;
    }

    if (intLeftOver > 0) {
        intOutputCode <<= (16 - intLeftOver);
        strCompressedString += String.fromCharCode(intOutputCode);
    }

    return strCompressedString;
}

/**
 * 字符解压缩
 */
function Decompress(strCompressedString) {
    var strNormalString = "";
    var ht = new Array();

    for (i = 0; i < 128; i++) {
        ht[i] = String.fromCharCode(i);
    }

    var used = 128;
    var intLeftOver = 0;
    var intOutputCode = 0;
    var ccode = 0;
    var pcode = 0;
    var key = 0;

    for (var i = 0; i < strCompressedString.length; i++) {
        intLeftOver += 16;
        intOutputCode <<= 16;
        intOutputCode |= strCompressedString.charCodeAt(i);

        while (1) {
            if (intLeftOver >= 12) {
                ccode = intOutputCode >> (intLeftOver - 12);
                if (typeof (key = ht[ccode]) != "undefined") {
                    strNormalString += key;
                    if (used > 128) {
                        ht[ht.length] = ht[pcode] + key.substr(0, 1);
                    }
                    pcode = ccode;
                } else {
                    key = ht[pcode] + ht[pcode].substr(0, 1);
                    strNormalString += key;
                    ht[ht.length] = ht[pcode] + key.substr(0, 1);
                    pcode = ht.length - 1;
                }

                used++;
                intLeftOver -= 12;
                intOutputCode &= (Math.pow(2, intLeftOver) - 1);
            } else {
                break;
            }
        }
    }
    return strNormalString;
}


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 将< > & " '转成字符实体
 * @param val
 * @returns {XML|string}
 */
function escapeHTML(val) {
    val = "" + val;
    return val.replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

/**
 * 将字符实体转成< > & " '
 * @param val
 * @returns {string}
 */
function unescapeHTML(val) {
    val = "" + val;
    return val.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

/**
 * 判断非空
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    if (typeof (obj) == 'object') {
        if (JSON.stringify(obj) == '{}') return true;
    }

    if (typeof (obj) == 'string') {
        if (obj == '' || obj == 'null' || obj == '{}' || obj == '[]') return true;
    }

    if (obj == undefined || obj == null || new String(obj).trim() == '') {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断非空
 * @param obj
 * @returns {boolean}
 */
function isNotEmpty(obj) {
    return isEmpty(obj) ? false : true;
}



