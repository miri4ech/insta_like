# [insta_like](https://miri4ech.github.io/insta_like/)

- instagram photos / layout pinterest like
- search by title

## Requirements

- [Your Instagram API AccessToken](https://www.instagram.com/developer/) 
- prefarable browser Chrome (layout may not be fixed with others)
- you need to add "routes/config.php" s

```config.php
<?php

    $db_data = array(
        'database' => 'test',
        'username' => 'test',
        'password' => 'test',
        'host'     => 'test',
    );

define( 'DSN', 'mysql:host=test;dbname=' . $db_data[ 'database' ] );
define( 'DB_USER', $db_data[ 'username' ] );
define( 'DB_PASSWORD', $db_data[ 'password' ] );
error_reporting( E_ALL & ~E_NOTICE );


```

## License

Code is open sourced under the [MIT license](LICENSE.md).
