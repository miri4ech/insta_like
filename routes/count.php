<?php
	header('Content-type: application/json');
	header("Access-Control-Allow-Origin: *");

	require_once('config.php');
	require_once('function.php');

	try {

		$dbh = connectDb();

		$sth = $dbh->prepare("SELECT * FROM like_count");
		$sth->execute();

		$userData = array();

		while($row = $sth->fetch(PDO::FETCH_ASSOC)){
			$userData[]=array(
				'count'=>$row['count'],
			);
		}
		echo json_encode($userData);

	}catch(Exception $e){
	    print "Can not connect to the database" . $e->getMessage();
	}
	exit;