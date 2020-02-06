<?php
  class Database {
    public $pdo;
	
	private $host = "162.241.60.154";
	private $dbname = "rifasb44_rifasbr";
	private $username = "rifasb44_root";
	private $password = "mRcst(Q22N{,";
	  
	function __construct(){
	  $this->pdo = new PDO("mysql:host=".$this->host.";dbname=".$this->dbname.";charset=utf8", $this->username, $this->password);
	}
  }
?>