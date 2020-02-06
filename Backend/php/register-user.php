<?php
  session_start();
  require_once ("./Database.php");
  
  $db = new Database;
  $json = json_decode(file_get_contents('php://input'), true);

  $email = $json['email'];
  $password = $json['password'];

  if(!$email || !$password) {
  $db->pdo = null;
  $response = new stdClass();
  $response->error = "Faltando Dados";
  echo json_encode($response);
  exit;     
  }

  $stmt = $db->pdo->prepare('SELECT email FROM user WHERE email = :email');
    $stmt->execute(array('email' => $email));

	if($stmt->fetchObject()){
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Email já Registrado";
	  echo json_encode($response);
	  exit;
	}  

  $password = password_hash($password, PASSWORD_DEFAULT);
  $token = md5(rand(0, time()) . rand(0, time()) . rand(0, time()));

  $stmt = $db->pdo->prepare("INSERT INTO user(email, password, token) VALUES (:email, :password, :token)");

  $stmt->execute(array('email' => $email, 'password' => $password, 'token' => $token));

  $db->pdo = null;

  $response = new stdClass();
  $response->token = $token;
  echo json_encode($response);
?>