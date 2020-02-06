<?php
  session_start();
  require_once ("./Database.php");

  $db = new Database;
  $json = json_decode(file_get_contents('php://input'), true);
  
  if(!isset($_SESSION['admin-logged'])) {
    $response = new stdClass();
    $response->error = "Você está Deslogado";
    echo json_encode($response);
    exit;    
  }

  $terms = $json['terms'];

  $stmt = $db->pdo->prepare("UPDATE terms SET term = :term WHERE id = 1");
  $stmt->execute(array('term' => $terms));

  $db->pdo = null;

  $response = new stdClass();
  $response->successfull = true;
  echo json_encode($response);    
?>