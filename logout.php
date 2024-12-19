<?php

session_start();
session_destroy();
require "db.php";
header("location: shapeshooter.php");
exit();



?>