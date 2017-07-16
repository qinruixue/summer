<?php

header("Content-Type:application/json");

@$phone = $_REQUEST["phone"];

if(empty($phone))
{
    echo '[]';
    return;
}

require('init.php');;

$sql = "SELECT k_order.phone,k_order.oid,k_order.user_name,k_order.addr,k_order.order_time,k_order.did,k_dish.img_sm
FROM k_dish,k_order WHERE k_order.phone=$phone AND k_order.did=k_dish.did";

$result = mysqli_query($conn,$sql);

$output = [];
while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);


?>











