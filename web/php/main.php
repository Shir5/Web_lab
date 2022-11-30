<?php
session_start();

$x=$_GET['x'];
$y=$_GET['y'];
$r=$_GET['r'];
$xcor = sprintf("%01.3f", $x);
$offset = $_GET['offset'];

function validateOffset($offset){
    return (is_numeric($offset));
}

function validateY($y){
    return is_numeric($y) && ($y == -2 || $y == -1.5 || $y == -1 || $y == -0.5 || $y == 0 || $y == 0.5 || $y == 1 || $y == 1.5 || $y == 2);
}



function validateX($x){
    return is_numeric($x) && $x <= 3 && $x >= -3;
}


function validateR($r){
    return (is_numeric($r) && ($r == 1 || $r == 1.5 || $r == 2 || $r == 2.5 || $r == 3));
}

function circleChecker($x, $y, $r){
    return ($x<=0 && $y >= 0 && ($x^2) + ($y^2)<=($r^2));
}

function rectangleChecker($x, $y, $r){
    return ($x >= 0 && $y >=0 && $y <= (0.5*$r) && $x <= $r);
}

function triangleChecker($x, $y, $r){
    return($x <= 0 && $y <= 0 && -2*($x+$y) >= $r );
}
function result($x, $y, $r){
    return(circleChecker($x, $y, $r) || rectangleChecker($x, $y, $r) || triangleChecker($x, $y, $r));
}
$result = (validateY($y) && validateX($xcor) && validateR($r) && validateOffset($offset)) ? (result($xcor, $y, $r) ? 'Попадание' : 'Промах') : 'value error';
$time_end = microtime(true);
$script_time = number_format($time_end - $time_start, 6, ',', '');
$response = array('x' => $xcor, 'y' => $y, 'r' => $r, 'now' => date('j M o G:i:s', time() - $offset * 60), 'script_time' => $script_time, 'result' => $result);
array_push($_SESSION["data"], $response);

if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}

foreach ($_SESSION["data"] as $elem){
    echo '<tr>';
    echo '<td>' . $elem['now'] . '</td>';
    echo '<td>' . $elem['script_time'] . '</td>';
    echo '<td>' . $elem['x'] . '</td>';
    echo '<td>' . $elem['y'] . '</td>';
    echo '<td>' . $elem['r'] . '</td>';
    echo '<td>' . $elem['result'] . '</td>';
    echo'</tr>';
}
?>