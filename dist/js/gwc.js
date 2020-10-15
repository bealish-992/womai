$(function ($) {
    let storage = window.localStorage;
    let uid = storage.getItem("uid");

    if (uid) {
        $pimg = $("#pimg");
        $pname = $(".pname");
        $price = $("#price");
        $pnum = $(".pnum");
        $xiaoj = $("#xiaoji");
        

        // 获取购物车列表
        function getGoods() {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php?id=" + uid, data => {
                // console.log(data.data);
                let resObj = data.data;
                $("#shop_nav").text(resObj.length);
                resObj.forEach((obj, index) => {
                    let htmlStr = `<div class="good" data-id="${obj.pid}">
                        <div class="good_pic1">
                            <div>
                                <input type="checkbox" class="checkbox">
                                <a class="img"><img id="pimg" src="${obj.pimg}" alt=""></a>
                                <div class="pname">
                                    ${obj.pname}
                                </div>
                            </div>
                        </div>
                        <div class="good_pic2" id="price" data-price="${obj.pprice}">￥${obj.pprice}</div>
                        <div class="good_pic3">
                            <div class="reduce"></div>
                            <input type="text" class="pnum" value="${obj.pnum}">
                            <div class="plus"></div>
                        </div>
                        <div class="good_pic4">0.00</div>
                        <div class="good_pic5 xiaoji" ></div>
                        <div class="good_pic6">
                            <a>收藏</a>
                            <a class="delete">删除</a>
                        </div>
                    </div>`;
                    $(".goods_content").append(htmlStr);

                    let xj = obj.pnum * obj.pprice;
                    $(".xiaoji").eq(index).text("￥" + xj.toFixed(2)).attr("data-price", xj.toFixed(2));
                });
                // 给checkbox绑定点击事件
                $("#all").click(function () {
                    let flag = $("#all").get(0).checked;
                    let checkBoxs = $(".good .checkbox").get();
                    checkBoxs.forEach(checkbox => {
                        checkbox.checked = flag;
                    })
                    moneySum();
                })
                $(".good .checkbox").click(function () {
                    let checkBoxs = $(".good .checkbox").get();
                    let flag = true;
                    checkBoxs.forEach(checkbox => {
                        if (!checkbox.checked) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        $("#all").get(0).checked = true;
                    } else {
                        $("#all").get(0).checked = false;
                    }
                });
                $(".good .checkbox").click(moneySum);
                // 给加减数量按钮添加点击事件
                $(".reduce").click(function () {
                    let num = $(this).next().val();
                    if (num == 1) {
                        num = 1;
                    } else {
                        num--;
                    }
                    $(this).next().val(num);
                    chengePnum($(this).parent().parent(".good"));
                });
                $(".plus").click(function () {
                    let num = $(this).prev().val();
                    num++;
                    $(this).prev().val(num);
                    chengePnum($(this).parent().parent(".good"));
                })

                $(".delete").click(function(){
                    deleteGood($(this));
                })
            });

        };

        //删除
        function deleteGood(ele){
            $good=$(ele).parent().parent();
            let pid=$good.attr("data-id");
            let deleteUrl="http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid="+uid+"&pid="+pid;
            $.get(deleteUrl,res=>{
                $good.remove();
                
                let checkBoxs = $(".good .checkbox").get();
                    let flag = true;
                    checkBoxs.forEach(checkbox => {
                        if (!checkbox.checked) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        $("#all").get(0).checked = true;
                    } else {
                        $("#all").get(0).checked = false;
                    }
                
                moneySum();
            });
            
        }

        // 计算总金额,修改选中件数
        function moneySum() {
            let sum = 0.00;//总金额
            let account = 0;//选中件数
            let checkBoxs = $(".good .checkbox").get();

            // 页面内容重置
            (function () {
                $(".num em").text("0");
                $(".title-sum").text("金额合计￥0.00");
                $(".zongjia").text("￥0.00");
            })();

            checkBoxs.forEach(box => {
                if (box.checked) {
                    account++;
                    $good = $(box).parent().parent().parent();
                    let xiaoji = $good.find(".xiaoji").attr("data-price");
                    xiaoji = Number(xiaoji);
                    sum += xiaoji;
                    $(".num em").text(account);
                    $(".title-sum").text("金额合计￥" + sum.toFixed(2));
                    $(".zongjia").text("￥" + sum.toFixed(2));
                }
            })
        }

        // 增加，减少商品数量
        function chengePnum(good) {
            let pid = good.attr("data-id");
            let pnum = good.find(".pnum").val();
            let url = "http://jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=" + uid + "&pid=" + pid + "&pnum=" + pnum;
            $.get(url, data => {
                // console.log(data);
                let xj = good.find("#price").attr("data-price") * pnum;
                good.find(".xiaoji").text("￥" + xj.toFixed(2)).attr("data-price", xj.toFixed(2));
                moneySum();
                let checkBoxs = $(".good .checkbox").get();
                    let flag = true;
                    checkBoxs.forEach(checkbox => {
                        if (!checkbox.checked) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        $("#all").get(0).checked = true;
                    } else {
                        $("#all").get(0).checked = false;
                    }
            })
        }


        getGoods();//获取购物车

    }
});