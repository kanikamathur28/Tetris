<?php
session_start();
$con = mysql_connect('localhost', 'root'  ,'password') or die("Failed to connect to MySQL: " . mysql_error());
$db = mysql_select_db('Tetris',$con) or die("Failed to connect to MySQL: " . mysql_error()); 
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
$lines = trim($_GET['lines']);
$score = trim($_GET['score']);
$user = $_SESSION["username"];

$query = "INSERT INTO score VALUES(DEFAULT,'$user','$score',now(),'$lines')";

$result=mysql_query($query);

if($result)
    echo "success";
else
    echo "failed";

mysql_close();

?>