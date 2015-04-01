<?php 
session_start();
$con = mysql_connect('localhost', 'root'  ,'password') or die("Failed to connect to MySQL: " . mysql_error());
$db = mysql_select_db('Tetris',$con) or die("Failed to connect to MySQL: " . mysql_error()); 
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

$u = trim($_GET['username']);
$p = trim($_GET['password']);
$count = 0;
$query = sprintf("SELECT * FROM playerInfo where Email = '%s' AND Password = '%s'",
                         mysql_real_escape_string($u),
                         mysql_real_escape_string($p)) ;

$result=mysql_query($query);

$count=mysql_num_rows($result);
$query1 = "SELECT max(Score) AS max_score FROM score";
    $result1= mysql_query($query1);
    $row = mysql_fetch_array($result1);
if($count==1){
    $_SESSION["username"] = $u;
    $output = "[";
    $output .= '{"result":"'. "success" . '",';
    $output .= '"Score":"' . $row["max_score"] . '"}'; 
    $output .="]";

}
else
{
   // $output =  array('result'=>'failure',
   //                 'max_score'=>'0');
    $output = "[";
    $output .= '{"result":"'. "failure" . '",';
    $output .= '"Score":"' . "0" . '"}'; 
    $output .="]";
    
}

echo($output);
mysql_free_result($result);
mysql_close();

?>

