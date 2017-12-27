<?php
session_start();
$_SESSION["Name"]='';
 header("Content-Type:text/html; charset=utf-8");
 $filename="info/username.json";
 //----加载文件
 $js=file_get_contents($filename);
 //---转数组
 $js=json_decode($js);
 //---定义获得得值
 $unm=$_GET["username"];
 $pass=$_GET["password"];
 $flag =0;//----失败
 //-----判断是否存在数组中
 for($i=0;$i<count($js);$i++){
    if($js[$i]->name==$unm && $js[$i]->pwd==$pass ){
        $flag=1;
    }
 }
 if($flag==1){
 $_SESSION["Name"]=$unm;
 }
 echo $flag;
 ?>


