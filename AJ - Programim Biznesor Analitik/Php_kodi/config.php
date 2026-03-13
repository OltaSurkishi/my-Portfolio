<?php
	$host = 'localhost';
	$user = 'root';
	$passw = '';
	$dbname = 'b_online';
			
	if (!($connection = @mysql_connect($host,$user,$passw))) die ("Host is unreachable");
	if (!(mysql_select_db($dbname,$connection))) die ("Database ".$dbname." is unreachable!");
?>