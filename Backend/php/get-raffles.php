<?php
  session_start();
  require_once ("Database.php");

  if(!isset($_SESSION['admin-logged']))  {
    $response = new stdClass();
    $response->error = "Administrador Deslogado";
    echo json_encode($response);
    exit;   
  }

  $db = new Database;

  $stmt = $db->pdo->prepare("SELECT * FROM raffle ORDER BY id DESC");
  $stmt->execute();

  $results = $stmt->fetchAll();

  for($i = 0; $i < count($results); $i++) {
    if($results[$i]['winner_id']) {
      $stmt = $db->pdo->prepare("SELECT email FROM user WHERE id = :winner_id");
      $stmt->execute(array('winner_id' => $results[$i]['winner_id']));

      $user = $stmt->fetchAll();
      $results[$i]['winner'] = $user[0];
    }
  }

  $db->pdo = null;

  echo json_encode($results);
?>