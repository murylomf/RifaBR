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

  $stmt = $db->pdo->prepare('SELECT * FROM user WHERE token = :token');
  $stmt->execute(array('token' => $token));

  $user = $stmt->fetchObject();

	if(!$user) {
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Usuário Deslogado";
	  echo json_encode($response);
	  exit;
	}  

  $token = md5(rand(0, time()) . rand(0, time()) . rand(0, time()));

  $stmt = $db->pdo->prepare("UPDATE user SET token = :token WHERE id = :id");

  $stmt->execute(array('token' => $token, 'id' => $user->id));

  $db->pdo = null;

  $response = new stdClass();
  $response->successfull = true;
  echo json_encode($response);
?>