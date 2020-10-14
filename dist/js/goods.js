$(function($){
    $minImg=$(".minimg");
    $bigImg=$(".bigimg");
    $pname=$(".p-title");
    $price=$(".price");
    $pnum=$("#pnum");

    let storage=window.localStorage;
    let pid=storage.getItem("clickPid");
    let url="http://jx.xuzhixiang.top/ap/api/detail.php";
    if(pid){
        url=url+"?id="+pid;
        $.get(url,data=>{
            let good=data.data;
            $bigImg.attr("src",good.pimg);
            $minImg.html(`<li class="select">
                <img src="${good.pimg}" alt="">
            </li>`);
            $pname.text(good.pname);
            $price.html(`<em>￥</em>${good.pprice}`)
        })
    }else{
        window.location.href="../index.html";
    }


    $(".numd").click(function(){
        let num=$pnum.val();
        if(num==1){
            num=1;
        }else{
          num--;  
        }
        
        $pnum.val(num);
    });
    $(".numu").click(function(){
        let num=$pnum.val();
        num++;
        $pnum.val(num);
    });

    $(".buybtn").click(function(){
        let uid=storage.getItem("uid");
        let pnum=$pnum.val();
        let addGwcUrl="http://jx.xuzhixiang.top/ap/api/add-product.php?uid="+uid+"&pid="+pid+"&pnum="+pnum;
        $.get(addGwcUrl,data=>{
            // console.log(data);data.msg
            if(data.msg=="插入成功"){
                alert("添加购物车成功");
            }else{
                alert("添加失败，请重试");
            }
        })
    })
    
});