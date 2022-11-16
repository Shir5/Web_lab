var x_buttons = document.querySelectorAll("#x"),
x_text = document.querySelector(".x-text"),
r_buttons = document.querySelectorAll(".R-checkbox"),
r_text = document.querySelector(".r-text"),
table = document.querySelector("#values"),
submit_button = document.querySelector("#submit-button"),
clear_button = document.querySelector(".clear-button"),
error_text = document.querySelector("#text-error"),
err = document.querySelector(".err")

var stats = {
    x: undefined,
    y: undefined,
    r: undefined
};



function checkR(){
    const rCoordinatesArray = document.querySelectorAll('input[name="R-checkbox"]:checked');
    if (rCoordinatesArray.length === 1) {
        console.log("hello")
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
            console.log('hello');
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
    return checkX()  && checkR();
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

document.forms.form.onsubmit = function(event) {
    event.preventDefault();
    if(validateForm()){
        console.log('true')
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'php/main.php', true);
        let request = 'x=' + encodeURIComponent(stats.x);;
        request += '&' + 'y=' + encodeURIComponent(stats.y);
        request += '&' + 'r=' + encodeURIComponent(stats.r);
        request += '&' + 'offset=' + encodeURIComponent(new Date().getTimezoneOffset());

        xhttp.send(request);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                //table.innerHTML += xhttp.responseText;
                console.log(xhttp.responseText);
            }
        }
        
    }

}



