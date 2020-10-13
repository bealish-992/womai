$(function ($) {
    //给a标签添加划过事件
    (function () {
        $color = "";
        $("a").not(".footer a").hover(function () {
            $color = $(this).css("color");
            $(this).css("color", "#8db91f");
        }, function () {
            $(this).css("color", $color);
        })
    })();

    function login(pname,pwd,url){
        url+="?username="+pname+"&password="+pwd;
        $.get(url,data=>{
            console.log(data);
        });
    };

    $(".login_btn").click(function(){
        $pname=$(".username").val();
        $pwd=$(".pwd").val();
        login($pname,$pwd,"http://jx.xuzhixiang.top/ap/api/login.php");
    })

});