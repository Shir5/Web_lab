<%@ page import="com.sh1r.lab2.util.Variables" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .form-table{
            width: 100%;
            table-layout: fixed;
        }
        .form-table td{
            width: 100%;
        }
        td{
            border: 2px solid black;
        }
        .headder {
            width: 100%;
            font-family: sans-serif;
            color: #540E96;
            font-size: 50px;
            text-align:center;
        }
        .maintable{
            width: 100%;
            font-family: sans-serif;
            background-color: #E3A442;
        }
        .tableResults{
            width: 60%;
            position: relative;
        }


        .results {
            width: 100%;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-x: scroll;
        }

        .resultsTab {
            overflow-y: auto;
            width: 100%;
            min-height: 800px;
            table-layout: fixed;

        }

        .resultsTab thead {
            position: sticky;
            top: 0;
            background-color: #8A2BE2;
        }

        .resultsTab td {
            width: 100%;
        }

        .x-value-row{
            background-color: #8A2BE2;
        }

        .y-value-row{
            background-color: #8A2BE2;
        }

        .r-value-row{
            background-color: #8A2BE2;
        }

        .form-sub{
            font-family: sans-serif;
            background-color: #8A2BE2;
        }

        .clear{
            font-family: sans-serif;
            background-color: #8A2BE2;
        }

        .regular-checkbox {
            -webkit-appearance: none;
            background-color: #E3A442;
            border: 1px solid #000000;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
            padding: 9px;
            border-radius: 3px;
            display: inline-block;
            position: relative;
        }

        .regular-checkbox:checked {
            background-color: #C1CBFF;
            border: 1px solid #000000;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
            color: #C1CBFF;
        }

        .regular-select{
            background-color: #E3A442;
        }

        .regular-placeholder{
            background-color: #E3A442 ;
            color: #E3A442;
            -webkit-text-fill-color: #000000;
        }

        .form-submit{
            background-color: #8A2BE2; /* Green */
            border: 2px solid black;
            color: black;
            padding: 10px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
        }

        .input.error {
            border-color: red;
        }

        .checkbox__input.error + .checkbox__label {
            color: red;
        }
        #dots{
            z-index: 1000;
        }


    </style>
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
</head>
<body>
<table class="maintable">
    <tr class="headder">
        <td colspan="2" style="text-align:center">
            <strong> Демурчян Владимир Варламович, Группа: P32131, Вариант: 13155</strong>
        </td>
    </tr>
    <tr>
        <td style="text-align: center">
            <h1>
                График
            </h1>
            <svg height = "300" length = "300">

                <rect fill="#8a2be2" fill-opacity="0.50" stroke="blue" x="150" y="50" height="100" width="100"> </rect>
                <polygon points="250 150,150 200,150 150" style="fill:#8a2be2;stroke:blue;stroke-width:1;fill-opacity:0.50"></polygon>
                <path d="M 100 150 A 50 50, 90, 0, 0, 150 200 L 150 150 Z" fill="#8a2be2" stroke="blue" stroke-width="1" fill-opacity="0.50"></path>
                <line stroke="black" x1="150" y1="275" x2="150" y2="0"></line>
                <line stroke="black" x1="0" y1="150" x2="300" y2="150"></line>
                <polygon fill="black" points="150, 0 144, 15 155, 15"></polygon>
                <polygon fill="black" points="300, 150 285, 156 285,144 "></polygon>
                <text fill="black" x="180" y="135">1/2R</text>
                <text fill="black" x="235" y="135">R</text>
                <text fill="black" x="30" y="135">-R</text>
                <text fill="black" x="80" y="135">-1/2R</text>

                <text fill="black" x="155" y="85">1/2R</text>
                <text fill="black" x="155" y="45">R</text>
                <text fill="black" x="155" y="235">-R</text>
                <text fill="black" x="155" y="190">-1/2R</text>
                <svg id="dots" height="300" width="300"></svg>
            </svg>

        </td>
        <td rowspan="3" class="tableResults" style="text-align:center;vertical-align: top">
            <div class="infoheadder">
                <h1>
                    Таблица результатов итераций
                </h1>
            </div>
            <div class="results">
                <table class="resultsTab">
                    <thead>
                    <tr>
                        <th>Текущее время</th>
                        <th class="col">X</th>
                        <th class="col">Y</th>
                        <th class="col">R</th>
                        <th>Попадание</th>
                    </tr>
                    </thead>
                    <tbody id="res-body">
                    </tbody>
                </table>
            </div>
        </td>

    </tr>
    <tr>
        <td style="text-align:center;vertical-align: top">
            <h2 >
                Интерфейс
            </h2>
            <form class="js-form" name="form" id="form">
                <table class="form-table">
                    <tr><td class="form-text r-text" colspan="9"><div class="r-text1">Значение R</div></td></tr>
                    <tr class="r-value-row">
                        <td><input type="checkbox" class="regular-checkbox js-input-checkbox" name="R-checkbox" value="1">1</td>

                        <td><input type="checkbox" class="regular-checkbox js-input-checkbox" name="R-checkbox" value="2">2</td>
                        <td><input type="checkbox" class="regular-checkbox js-input-checkbox" name="R-checkbox" value="3">3</td>
                        <td><input type="checkbox" class="regular-checkbox js-input-checkbox" name="R-checkbox" value="4">4</td>
                        <td><input type="checkbox" class="regular-checkbox js-input-checkbox" name="R-checkbox" value="5">5</td>
                    </tr>

                    <tr><td class="form-text y-text" colspan="9"><div class="y-text1">Значение Y</div></td></tr>

                    <tr class="y-value-row" >
                        <td colspan="9"><input type="text" class="regular-placeholder js-input" placeholder="(-3 ... 5)"  name="y" id = "y"></td>
                        <div class="err" style="background-color: transparent">
                        </div>
                    </tr>

                    <tr><td class="x-text" colspan="9">
                        <div class="x-text1">Значение X</div>
                    </td></tr>
                    <tr class="x-value-row" >
                        <td colspan="9"><input type="text" class="regular-placeholder js-input" placeholder="(-5 ... 5)"  name="x" id = "x"></td>
                        <div class="err" style="background-color: transparent">
                        </div>
                    </tr>

                    <tr>

                        <td colspan="9">
                            <button type="submit" id="submit-button" class="form-submit">Ввести значения</button>
                        </td>


                    </tr>
                </table>
            </form>
        </td>
    </tr>
</table>
<script src="script.js"></script>
</body>
</html>