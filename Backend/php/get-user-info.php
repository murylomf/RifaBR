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

  $stmt = $db->pdo->prepare('SELECT * FROM raffle ORDER BY id DESC LIMIT 1');
  $stmt->execute();

  $raffle = $stmt->fetchObject();

  $user->raffle = $raffle;

  $db->pdo = null;

  echo json_encode($user);
?>