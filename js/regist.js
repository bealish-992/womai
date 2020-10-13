$(function($){
    // 载入底部footer
    $(".footer").load("../html/login.html .footer");


    $email=$("#email");
    $pname=$("#username");
    $pwd=$("#pwd");
    $repwd=$("#repwd");
    $agree=$("#agree");
    $regBtn=$("#regBtn");
    $regBtn.attr("disabled","true");


    
    let emallError=false;
    $email.blur(function(){
        let val=$(this).val();
        let regEmail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let regPhone=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let flag=regEmail.test(val)||regPhone.test(val);
        if(flag){
            emallError=false;//输入无误
            $(this).next().hide();
        }else{
            emallError=true;//输入有误
            $(this).next().html("<i></i>请输入正确的邮箱/手机格式").show();
        }
    });
    let pnameError=false;
    $pname.blur(function(){
        let val=$(this).val();
        let reg=/^.{4,20}$/;
        let flag=reg.test(val);
        if(flag){
            pnameError=false;//输入无误
            $(this).next().hide();
        }else{
            pnameError=true;//输入有误
            $(this).next().html("<i></i>用户名在4~20个字符之间").show();
        }
    });
    let pwdError=false;
    $pwd.blur(function(){
        let val=$(this).val();
        let reg1=/^.{8,16}$/;
        let flag1=reg1.test(val);
        let reg2=/[A-Za-z]/g;
        reg2.exec(val);
        let reg3=/[0-9]/g;
        reg3.exec(val)
        let flag2=reg2.exec(val)&&reg3.exec(val);
        if(flag1&&flag2){
            pwdError=false;//输入无误
            $(this).next().hide();
        }else if(!flag1){
            pwdError=true;//输入有误
            $(this).next().html("<i></i>密码在8~16个字符之间").show();
        }else{
            pwdError=true;//输入有误
            $(this).next().html("<i></i>密码需要包含至少2个字母和2个数字").show();
        }
    });
    let repwdError=false;
    $repwd.blur(function(){
        let p=$pwd.val();
        let rp=$repwd.val();
        let flag=(p==rp);
        if(flag){
            repwdError=false;//输入无误
            $(this).next().hide();
        }else{
            repwdError=true;//输入有误
            $(this).next().html("<i></i>密码不一致").show();
        }
    });
    $agree.click(function(){
        if($(this).get(0).checked){
            $regBtn.get(0).disabled=false;
        }else{
            $regBtn.get(0).disabled=true;
        }
    });
    $regBtn.click(function(){
        if(!emallError&&!pnameError&&!pwdError&&!repwdError){
            let pname=$pname.val();
            let pwd=$pwd.val();
            let url="http://jx.xuzhixiang.top/ap/api/reg.php?username="+pname+"&password="+pwd;
            $.get(url,data=>{
                if(data.code==1){
                    $(".countdown").show();
                    let t=3;
                    let timer=window.setInterval(function(){
                        t--;
                        $(".countdown .time").text(t);
                        if(t==0){
                            window.location.href="./login.html";
                            window.clearInterval(timer);
                        }
                    },1000)
                }
                if(data.code==0){
                    $(".shibai").find(".reason").text("用户名已存在").end().show();
                    $(".shibai").find("a").click(function(){
                        window.location.reload();
                    })
                }
            })
        }
    })
});

