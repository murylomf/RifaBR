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

  $stmt = $db->pdo->prepare("SELECT * FROM ticket ORDER BY RAND() LIMIT 1");
  $stmt->execute();

  $results = $stmt->fetchObject();

  $winnerId = $results->user_id;

  $stmt = $db->pdo->prepare("UPDATE raffle SET winner_id = :winnerId WHERE id = :id");
  $stmt->execute(array('winnerId' => $winnerId, 'id' => $id));  

  $stmt = $db->pdo->prepare("SELECT * FROM raffle WHERE id = :id");
  $stmt->execute(array('id' => $id));

  $raffle = $stmt->fetchObject();

  $stmt = $db->pdo->prepare("SELECT email FROM user WHERE id = :winner_id");
  $stmt->execute(array('winner_id' => $winnerId));

  $user = $stmt->fetchObject();
  $raffle->winner = $user;

  $stmt = $db->pdo->prepare("DELETE FROM ticket");
  $stmt->execute();

  $stmt = $db->pdo->prepare("UPDATE user SET tickets = ticketsInNextRound, ticketsInNextRound = 0, lastMoreAndMore = NULL, maxTickets = 20");
  $stmt->execute();  

  $stmt = $db->pdo->prepare("SELECT * FROM user WHERE tickets > 0");
  $stmt->execute();

  $users = $stmt->fetchAll();

  for($i = 0; $i < count($users); $i++) {
    $userFor = $users[$i];

    $stmt = $db->pdo->prepare("INSERT INTO ticket (user_id) VALUES (:user_id), (:user_id), (:user_id), (:user_id), (:user_id)");
    $stmt->execute(array('user_id' => $userFor['id']));      
  }

  $db->pdo = null;

  echo json_encode($raffle);
?>