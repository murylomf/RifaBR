<?php
  session_start();
  require_once ("./Database.php");
  
  $db = new Database;
  $json = json_decode(file_get_contents('php://input'), true);

  $token = getallheaders()['User-Token'];

  if(!$token) {
    $db->pdo = null;
    $response = new stdClass();
    $response->error = "Usuário Deslogado";
    echo json_encode($response);
    exit;     
  }

  $stmt = $db->pdo->prepare('SELECT id, email, tickets, maxTickets, lastMoreAndMore, ticketsInNextRound FROM user WHERE token = :token');
  $stmt->execute(array('token' => $token));

  $user = $stmt->fetchObject();

  if(!$user) {
    $db->pdo = null;
    $response = new stdClass();
    $response->error = "Usuário Deslogado";
    echo json_encode($response);
    exit;
  }  


  if($user->tickets != 30) {
    $db->pdo = null;
    $response = new stdClass();
    $response->error = "Você não completou a Missão Mais e Mais";
    echo json_encode($response);
    exit;    
  }

  $daysDifference = 1;

  if($user->lastMoreAndMore) {
    $now = time();
    $your_date = strtotime($user->lastMoreAndMore);
    $datediff = $now - $your_date;
    $daysDifference = round($datediff / (60 * 60 * 24));
  }

  if($daysDifference < 1) {
    $db->pdo = null;
    $response = new stdClass();
    $response->error = "Espere 24h para Pegar os Tickets";
    echo json_encode($response);
    exit;    
  }

  $stmt = $db->pdo->prepare("INSERT INTO ticket (user_id) VALUES (:user_id)");
  $stmt->execute(array('user_id' => $user->id));

  $stmt = $db->pdo->prepare("INSERT INTO ticket (user_id) VALUES (:user_id)");
  $stmt->execute(array('user_id' => $user->id));

  $stmt = $db->pdo->prepare("UPDATE user SET lastMoreAndMore = NOW() WHERE id = :id");

  $stmt->execute(array('id' => $user->id));

  $stmt = $db->pdo->prepare('SELECT id, email, tickets, maxTickets, lastMoreAndMore, ticketsInNextRound FROM user WHERE token = :token');
  $stmt->execute(array('token' => $token));

  $user = $stmt->fetchObject();

  $db->pdo = null;

  echo json_encode($user);
?>