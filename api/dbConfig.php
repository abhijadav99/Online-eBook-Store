<?php

$dbConn = new mysqli("localhost","root","","ebook");


if($dbConn->connect_error){
    die("Connection Failed ".$dbConn->connect_error);
}


?>