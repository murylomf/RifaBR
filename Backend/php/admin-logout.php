<?php
	session_start();
	unset($_SESSION['admin-logged']);
	header('location: ../login.php');
?>