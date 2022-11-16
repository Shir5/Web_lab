<?php
session_start();

$x=$_GET['x'];
$y=$_GET['y'];
$r=$_GET['r'];

$offset = $_GET['offset'];

function validateOffset($offset){
    return (is_numeric($offset));
}

function validateY($Y){
    return is_numeric($y) && ($y == -2 || $y == -1.5 || $y == -1 || $y == -0.5 || $y == 0 $y == 0.5 || $y == 1 || $y == 1.5 || $y == 2);
}



function validateX($x){
    return is_numeric($x) && $x <= 3 && $x >= -3;
}


function validateR($r){
    return (is_numeric($r) && ($r == 1 || $r == 1.5 || $r == 2 || $r == 2.5 || $r == 3));
}



?>