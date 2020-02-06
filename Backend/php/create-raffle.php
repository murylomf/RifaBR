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

  $img = $_FILES['img'];
  $title = $_REQUEST['title'];
  $value = $_REQUEST['value'];
  $description = $_REQUEST['description'];
  $finish = $_REQUEST['finish'];

  if(!$value)
    $value = null;

  $acceptExtensions = array('jpg', 'png', 'jpeg', 'gif');
  $extension = strtolower(explode('.', $img['name'])[count(explode('.', $img['name'])) - 1]);

  if(array_search($extension, $acceptExtensions) === false) {
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Insira um arquivo de extensão válida";
	  echo json_encode($response);
	  exit;
  }

  $filename = time() . rand(0, time()) . '.' . $extension;
  
  if(!move_uploaded_file($img['tmp_name'], '../upload/raffles/' . $filename)){
	  $db->pdo = null;
	  $response = new stdClass();
	  $response->error = "Erro Durante o Upload";
	  echo json_encode($response);
    exit;
  }

  $stmt = $db->pdo->prepare("INSERT into raffle (title, value, description, finish, img) VALUES (:title, :value, :description, :finish, :img)");
  $stmt->execute(array('title' => $title, 'value' => $value, 'description' => $description, 'finish' => $finish, 'img' => $filename));

  $stmt = $db->pdo->prepare("SELECT * FROM raffle WHERE img = :img");
  $stmt->execute(array('img' => $filename));

  $results = $stmt->fetchAll();

  $db->pdo = null;

  echo json_encode($results[0]);
?>