$(document).ready(function () {
    function changeState(el) {
        if (el.readOnly) el.checked = el.readOnly = false;
        else if (!el.checked) el.readOnly = el.indeterminate = true;
    }
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    //刚进入判断是那一部分显示
    var type = localStorage.getItem("nowType1");
    if (type == "" || type == null || type == "undefined" || type == 1) {

        $(".choose1").hide().eq(0).show();
        $(".lian").addClass("chooseActive");
        $(".lookType").removeClass("chooseActive");

    } else {
        $(".choose1").hide().eq(1).show();
        $(".lookType").addClass("chooseActive");
        $(".lian").removeClass("chooseActive");
    }
    $(".lian").click(function () {
        localStorage.setItem("nowType1", 1);
        $(".choose1").hide().eq(0).show();
        $(".lian").addClass("chooseActive");
        $(".lookType").removeClass("chooseActive");
    })
    $(".lookType").click(function () {
        localStorage.setItem("nowType1", 2);
        $(".choose1").hide().eq(1).show();
        $(".lookType").addClass("chooseActive");
        $(".lian").removeClass("chooseActive");
        var show = localStorage.getItem("show2");
        var validate = document.querySelectorAll(".validate");//获取所有的
        for (var i = 0; i < validate.length; i++) {
            var obj = validate[i];
            if (obj.value == show) {
                obj.checked = true;
            }
        }


        //查看投诉和反馈验证码设置详情
        var validate = document.querySelectorAll(".validate");//获取所有的
        for (var i = 0; i < validate.length; i++) {
            var obj = validate[i];
            if (obj.value == data.msg.validate) {
                obj.checked = true;
            }
        }
    })
    // input标签对象 
    //获取验证码是防刷还是必填状态
    var url1 = src + "/adminInterface.dx";
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.querysetup&type=6";

    var data = getSign(url1, par);
    console.log(data);
    var da = localStorage.getItem("nowType1");
    if (da == 2) {
        var validate = document.querySelectorAll(".validate");//获取所有的
        for (var i = 0; i < validate.length; i++) {
            var obj = validate[i];
            if (obj.value == data.msg.validate) {
                obj.checked = true;
            }
        }
    } else {
        localStorage.setItem("show2", data.msg.validate);
    }
   
    //调取时间选择
    //选项卡切换
    ////修改投诉和反馈功能设置
    $(".saveBtn").click(function () {

        var value = $("input[name='radioll']:checked").val();
        var url = src + "/adminInterface.dx";
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.validate&validate=" + value;

        var data = getSign(url, par);
        console.log(data);
        if (data.msg.code == "200") {
            $(".confirm").hide();
            $(".prompt").text("操作成功");
            $(".nv91-mask").show();
            $(".nv1").show();
            setTimeout(function () {
                $(".nv91-mask").hide();
                $(".nv1").hide();
                location.reload();

            }, 2000);;
        }
    })
    $(".chooseCard li").click(function () {
        var index = $(this).index();
        $(".chooseCard li").removeClass("chooseActive").eq(index).addClass("chooseActive");
        $(".choose1").hide().eq(index).show();

    });
    //功能设置弹窗关闭按钮点击
    $(".nv91-close").click(function () {
        $(".nv91-mask").fadeOut();
        $(".nv91").hide();
    })
    //弹窗关闭按钮点击
    $(".nv92-close").click(function () {
        $(".nv91-mask").fadeOut();
        $(".nv92").hide();
    })
    //导出数据到本地
    $(".export").click(function () {

        url = noapi + "/dxExportComplaint.dx";

        $(".export1").attr("href", url).click();
        // var data = getSign(url,par);

    })


    //页面初次渲染加载数据
    var data = window.localStorage.getItem("dxRightsList");
    data = JSON.parse(data);
    //console.log(data);
    var url, par, pageCount;
    localStorage.setItem("pageNow1", 1);
    url = src + "/complaintInterface.dx";
    var appsercet = window.localStorage.getItem("appsercet");
    appsercet = JSON.parse(appsercet);
    var newAppsercet = appsercet.data;
    var currentPage = window.localStorage.getItem("pageNow1")
    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&currentPage=" + currentPage;
    var data2 = getSign(url, par);
    console.log(data2);
    render(data2);
    pageChange("get.dxWeb.feedbackList", data2, "pagination10", url);
    //封装分页

    function pageChange(method, data2, pagination, url2) {
        currentPage = localStorage.getItem("pageNow1");
        if (currentPage == "undefined" || currentPage == "" || currentPage == null) {
            currentPage = 1;
        }
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var pageCount, pageN;
        if (data2.pageInfo && data2.pageInfo.totalRows) {
            pageCount = Math.ceil(data2.pageInfo.totalRows / 10);
        } else {
            pageCount == 0;
        }
        if (data2.pageInfo && data2.pageInfo.totalRows) {
            pageN = data2.pageInfo.totalRows;
        } else {
            pageN == 0;
        }

        if (data2.pageInfo && data2.pageInfo.totalRows) {
            new Page({
                id: pagination,
                pageTotal: pageCount, //必填,总页数
                pageAmount: 10,  //每页多少条
                dataTotal: pageN, //总共多少条数据
                curPage: currentPage, //初始页码,不填默认为1
                pageSize: 5, //分页个数,不填默认为5
                showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                getPage: function (page) {
                    //获取当前页数
                    console.log(page);
                }
            })
        } else {
            pageN == 0;
        }
        $(document).on("click", ".pageItem", function () {

            currentPage = $(this).html();
            localStorage.setItem("pageNow1", currentPage)
            par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + currentPage;
            var bannerList = getSign(url2, par);
            render(bannerList);
        })
        //上一页
        //  $(".pagePrev").unbind('click').bind("click",function(){
        $(document).on("click", ".pagePrev", function () {

            currentPage = localStorage.getItem("pageNow1");
            var num3 = parseInt(currentPage) - 1;
            if (currentPage > 0 && currentPage < pageCount) {
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + num3;
                var bannerList = getSign(url2, par);
                render(bannerList);
            } else {
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=1";
                var bannerList = getSign(url2, par);
                render(bannerList);
            }

            var num = parseInt(currentPage) - 1;
            localStorage.setItem("pageNow1", num);
        })
        //下一页
        // $(".pageNext").unbind('click').bind("click",function(){

        $(document).on("click", ".pageNext", function () {

            currentPage = localStorage.getItem("pageNow1");
            var num3 = parseInt(currentPage) + 1;
            if (currentPage > 0 && currentPage < pageCount) {
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + num3;
                var bannerList = getSign(url2, par);
                render(bannerList);
            } else {
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + pageCount;
                var bannerList = getSign(url2, par);
                render(bannerList);
            }

            var num = parseInt(currentPage) + 1;
            localStorage.setItem("pageNow1", num);
        })

        var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
        var ret = document.querySelector(".returnPage");
        $(document).on("blur", ".returnPage", function () {

            var value = $(this).val();

            if (!re.test(value)) {

            } else if (value > 0 && value <= pageCount) {
                currentPage = value;
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + currentPage;

                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.pageInfo.totalRows / 10);
                pageN = Math.ceil(data3.pageInfo.totalRows);

                $(this).val("");

                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage: currentPage, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                        console.log(page);
                    }
                })
            } else {
                par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + pageCount;

                var data3 = getSign(url2, par);
                render(data3);
                pageCount = Math.ceil(data3.pageInfo.totalRows / 10);
                pageN = Math.ceil(data3.pageInfo.totalRows);

                $(this).val("");

                new Page({
                    id: pagination,
                    pageTotal: pageCount, //必填,总页数
                    pageAmount: 10,  //每页多少条
                    dataTotal: pageN, //总共多少条数据
                    curPage: pageCount, //初始页码,不填默认为1
                    pageSize: 5, //分页个数,不填默认为5
                    showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                    showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                    getPage: function (page) {
                        //获取当前页数
                        console.log(page);
                    }
                })
            }

        })
        $(document).on("keydown", ".returnPage", function (event) {
            // $('.returnPage').keydown(function(event) {
            if (event.keyCode == 13) {
                var value = $(".returnPage").val();

                if (!re.test(value)) {

                } else if (value > 0 && value <= pageCount) {
                    currentPage = value;
                    par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + currentPage;

                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows / 10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);

                    $(this).val("");

                    new Page({
                        id: pagination,
                        pageTotal: pageCount, //必填,总页数
                        pageAmount: 10,  //每页多少条
                        dataTotal: pageN, //总共多少条数据
                        curPage: currentPage, //初始页码,不填默认为1
                        pageSize: 5, //分页个数,不填默认为5
                        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                        getPage: function (page) {
                            //获取当前页数
                            console.log(page);
                        }
                    })
                } else {
                    par = "appsercet=" + newAppsercet + "&method=" + method + "&currentPage=" + pageCount;

                    var data3 = getSign(url2, par);
                    render(data3);
                    pageCount = Math.ceil(data3.pageInfo.totalRows / 10);
                    pageN = Math.ceil(data3.pageInfo.totalRows);

                    $(this).val("");

                    new Page({
                        id: pagination,
                        pageTotal: pageCount, //必填,总页数
                        pageAmount: 10,  //每页多少条
                        dataTotal: pageN, //总共多少条数据
                        curPage: pageCount, //初始页码,不填默认为1
                        pageSize: 5, //分页个数,不填默认为5
                        showPageTotalFlag: true, //是否显示数据统计,不填默认不显示
                        showSkipInputFlag: true, //是否支持跳转,不填默认不显示
                        getPage: function (page) {
                            //获取当前页数
                            console.log(page);
                        }
                    })
                }
            }
        });



    }

    //通过用户名查找
    $(".banner1").click(function () {
        var content = $(".titleText").val();
        if (content == null || content == "") {
            return
        } else {
            url = src + "/complaintInterface.dx";
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&content=" + content;

            var data2 = getSign(url, par);
            if (data2.msg && data2.msg.code == "200") {
                $(".feedback").html("");
                $(".paging").css({ "opacity": "0" })
            } else {
                $(".paging").css({ "opacity": "1" })
                render(data2);
                pageChange("get.dxWeb.feedbackList", data2, "pagination10", url);
            }


        }
    })
    //通过时间查找

    $(".time2").blur(function () {
        var starttime = $(".time1").val();
        var erdtime = $(".time2").val();
        if (starttime == null || starttime == "") {
            return
        } else {
            url = src + "/complaintInterface.dx";
            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&starttime=" + starttime + "&erdtime=" + erdtime;

            var data2 = getSign(url, par);
            if (data2.msg && data2.msg.code == "200") {
                $(".paging").css({ "opacity": "0" })
                $(".feedback").html("");
            } else {
                render(data2);
                $(".paging").css({ "opacity": "1" })
                pageChange("get.dxWeb.feedbackList", data2, "pagination10", url);
            }

        }
    })

    var inputs = document.querySelectorAll(".t1");//获取所有的input标签对象  
    var tall = document.querySelector(".tall");
    if (tall.checked == true) {

        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
        for (var i = 0; i < inputs.length; i++) {
            var obj = inputs[i];
            obj.checked = true;
        }
    }
    function render(data2) {
        if (data2.dxComplaintCateList.length > 0) {
            var str = "";
            $(".feedback").html("");
            $.each(data2.dxComplaintCateList, function (i, obj) {
                str += "<tr style='border-bottom: 1px solid #d8d8d8;' data-id='" + obj.id + "'>";
                str += "<td><div class='checkbox checkbox-primary'><input type='checkbox' class='styled styled-primary t1' id='t" + i + "'  aria-label='Single checkbox Two'data-id='" + obj.id + "' ><label for='t" + i + "'>" + obj.complaint_name + "</label></div></td><td>" + obj.feedback_content + "</td><td>" + obj.ip_addr + "</td> <td>" + obj.create_time + "</td><td><a  style='color:#48a4ea;'' class='details' data-id='" + obj.id + "'>详情</a></td>"
                str += "</tr> "
            })
            $(".feedback").html(str);
            judgePower();
        }
    }

    //判断权限
    function judgePower() {
        //页面初次渲染加载数据
        var data = window.localStorage.getItem("dxRightsList");
        data = JSON.parse(data);
        //console.log(data);
        var url, par;
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        var newAppsercet = appsercet.data;
        var arr = [];
        $.each(data, function (i, item) {
            //console.log(item)
            if (item.id == 8) {
                arr.push(item)
            }
        })
        console.log(arr[0]);
        $.each(arr[0].dxRightsList, function (i, item) {
            //console.log(arr[0].dxRightsList)
            if (item.method === "get.dxWeb.feedbackList") {
                url = src + "/" + item.link_path;

                //判断该角色是否有权限操作
                if (item.dxRightsTwoList.length == 0) {
                    return
                }
                else {
                    $.each(item.dxRightsTwoList, function (i, obj) {
                        //判断该用户是否有查看权限
                        if (obj.method === "get.dxWeb.feedbackDetails") {
                            $(".details").show();
                            //管理反馈内容选项卡下详情点击事件
                            $(".details").click(function () {
                                var id = $(this).attr("data-id");
                                $(".nv91-mask").fadeIn();
                                $(".nv92").show();
                                par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackDetails&id=" + id;
                                url = src + "/complaintInterface.dx"

                                var data = getSign(url, par);
                                $(".re1").html(data.msg.complaint_name);
                                $(".re2").html(data.msg.feedback_content);
                                $(".re3").html(data.msg.ip_addr);
                                $(".re4").html(data.msg.create_time);
                                $(".re5").html(data.msg.feedback_content);
                            })
                        }
                        //判断该用户是否有删除权限
                        if (obj.method === "get.dxWeb.deleteFfeedback") {
                            $(".isDelete").show();
                            $(".isDelete").click(function () {
                                var IdList;
                                var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
                                for (var i = 0; i < inputs.length; i++) {
                                    var obj = inputs[i];
                                    if (obj.type == 'checkbox') {
                                        checkboxArray.push(obj);
                                    }
                                }
                                IdList = new Array();
                                for (var i = 0; i < checkboxArray.length; i++) {
                                    if (checkboxArray[i].checked)
                                        IdList.push(checkboxArray[i].getAttribute("data-id"));
                                }
                                if (IdList.length == 0) {
                                    $(".confirm").hide();
                                    $(".prompt").text("至少选择一条数据");
                                    $(".nv91-mask").show();
                                    $(".confirm1").show();
                                    setTimeout(function () {
                                        $(".nv91-mask").hide();
                                        $(".confirm11").hide();

                                    }, 2000);
                                } else {
                                    $(".confirm1").hide();
                                    $(".confirm").show();
                                    $(".nv91-mask").show();
                                    $(".roleSure").click(function () {
                                        url = src + "/complaintInterface.dx";
                                        par = "IdList=" + IdList + "&method=get.dxWeb.deleteFfeedback&appsercet=" + newAppsercet;
                                        var data = getSign(url, par);
                                        if (data.msg.code == "200") {
                                            $(".confirm").hide();
                                            $(".prompt").text("删除成功");
                                            $(".nv91-mask").show();
                                            $(".nv1").show();
                                            setTimeout(function () {
                                                $(".nv91-mask").hide();
                                                $(".nv1").hide();
                                                location.reload();

                                            }, 2000);
                                        }
                                    })
                                    $(".roleRefuse5").click(function () {
                                        $(".confirm1").hide();
                                        $(".confirm").hide();
                                        $(".nv91-mask").hide();
                                    })


                                }

                            })
                        }
                        //判断该用户是否有分类反馈查看类别权限 
                        if (obj.method === "get.dxWeb.dxComplaintCateList") {
                            $(".lookType").show();
                            url = src + "/complaintInterface.dx";
                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.dxComplaintCateList";

                            var data = getSign(url, par);
                            console.log(data);
                            if (data.dxComplaintCateList.length > 0) {
                                var str = "";
                                $(".double").html("");
                                $.each(data.dxComplaintCateList, function (i, item) {
                                    str += '<tr style="border-bottom: 1px solid #dddddd;">';
                                    str += "<td>" + item.cate_name + "</td>"
                                    if (item.state == 1) {
                                        str += "<td>文本框</td>";
                                    } else {
                                        str += "<td>复选框</td>";
                                    }

                                    if (item.must_fill == 1) {
                                        str += "<td>&#10003;</td>";
                                    } else {
                                        str += "<td>&#10007;</td>";
                                    }
                                    if (item.enabled == 1) {
                                        str += "<td>&#10003;</td>";
                                    } else {
                                        str += "<td>&#10007;</td>";
                                    }
                                    str += '<td><a  style="color:#48a4ea;" class="deleteType" data-id="' + item.id + '">删除</a></td>'
                                    str += "</tr>";
                                })
                                $(".double").html(str);

                            }
                        }
                        //判断是否有添加反馈类别权限
                        if (obj.method === "get.dxWeb.addDxComplaintCate") {
                            $(".addInput").show();
                            //功能设置添加留言项事件点击
                            $(".addInput").click(function () {
                                $(".nv91-mask").fadeIn();
                                $(".nv91").show();
                                $(".addProject").click(function () {

                                    var cateName, state
                                    cateName = $(".newProject").val();
                                    var state = document.querySelectorAll(".state");
                                    if (state[0].checked == true) {
                                        state = 1;
                                    } else {
                                        state = 2;
                                    }
                                    var state1 = document.querySelectorAll(".state1");
                                    if (state1[0].checked == true) {
                                        state1 = 1;
                                    } else {
                                        state1 = 2;
                                    }
                                    var state2 = document.querySelectorAll(".state2");
                                    if (state2[0].checked == true) {
                                        state2 = 1;
                                    } else {
                                        state2 = 0;
                                    }

                                    url = src + "/complaintInterface.dx";
                                    par = "appsercet=" + newAppsercet + "&cateName=" + cateName + "&state=" + state + "&method=get.dxWeb.addDxComplaintCate&mustFill=" + state1 + "&enabled=" + state2;

                                    var data = getSign(url, par);

                                    if (data.msg.code == "200") {
                                        $(".confirm").hide();
                                        $(".prompt").text("添加成功");
                                        $(".nv91-mask").show();
                                        $(".nv1").show();
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".nv1").hide();
                                            location.reload();

                                        }, 2000);
                                    } else {
                                        $(".confirm").hide();
                                        $(".prompt").text("添加失败");
                                        $(".nv91-mask").show();
                                        $(".nv3").show();
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".nv3").hide();
                                            location.reload();

                                        }, 2000);
                                    }
                                })

                            });
                        }
                        //判断是否有删除反馈类别权限
                        if (obj.method === "get.dxWeb.deleteDxComplaintCate") {
                            $(".deleteType").show();
                            $(".deleteType").unbind('click').bind("click", function () {
                                //    $('.deleteType').click(function(){
                                var id = $(this).attr("data-id");

                                $(".nv91-mask").show();
                                $(".confirm").show();
                                $(".roleSure").unbind('click').bind("click", function () {
                                    // $(".roleSure").click(function(){
                                    url = src + "/complaintInterface.dx";
                                    par = "appsercet=" + newAppsercet + "&method=get.dxWeb.deleteDxComplaintCate&cateId=" + id;

                                    var data = getSign(url, par);
                                    if (data.msg.code === "10") {

                                        $(".confirm").hide();
                                        $(".prompt").text("删除成功");
                                        $(".nv91-mask").show();
                                        $(".nv1").show();
                                        setTimeout(function () {
                                            $(".nv91-mask").hide();
                                            $(".nv1").hide();
                                            par = "appsercet=" + newAppsercet + "&method=get.dxWeb.dxComplaintCateList";
                                            var bannerList = getSign(url, par);
                                            render(bannerList);

                                        }, 2000);

                                    }
                                })
                                $(".roleRefuse5").click(function () {
                                    $(".confirm1").hide();
                                    $(".confirm").hide();
                                    $(".nv91-mask").hide();
                                })

                            })

                        }
                    })
                }
            }
        })
    }
    //时间查询
    $('#demo2').daterangepicker({
        "showWeekNumbers": true,
        "showISOWeekNumbers": true,
        "timePicker": true,
        "timePickerSeconds": true,
        "locale": {
            "direction": "ltr",
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " ~ ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        },
        // "startDate": "04-11-2019",
        // "endDate": "04-11-2019"
    }, function (start, end, label) {
        var starttime = start.format('YYYY-MM-DD ');
        var endTime = end.format('YYYY-MM-DD ');
        var url = src + "/complaintInterface.dx";
        var appsercet = window.localStorage.getItem("appsercet");
        appsercet = JSON.parse(appsercet);
        newAppsercet = appsercet.data;
        par = "appsercet=" + newAppsercet + "&method=get.dxWeb.feedbackList&starttime=" + starttime + "&erdtime=" + endTime;

        var bannerList = getSign(url, par);
        if (bannerList.msg && bannerList.msg.code == "200") {
            $(".feedback").html("");
            $("#demo").val("");
        } else {
            render(bannerList);
            judgePower();
            $("#demo2").val("");
        }
        console.log(start.format('YYYY-MM-DD '));
        console.log(end.format('YYYY-MM-DD '));
        //   console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");

    });
})