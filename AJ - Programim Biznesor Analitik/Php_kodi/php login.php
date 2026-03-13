<?php
   $host = 'localhost';
   $user = 'root';
   $passw = '';
   $dbname = 'b_online';
         
   if (!($connection = @mysql_connect($host,$user,$passw))) die ("Host is unreachable");
   if (!(mysql_select_db($dbname,$connection))) die ("Database ".$dbname." is unreachable!");
?>


<?php
   $host = 'localhost';
   $user = 'root';
   $passw = '';
   $dbname = 'b_online';
         
   if (!($connection = @mysql_connect($host,$user,$passw))) die ("Host is unreachable");
   if (!(mysql_select_db($dbname,$connection))) die ("Database ".$dbname." is unreachable!");
?><?php
   $host = 'localhost';
   $user = 'root';
   $passw = '';
   $dbname = 'b_online';
         
   if (!($connection = @mysql_connect($host,$user,$passw))) die ("Host is unreachable");
   if (!(mysql_select_db($dbname,$connection))) die ("Database ".$dbname." is unreachable!");
?>

<?php
@session_start();
$username = $_REQUEST["usr"];
$psswd = $_REQUEST["pass"];


include 'config.php';
if (isset($username) && isset($HTTP_POST_VARS[$psswd]))
{
  // if the user has just tried to log in
  $username = $HTTP_POST_VARS['usr'];
  $psswd = $HTTP_POST_VARS['pass'];


  $query = "SELECT * FROM shfrytezuesit WHERE username='$username' and password='$psswd'";
          echo $query;
	$result=mysql_query($query);
	
	while($row=mysql_fetch_array($result)) {
		$id = $row['id_shfrytezuesit'];
		echo "ID: $id";
	}

	$nr=mysql_num_rows($result);
	if ($nr==1)
  {
session_start();
session_register("username");
session_register("psswd");

			      
  }
}
	$sql = "SELECT t.description, sh.id_shfrytezuesit
			FROM lloji_i_shfrytezuesit t JOIN shfrytezuesit sh ON sh.roli = t.id_e_shfrytezuesit
			WHERE username ='$username' and password='$psswd'";
	$result = mysql_query($sql);
					
	$sql = "select id_shfrytezuesit from shfrytezuesit where username = '$username' and password='$psswd'";
	$result1 = mysql_query($sql);
	$id = mysql_fetch_row($result1);
	
	if(!$result) {
		   $err=mysql_error();
		   echo $err;
		   exit();
	}
	if(mysql_affected_rows()==0){
	   echo "No such user in database! <a href=../a_b_online-ndryshim/index_b.php>Try to register!</a>";
	   echo "<br><br><br>";
	   exit();
	}
	while($row=mysql_fetch_array($result))
	{
		switch ($row['description']){				
		    case "Administrator":
			header('Location: ../a_b_online-ndryshim/admin/admin_home.php?id='.$row['id_shfrytezuesit'].'');
			break;
					
			case "Profesor":
			header('Location: ../a_b_online-ndryshim/profesor/pr_home.php?id='.$row['id_shfrytezuesit'].'');
			break;
						
			case "Student": 
			header('Location: ../a_b_online-ndryshim/student/st_home.php?id='.$row['id_shfrytezuesit'].'');
			break;
			
		}
	}
?>

<?php
	$host = 'localhost';
	$user = 'root';
	$passw = '';
	$dbname = 'b_online';
			
	if (!($connection = @mysql_connect($host,$user,$passw))) die ("Host is unreachable");
	if (!(mysql_select_db($dbname,$connection))) die ("Database ".$dbname." is unreachable!");
?>