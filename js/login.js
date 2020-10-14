$(function ($) {
    //给a标签添加划过事件
    (function () {
        $color = "";
        $("a").not(".footer a").not(".mk a").hover(function () {
            $color = $(this).css("color");
            $(this).css("color", "#8db91f");
        }, function () {
            $(this).css("color", $color);
        })
    })();

    function login(pname,pwd,url){
        url+="?username="+pname+"&password="+pwd;
        $.get(url,data=>{
            if(data.code==0){
                $(".mk").show();
            }else if(data.code==1){
                let user=data.data;
                let storage=window.localStorage;
                storage.setItem("uid",user.id);
                storage.setItem("username",user.username);
                storage.setItem("token",user.token);
                window.location.href="../index.html";
            }
        });
    };

    $(".login_btn").click(function(){
        $pname=$(".username").val();
        $pwd=$(".pwd").val();
        login($pname,$pwd,"http://jx.xuzhixiang.top/ap/api/login.php");
    });

    $(".close_mk").click(function(){
        $(".mk").hide();
    })
    $(".reg_btn").click(function(){
        window.location.href="./regist.html";
    });
    
});