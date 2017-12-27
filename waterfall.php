<?php
header("content-type:text/html; charset=utf-8");
//----php加载json文件
$jsonStr=file_get_contents("info/data.json");
//----转换成数组
$totalArr =json_decode($jsonStr);
//----从数组中随机取十条,返回的是数组的索引组
$randomKeysArr=array_rand($totalArr,10);
//----定义一个存放最终结果的数组
$resultArr =array();
//----循环遍历$randomKeysArr中的数
for($i=0;$i<count($randomKeysArr);$i++){
$randomKey = $randomKeysArr[$i];
$randomObj = $totalArr[$randomKey];
//-----把每条数据添加到最终的结果数组中
array_push($resultArr,$randomObj);
}

//----给$resultArr起个名字，关系型数组
$valueArr =array(
    "items"=>$resultArr
);
echo json_encode($valueArr);
?>