<?php
session_start();
$con = mysql_connect('localhost', 'root'  ,'password') or die("Failed to connect to MySQL: " . mysql_error());
$db = mysql_select_db('Tetris',$con) or die("Failed to connect to MySQL: " . mysql_error()); 
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}
$user = $_SESSION["username"];
$query = "SELECT * FROM score WHERE Email='$user'";
$result = mysql_query($query);

$outp = "[";
while($row = mysql_fetch_array($result)) 
{
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"Score":"'. $row["Score"] . '",';
    $outp .= '"Lines":"' . $row["Lines"] . '"}'; 
}
$outp .="]";
mysql_close();
echo($outp);

?>