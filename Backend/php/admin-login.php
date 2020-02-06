<?php
  session_start();

  $json = json_decode(file_get_contents('php://input'), true);
	
  $email = $json['email'];
  $password = $json['password'];
	
  if(!$email || !$password) {
  $db->pdo = null;
  $response = new stdClass();
  $response->error = "Faltando Dados (Email ou Senha)";
  echo json_encode($response);
  exit;     
  }

  if($email != 'sourifasbr@gmail.com') {
	  $response = new stdClass();
	  $response->error = "Email Inválido";
	  echo json_encode($response);
	  exit;
  }

  if(!password_verify($password, '$2y$10$xJo4VTy1gFoHVG0Nxnd.5uL/W9JW/8Lyji4ZvusfU511bbtk09ZAW')) {
	  $response = new stdClass();
	  $response->error = "Senha Inválida";
	  echo json_encode($response);
	  exit;
  }

  $_SESSION['admin-logged'] = true;

  $response = new stdClass();
  $response->successfull = true;
  echo json_encode($response);    
?>