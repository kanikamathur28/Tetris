<?php

$con = mysql_connect('localhost', 'root'  ,'password') or die("Failed to connect to MySQL: " . mysql_error());
$db = mysql_select_db('Tetris',$con) or die("Failed to connect to MySQL: " . mysql_error()); 
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
$name = trim($_GET['name']);
$email = trim($_GET['email']);
$password = trim($_GET['password']);

$query1 = "SELECT * from playerInfo WHERE Email='$email'";
$result1 = mysql_query($query1);
$count = mysql_num_rows($result1);

if($count == 0)
{
    $query2 = "INSERT INTO playerInfo VALUES('$email','$password','$name')";
    $result2 = mysql_query($query2);
    if($result2)
        echo "success";
    else
        echo "failed";
}
else
    echo "already";
mysql_close();

?>