<?php
  session_start();
  require_once ("./Database.php");

  $db = new Database;
  $json = json_decode(file_get_contents('php://input'), true);
	
  $email = $json['email'];
  $password = $json['password'];
  $passwordHash;
	
  if(!$email || !$password) {
  $db->pdo = null;
  $response = new stdClass();
  $response->error = "Faltando Dados";
  echo json_encode($response);
  exit;     
  }

  $stmt = $db->pdo->prepare('SELECT email FROM user WHERE email = :email');
  $stmt->execute(array('email' => $email));

  if(!$stmt->fetchAll()){
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Email não Cadastrado";
	  echo json_encode($response);
	  exit;
  }

  $stmt = $db->pdo->prepare('SELECT password, token FROM user WHERE email = :email');
  $stmt->execute(array('email' => $email));

  $result = $stmt->fetchAll();
  $passwordHash = $result[0]['password'];

  if(!password_verify($password, $passwordHash)){
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Senha Inválida";
	  echo json_encode($response);
	  exit;
  }

  $db->pdo = null;

  $response = new stdClass();
  $response->token = $result[0]['token'];
  echo json_encode($response);    
?>