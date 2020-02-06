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

  $id = $_REQUEST['id'];
  $title = $_REQUEST['title'];
  $value = $_REQUEST['value'];
  $description = $_REQUEST['description'];
  $finish = $_REQUEST['finish'];

  if(!$value)
    $value = null;

  $filename = '';

  if(isset($_FILES['img'])) {
    $file = $_FILES['img'];

    $acceptExtensions = array('jpg', 'png', 'jpeg', 'gif');
    $extension = strtolower(explode('.', $file['name'])[count(explode('.', $file['name'])) - 1]);

    if(array_search($extension, $acceptExtensions) === false) {
      $db->pdo = null;
      $response = new stdClass();
      $response->error = "Insira um arquivo de extensão válida";
      echo json_encode($response);
      exit;
    }

    $filename = time() . rand(0, time()) . '.' . $extension;
  
    if(!move_uploaded_file($file['tmp_name'], '../upload/raffles/' . $filename)){
      $db->pdo = null;
      $response = new stdClass();
      $response->error = "Erro Durante o Upload";
      echo json_encode($response);
      exit;
    }
  }

  if(!$filename) {
    $stmt = $db->pdo->prepare("UPDATE raffle SET title = :title, value = :value, description = :description, finish = :finish WHERE id = :id");
    $stmt->execute(array('title' => $title, 'value' => $value, 'description' => $description, 'finish' => $finish, 'id' => $id));
  }

  if($filename) {
    $stmt = $db->pdo->prepare("UPDATE raffle SET title = :title, value = :value, description = :description, finish = :finish, img = :img WHERE id = :id");
    $stmt->execute(array('title' => $title, 'value' => $value, 'description' => $description, 'finish' => $finish, 'img' => $filename, 'id' => $id));
  }

  $stmt = $db->pdo->prepare("SELECT * FROM raffle WHERE id = :id");
  $stmt->execute(array('id' => $id));

  $results = $stmt->fetchAll();

  $db->pdo = null;

  echo json_encode($results[0]);
?>