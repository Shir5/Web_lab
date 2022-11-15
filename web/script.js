const x_buttons = document.querySelectorAll(".x");
const x_text = document.querySelector(".x-text");
const r_buttons = document.querySelectorAll(".R-checkbox");
const r_text = document.querySelector(".r-text");
const table = document.querySelector("#values");
const submit_button = document.querySelector("#submit-button");
const clear_button = document.querySelector(".clear-button");
const error_text = document.querySelector("#text-error"); 
const tool = document.querySelector(".err");

const stats = {
    x: undefined,
    y: undefined,
    r: undefined
};

const SELECTED_COLOR = '#1a73a8';
const BLUR_COLOR = '#000000';
const TEXT_COLOR = 'white';
const HOVER_COLOR = '#2196f3';

let buttons = [];


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
    const x_element = document.querySelector(".y");
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
        return setErrorFor(x_element, "Пожалуйста, введите значение Y");
    } else if (parseFloat(xVal) < -5 || parseFloat(xVal) > 5) {
        return setErrorFor(x_element, "Введите значение от -5 до 5");
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
    const tool = document.querySelector('.err');
    tool.style.color = "red"; 
    tool.innerText = message;
    return false;
}

function blurButton(button, val) {
    if (val != button.value) {
        button.style.backgroundColor = BLUR_COLOR;
    } else {
        button.style.backgroundColor = BLUR_COLOR;
    }
}

function uncheck(button, val) {
    button.checked = false;
    if (val != button.value) {
        button.checked = false;
    } else {
        button.checked = true;
    }
}