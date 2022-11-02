const x_buttons = document.querySelectorAll(".x");
const x_text = document.querySelector(".form-text x-text");
const y_button = document.querySelector(".y");
const y_text = document.querySelector(".y-value-row");
const r_buttons = document.querySelectorAll(".R-checkbox");
const r_text = document.querySelector(".form-text r-text");
const table = document.querySelector("#values");
const submit_button = document.querySelector("#submit-button");
const clear_button = document.querySelector(".clear-button");
var close = document.getElementById("close"); 
var modal = document.getElementById("modal-row");


const stats = {
        x: undefined,
        y: undefined,
        r: undefined
    };


let buttons = [];




function rChecker() {
        const rCoordinatesArray = document.querySelectorAll('input[name="r"]:checked');
        if (rCoordinatesArray.length == 1) {
                return setSuccessFor(rCoordinatesArray[0]);
        } else {
                return setErrorFor(document.querySelectorAll('input[name="r"]')[0], "Выберите одно значение R");
        }
    }



function xChecker(){
        const x_element = document.querySelector(".x");
        const xValue = x_element.value.replace(',','.');
        if(xValue.includes(".")){
            if(xValue.split('.').length > 2){
                return setErrorFor(x_element, "Данные введены неверно");
                
            }
            if (xValue.split(".")[1].length > 7){
                return setErrorFor(x_element, "Введите число с разрядностью после запятой меньше 7");
            }
        }
        if (!isNumber(xValue) || xValue === "") {
                return setErrorFor(x_element, "X не введено");
            } else if (parseFloat(xValue) < -3 || parseFloat(xValue) > 3) {
                return setErrorFor(x_element, "Введите значение от -3 до 3");
            } else {
                return setSuccessFor(x_element);
                
            }
            
}


function validateForm() {
        return xChecker()  && rChecker();
       
    }
        



