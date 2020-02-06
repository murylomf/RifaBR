<?php
  session_start();
  require_once ("Database.php");

  if(!isset($_SESSION['admin-logged'])) {
    $response = new stdClass();
    $response->error = "Você está Deslogado";
    echo json_encode($response);
    exit;    
  }

  $db = new Database;
  $json = json_decode(file_get_contents('php://input'), true);

  $id = $json['id'];

  $stmt = $db->pdo->prepare("DELETE FROM raffle WHERE id = :id");
  $stmt->execute(array('id' => $id));


  $db->pdo = null;

  $response = new stdClass();
  $response->successfull = true;
  echo json_encode($response);
?>