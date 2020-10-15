
$(function ($) {
    let storage=window.localStorage;
    // 给页面的a标签添加划过颜色
    (function () {
        $aColor = 'rgb(80, 70, 70)';
        $("a").not($(".jk-l-nav a")).not($(".footer a")).not($("#main a")).hover(function () {
            $aColor = $(this).css("color");
            $(this).css({ "color": "#C70019" })
        }, function () {
            $(this).css({ "color": $aColor })
        });
    })();


    // banner右侧服务列表的图片添加
    (function () {
        for (let i = 1; i <= 9; i++) {
            $(".servers").append(`<li>
                <img class="servers_in" src="./img/server${i}.jpg" />
            </li>`)

        }
    })();

    // 轮播间隔时间
    $("#lunbo").carousel({ interval: 3000 });

    // 选择城市
    $("#city").click(function (e) {
        console.log(e.target);
        if (e.target == this || e.target == $(".city-in").get(0) || e.target == $(".closebtn").get(0)) {
            $(".city-section").toggle();
            $(".mk").toggle();

        }
    });

    // banner的nav列表展示
    $("#banner .kinds").hover(function () {

        $(".nav-section").show();
        $(this).css("background-color", "#fff").children(".nav-icon").css("background-position", "-19px 0px").nextAll("a").css("color", "#C70019");
    }, function () {
        $(".nav-section").hide();
        $(this).css("background-color", "#C70019").children(".nav-icon").css("background-position", "0px 0px").nextAll("a").css("color", "#fff");
    });

    $(window).scroll(function () {
        if ($(document).scrollTop() > 300) {
            $(".scroll-search").stop().animate({ top: '0px' }, 300);
        } else {
            $(".scroll-search").stop().animate({ top: '-100px' }, 300);
        }
    });

    // 头部购物车行为
    $(".top-gwc .wrap").hover(function () {
        $(this).css({ "border": "1px solid #C70019", "border-bottom": "none" });
        $(".top-gwc-list").show();
        $(".arrow-d").removeClass("arrow-d").addClass("arrow-u");
    }, function () {
        $(this).css({ border: "none" });
        $(".top-gwc-list").hide();
        $(".arrow-u").removeClass("arrow-u").addClass("arrow-d");
    });


    // 给右侧边栏添加行为
    $(".car").hover(function () {
        $(this).css({ "background-color": "#3da700" }).children("span").css({ "background-color": "#000" }).end().children("i").css({ "background-position": "-178px -42px" });
    }, function () {
        $(this).css({ "background-color": "#000" }).children("span").css({ "background-color": "#3da700" }).end().children("i").css({ "background-position": "-178px -8px" });
    });
    $(".side-bottom ul li").hover(function () {
        $(this).find("span").show().end().find("i").addClass("cur");
    }, function () {
        $(this).find("span").hide().end().find("i").removeClass("cur");
    })
    $(".car").click(function () {
        if ($(".side-gwc").css("right") != "0px") {
            $(".side-gwc").stop().animate({ "right": "0px" }, 500).find(".gwc-list-in").delay(400).animate({ "left": "0px" }, 400);
        } else {
            $(".side-gwc").stop().animate({ "right": "-276px" }, 500).find(".gwc-list-in").delay(400).animate({ "left": "276px" }, 400);
        }

    });
    $(".gwc-title").find("i").click(function () {
        $(".side-gwc").stop().animate({ "right": "-276px" }, 500);
    });
    $(".go-top").click(function () {
        $(document).scrollTop(0);
    });

    // 列表选项卡
    $("#jx").mouseenter(function(){
        $(this).addClass("cur");
        $("#rm").removeClass("cur");
        $(".jingxuan").show();
        $(".remai").hide();
    });
    $("#rm").mouseenter(function(){
        $(this).addClass("cur");
        $("#jx").removeClass("cur");
        $(".remai").show();
        $(".jingxuan").hide();
    })


    // 获取公共商品列表
    function getPublicProducts() {
        $.get("http://jx.xuzhixiang.top/ap/api/allproductlist.php?pagesize=100&pagenum=1", function (data) {
            arrProducts = data.data;
            let i = 1;
            arrProducts.forEach(obj => {
                if (obj.pimg.match(/.jpg|.png/)) {
                    if (i <= 6) {
                        $(".jingxuan").append(`<li data-id="${obj.pid}">
                            <a><img class="pimg" src="${obj.pimg}" alt=""></a>
                            <a class="pname mleft">${obj.pname}</a>
                            <span class="mleft">￥<span>${obj.pprice}</span></span>
                        </li>`)
                    }
                    if (i >= 7 && i <= 14) {
                        $(".remai").append(`<li data-id="${obj.pid}">
                            <a><img class="pimg" src="${obj.pimg}" alt=""></a>
                            <a class="pname mleft">${obj.pname}</a>
                            <span class="mleft">￥<span>${obj.pprice}</span></span>
                        </li>`)
                    }
                    i++;
                }
            });
            $(".pimg").hover(function(){
                $(this).parent().next().css("color","rgb(140,185,30)");
            },function(){
                $(this).parent().next().css("color","#606060")
            });
            $(".jk-list .pname").hover(function(){
                $(this).css("color","#c70019");
            },function(){
                $(this).css("color","#606060")
            })
        })
    }
    getPublicProducts();

    $(".zhuxiao").click(function(){
        storage.clear();
        window.location.reload();
    })

    // 检查登录状态，并修改页面内容
    function checkLogin(){
        let uid=storage.getItem("uid");
        let username=storage.getItem("username");
        if(uid&&username){
            // console.log(uid,username)
            $("#header_username").text(username).show().css("color","red");
            $(".zhuxiao").show().css("font-size","12px");
            $("#login").hide().next().hide();
        }else{
            $("#header_username").hide();
            $(".zhuxiao").hide();
            $("#login").show();
            $("#regist").show();
        }
    }
    checkLogin();
    

    // 添加购物车数据
    function getgwcList(){
        let uid=storage.getItem("uid");
        console.log(uid);
        if(uid){
            $(".items").html("");
            $(".products").html("");
            $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php?id="+uid,data=>{
                let resData=data.data;
                let len=resData.length;
                $("#top-gwc-account").text(len);
                $("#gwc-account").text(len);
                $("#side-gwc-account").text(len);
                resData.forEach(good=>{
                    $(".items").append(`<dl>
                        <dt><a><img src="${good.pimg}" alt=""></a></dt>
                        <dd>${good.pname}</dd>
                        <dd>
                            <div class="pri">
                                <span>￥${good.pprice}<span>x${good.pnum}</span></span>
                            </div>
                            <div class="del-btn" >
                                <span class="delete" data-id="${good.pid}">删除</span>
                            </div>
                        </dd>
                    </dl>`);
                    $(".products").append(`<dl>
                        <dt>
                            <a>
                                <img src="${good.pimg}" alt="">
                            </a>
                        </dt>
                        <dd class="pro-name fLeft">
                            <a>${good.pname}</a>
                        </dd>
                        <dd class="pro-price fLeft">
                            <span>￥${good.pprice}</span>
                            <span>&nbsp;x&nbsp;${good.pnum}</span>
                            <span><a class="delete" data-id="${good.pid}">删除</a></span>
                        </dd>
                    </dl>`)
                });
                $(".delete").click(function(){
                    let pid=$(this).attr("data-id");
                    let deleteUrl="http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid="+uid+"&pid="+pid;
                    $.get(deleteUrl,res=>{
                        getgwcList();
                    })
                })
            })
        }
    }
    getgwcList();
});

