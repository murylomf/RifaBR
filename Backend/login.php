<?php
  session_start();

  if(isset($_SESSION['admin-logged']))
    header('location: index.php');
?>

<!DOCTYPE html>
<html>
  <head>
	  <title>Login Administrativo - Rifas BR</title>
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
	  <meta name="theme-color" content="#141414" />
	  <meta charset="utf-8">

	  <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
	  <link rel="stylesheet" type="text/css" href="css/same.css">
	  <link rel="stylesheet" type="text/css" href="css/login.css">
  </head>

  <body>
  	<img src="./img/text-logo.png">
  	<form>
      <div class="error"></div>
  	  <input type="email" placeholder="Email" id="email-input" required />
  	  <input type="password" placeholder="Senha" id="password-input" required />
  	  <input type="submit" value="Entrar" />
  	</form>

    <script type="text/javascript" src="js/same.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
  </body>
</html>