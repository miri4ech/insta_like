<?php
	header('Content-Type: image/gif');
	readfile('assets/img/blank.gif');

    require_once('config.php');
	require_once('function.php');
	
try {
    $dbh = connectDb();

    $gift_type = $_GET[ 'key' ];
    $updated = date( 'Y-m-d H:i:s' );

    $sql = "UPDATE likecount_test.like_count SET updated = '{$updated}' , count = count + 1";

    $stmt = $dbh->prepare( $sql );

    $stmt->execute();
}catch(Exception $e){
    print "Can not connect to the database" . $e->getMessage();
}
exit;
