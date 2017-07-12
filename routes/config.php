<?php

  $db_data = array(
	  'database' => 'likecount_test',
	  'username' => 'root',
	  'password' => '',
	  'host'     => 'localhost',
  );

define( 'DSN', 'mysql:host=localhost;dbname=' . $db_data[ 'database' ] );
define( 'DB_USER', $db_data[ 'username' ] );
define( 'DB_PASSWORD', $db_data[ 'password' ] );
error_reporting( E_ALL & ~E_NOTICE );

