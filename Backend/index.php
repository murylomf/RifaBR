<?php
  session_start();
  require_once ("./php/Database.php");

  if(!isset($_SESSION['admin-logged']))
    header('location: login.php');

  $db = new Database;

  $stmt = $db->pdo->prepare("SELECT * FROM raffle ORDER BY id DESC");
  $stmt->execute();

  $results = $stmt->fetchAll();

  for($i = 0; $i < count($results); $i++) {
    if($results[$i]['winner_id']) {
      $stmt = $db->pdo->prepare("SELECT email FROM user WHERE id = :winner_id");
      $stmt->execute(array('winner_id' => $results[$i]['winner_id']));

      $user = $stmt->fetchAll();
      $results[$i]['winner'] = $user[0];
    }
  }

  $stmt = $db->pdo->prepare("SELECT * FROM terms WHERE id = 1");
  $stmt->execute();

  $terms = $stmt->fetchAll();  
  $terms = $terms[0];

  $db->pdo = null;
?>

<!DOCTYPE html>
<html>
  <head>
	<title>Administração - Rifas BR</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
	<meta name="theme-color" content="#141414" />
	<meta charset="utf-8">

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/same.css">
  <link rel="stylesheet" type="text/css" href="css/modal.css">
	<link rel="stylesheet" type="text/css" href="css/admin.css">
  </head>

  <body>
  	<header>
      <img src="img/text-logo.png">
      <div>
        <span id="terms-button">Termos</span>
        <span id="send-notify-button">Notificação</span>
        <a href="php/admin-logout.php">Sair</a>
      </div>
    </header>
    
    <main>
      <section>
        <span id="show-winner-button">Ver Dados do Vencedor</span>
        <span id="delete-button">Deletar Rifa</span>
        <form id="raffle-form">
          <img src="./upload/raffles/none-img.png" />
          <input type="file" accept="image/x-png,image/gif,image/jpeg" />
          <input type="text" placeholder="Título" id="raffle-title" />
          <input type="number" placeholder="Valor" id="raffle-value" />
          <textarea placeholder="Descrição" id="raffle-description"></textarea>
          <input type="text" placeholder="Data Final (DD/MM/YYYY)" id="raffle-date" required />
          <input type="text" placeholder="Horário Final (HH:MM:SS)" id="raffle-hour" required />
          <input type="submit" value="Criar" id="raffle-submit">
        </form>  
      </section>
      
      <aside>
        <div id="new-button" class="selected">
          <h3>Criar Nova Rifa</h3>
        </div>

        <article id="aside-elements">
        </article>
      </aside>
    </main>

    <div class="modal-background" id="winner-modal">
      <i class="material-icons" id="winner-close-modal">close</i>
      <div class="modal">
        <span>O Email do Vencedor dessa Rifa é <b></b></span>
      </div>
    </div>

    <div class="modal-background" id="notification-modal">
      <i class="material-icons" id="notification-close-modal">close</i>
      <div class="modal">
        <b>Enviar Notificação</b>
        <form id="notification-form">
          <input type="text" placeholder="Título" id="notification-title" required />
          <input type="text" placeholder="Mensagem" id="notification-message" required />
          <input type="submit" value="Enviar" id="notification-submit" />
        </form>
      </div>
    </div>    

    <div class="modal-background" id="terms-modal">
      <i class="material-icons" id="terms-close-modal">close</i>
      <div class="modal">
        <b>Termos de Uso</b>
        <form id="terms-form">
          <textarea placeholder="Termos de Uso" id="terms-text" required><?php echo $terms[0]; ?></textarea>
          <input type="submit" value="Modificar" id="terms-submit" />
        </form>
      </div>
    </div>

    <script src="https://unpkg.com/vanilla-masker@1.1.1/lib/vanilla-masker.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>

    <script type="text/javascript">
      let raffles = <?php echo json_encode($results); ?>;
    </script>
    <script type="text/javascript" src="js/same.js"></script>
    <script type="text/javascript" src="js/modal.js"></script>
    <script type="text/javascript" src="js/admin-requests.js"></script>
    <script type="text/javascript" src="js/admin.js"></script>
  </body>
</html>