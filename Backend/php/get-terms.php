<?php
  session_start();
  require_once ("./Database.php");

  $db = new Database;

  $stmt = $db->pdo->prepare("SELECT term FROM terms WHERE id = 1");
  $stmt->execute();

  $results = $stmt->fetchAll();

  $db->pdo = null;

  echo json_encode($results[0]);    
?>