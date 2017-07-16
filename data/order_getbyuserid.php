<?php
/**根据用户id查询订单数据**/
header('Content-Type:application/json');

$output = [];

@$userid = $_REQUEST['userid'];

if(empty($userid)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
require('init.php');

$sql = "SELECT k_order.oid,k_order.userid,k_order.phone,k_order.addr,
k_order.totalprice,k_order.user_name,k_order.order_time,
k_orderdetails.did,k_orderdetails.dishcount,k_orderdetails.price,
k_dish.name,k_dish.img_sm

 from k_order,k_orderdetails,k_dish
WHERE k_order.oid = k_orderdetails.oid and k_orderdetails.did = k_dish.did and k_order.userid='$userid'";
$result = mysqli_query($conn, $sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
?>
