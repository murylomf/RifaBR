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

  if($user->tickets >= $user->maxTickets) {
    $db->pdo = null;
    $response = new stdClass();
    $response->error = "Máximo de Tickets Atingidos";
    echo json_encode($response);
    exit;    
  }

  $stmt = $db->pdo->prepare("INSERT INTO ticket (user_id) VALUES (:user_id)");

  $stmt->execute(array('user_id' => $user->id));

  $stmt = $db->pdo->prepare("UPDATE user SET tickets = tickets + 1 WHERE id = :id");

  $stmt->execute(array('id' => $user->id));
  $user->tickets = $user->tickets + 1;

  // Missão Mais Espaço
  if($user->tickets == 20) {
    $stmt = $db->pdo->prepare("UPDATE user SET maxTickets = maxTickets + 10 WHERE id = :id");

    $stmt->execute(array('id' => $user->id));
    $user->maxTickets = $user->maxTickets + 10;
    $user->missionUnlocked = 'Mais Espaço';
  }

  // Missão Sua Honra
  if($user->tickets == 25) {
    $stmt = $db->pdo->prepare("UPDATE user SET ticketsInNextRound = 5 WHERE id = :id");

    $stmt->execute(array('id' => $user->id));
    $user->ticketsInNextRound = 5;
    $user->missionUnlocked = 'Sua Honra';
  }

  // Missão Mais e Mais
  if($user->tickets == 30) {
    $stmt = $db->pdo->prepare("UPDATE user SET moreAndMoreUnlocked = 1 WHERE id = :id");

    $stmt->execute(array('id' => $user->id));
    $user->missionUnlocked = 'Mais e Mais';
  }

  $db->pdo = null;

  echo json_encode($user);
?>