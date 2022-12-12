const x_buttons = document.querySelector("#x"),
y_button = document.getElementById("y"),
r_buttons = document.querySelectorAll(".R-checkbox"),
table = document.querySelector("#values"),
submit_button = document.querySelector("#submit-button"),
clear_button = document.querySelector(".clear-button"),
error_text = document.querySelector("#text-error"),
err = document.querySelector(".err")

const stats = {
    x: undefined,
    y: undefined,
    r: undefined
};



function checkR(){
    const rCoordinatesArray = document.querySelectorAll('input[name="R-checkbox"]:checked');
    if (rCoordinatesArray.length === 1) {
        return setSuccessFor(rCoordinatesArray[0]);
    } else {
        return setErrorFor(document.querySelectorAll('input[name="R-checkbox"]')[0], "Выберите одно значение R");
    }
}

function isNumber(s){
    var n = parseFloat(s.replace(',','.'));
    return !isNaN(n) && isFinite(n);
}

function checkX(){
    const x_element = document.querySelector("#x");
    const xVal = x_element.value.replace(',','.');
    if(xVal.includes(".")){
        if(xVal.split('.').length > 2){
            return setErrorFor(x_element, "Данные введены неверно");
        }
        if (xVal.split(".")[1].length > 7){
            return setErrorFor(x_element, "Введите число с разрядностью после запятой меньше 7");
        }
    }
    

    if (!isNumber(xVal) || xVal === "") {
        return setErrorFor(x_element, "Пожалуйста, введите значение X");
    } else if (parseFloat(xVal) < -3 || parseFloat(xVal) > 3) {
        return setErrorFor(x_element, "Введите значение от -3 до 3");
    } else {
        return setSuccessFor(x_element);
    }
}



function validateForm() {
    return checkX() && checkR();
}

function setSuccessFor(input) {
    const err = document.querySelector('.err');

    err.innerText = "";


    return true;
}

function setErrorFor(input, message) {
    const err = document.querySelector('.err');
    err.style.color = "red"; 
    err.innerText = message;
    return false;
}

$("#form").on("submit", function(event) {
    event.preventDefault();
    console.log("hello");
    if(!validateForm()){
        return false;
    }
    x_buttons.value = x_buttons.value.replace(',','.');
    console.log("x="+ x_buttons.value +"&y="+y_button.value + "&r="+$('input[name="R-checkbox"]:checked')[0].value + "&offset=" + (new Date().getTimezoneOffset()));
    $.ajax({
        url : 'php/main.php',
        type : "GET",
        data : ("x="+ x_buttons.value +"&y="+y_button.value + "&r="+$('input[name="R-checkbox"]:checked')[0].value + "&offset="  + (new Date().getTimezoneOffset())),

        success: function(data) { 
            $("#values").html(data);
        },
        error : function(error){
            console.log(error);
        }
    })
})

$(document).ready(function() {
    $.ajax({
        url: 'php/load.php',
        type: "GET",
        success: function(data){
            $("#values").html(data);
        },
        error: function(error){
            console.log(error);
        }
    })
})

$("#clear-button").on("click", function(event) {
    event.preventDefault();

    document.querySelector("#x").value = '';
    $.ajax({
        url : 'php/clear.php',
        method : "GET",
        success: function(data) { 
            console.log(data);
            $("#values").html(data);
        }
    })
})



