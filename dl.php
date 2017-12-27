<?php
session_start();
header("content-type:textml; charset=utf-8");

if(isset($_SESSION['Name'])){
    $user = $_SESSION['Name'];
    echo $user;
}else{
    echo 1;
}
?>
