<?php
    session_start();
    
    if (!isset($_SESSION['data'])) {
        $_SESSION = array();
        $_SESSION['data'] = array();
        echo '';
    } else {
        foreach ($_SESSION['data'] as $res) {
            echo '<tr>';
            echo '<td>' . $res['now'] . '</td>';
            echo '<td>' . $res['script_time'] . '</td>';
            echo '<td>' . $res['x'] . '</td>';
            echo '<td>' . $res['y'] . '</td>';
            echo '<td>' . $res['r'] . '</td>';
            echo '<td>' . $res['result'] . '</td>' . '</tr>';
        }
    }
?>