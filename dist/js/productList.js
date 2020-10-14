$(function($){
    let storage=window.localStorage;
    let uid=storage.getItem("uid");
    let username=storage.getItem("username");
    let url="";
    if(uid&&username){
        url="http://jx.xuzhixiang.top/ap/api/productlist.php?uid="+uid;
    }else{
        url="http://jx.xuzhixiang.top/ap/api/allproductlist.php?pagesize=30&pagenum=1"
    }
    $.get(url,data=>{
        let products=data.data;
        products.forEach(obj => {
            $(".main_content").append(`<li>
            <a data-pid="${obj.pid}" class="pimg">
                <img src="${obj.pimg}" alt="">
            </a>
            <div class="pprice">
                <b>￥</b>
                ${obj.pprice}
            </div>
            <a data-pid="${obj.pid}" class="pname">
                    ${obj.pname}
            </a>
            <div class="li_bottom">
                <span class="pingjia">已评价10</span>
                <span class="collection">
                    <b class="png"></b>
                    收藏
                </span>
                <span class="add_car" data-pid="${obj.pid}">
                    <b class="png"></b>
                    加入购物车
                </span>
            </div>
        </li>`)
            
        });
        $(".add_car").click(function(){
            let addUrl="http://jx.xuzhixiang.top/ap/api/add-product.php?uid="+uid+"&pid="+$(this).attr("data-pid")+"&pnum=1";
            $.get(addUrl,data=>{
                //返回的结果
            })
        });
        $(".pimg").click(function(){
            clickGoods($(this).attr("data-pid"));
        });
        $(".pname").click(function(){
            clickGoods($(this).attr("data-pid"));
        })
    });
    function clickGoods(pid){
        storage.setItem("clickPid",pid);
        window.location.href="../html/goods.html";
    }
});