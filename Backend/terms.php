<?php
  require_once ("./php/Database.php");

  $db = new Database;

  $stmt = $db->pdo->prepare("SELECT * FROM terms WHERE id = 1");
  $stmt->execute();

  $terms = $stmt->fetchAll();  
  $terms = $terms[0]['term'];

  $db->pdo = null;
?>

<!DOCTYPE html>
<html>
  <head>
	  <title>Termos de Uso - Rifas BR</title>
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
	  <meta name="theme-color" content="#141414" />
	  <meta charset="utf-8">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
	  <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
	  <link rel="stylesheet" type="text/css" href="css/same.css">
    <link rel="stylesheet" type="text/css" href="css/terms.css">
  </head>

  <body>
    <div>
      <h1>Termos de Uso</h1>
      <?php echo nl2br($terms); ?>
    </div>
  </body>
</html>