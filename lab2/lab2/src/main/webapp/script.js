const
    table = document.querySelector("#res-body"),
    err = document.querySelector(".err"),
    dots = $('#dots')

$(document).ready(() => $('svg').on('click', (event) => {
    const r = checkR();
    if (r === false) {
        return
    }
    const position = getMousePosition(event)
    const x = (position.x - 150) / 100 * r
    const y = (150 - position.y) / 100 * r
    const color = isOnPlot(x, y, r) ? "green" : "red"
    console.log(position);
    createPointer(position.x, position.y, color)
    requestData({
        click: true,
        x: x.toFixed(3),
        y: y.toFixed(3),
        r: r
    })
}))

$('input[type=checkbox]').on('click', () => dots.empty())

function getMousePosition(event) {
    const rect = document.querySelector("svg").getBoundingClientRect()
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
function createPointer(x, y, color) {

    dots.html(`${dots.html()}<circle fill="${color}" 
        cx="${x}" cy="${y}" r="2.25"></circle>`)
}
function isOnPlot(x, y, r) {
    console.log(x,y,r);
    return (x >= 0 && y <= 0 && y >= (x / 2.0) - (r / 2.0)) || //triangle
        (x >= 0.0 && y >= 0.0 && x <= r && y <= r) || //rectangle
        (x <= 0 && y <= 0 && x**2 + y**2 <= (r / 2)**2); //circle
}
function setSuccessFor(input) {
    const err = document.querySelector('.err');
    err.innerText = "";
}

function setErrorFor(input, message) {
    const err = document.querySelector('.err');
    err.style.color = "red";
    err.innerText = message;
}

function isNumber(s){
    const n = parseFloat(s.replace(',','.'))
    return !isNaN(n) && isFinite(n)
}

function requestData(params) {

    table.innerHTML = $.ajax({
        async: false,
        url : 'control',
        type : "GET",
        dataType: 'json',
        data : params
    }).responseText
}
window.addEventListener("load", function () {
    requestData()

}, false);
function checkX() {
    const x_element = document.querySelector("#x");
    const xVal = x_element.value.replace(',', '.');
    if (!isNumber(xVal) || xVal === '') {
        setErrorFor(x_element, "X должен быть числом")
        return false
    }
    if (parseFloat(xVal) < -5 || parseFloat(xVal) > 5) {
        setErrorFor(x_element, "Введите значение от -5 до 5 в поле X")
        return false
    }
    setSuccessFor(x_element)
    return parseFloat(xVal)
}

function checkY() {
        const y_element = document.querySelector("#y")
        const yVal = y_element.value.replace(',','.')
        if (!isNumber(yVal) || yVal === '') {
            setErrorFor(y_element, "Y должен быть числом")
            return false
        }
        if (parseFloat(yVal) < -3 || parseFloat(yVal) > 5) {
            setErrorFor(y_element, "Введите значение от -3 до 5 в поле Y")
            return false
        }
        setSuccessFor(y_element)
        return parseFloat(yVal)
}

function checkR(){
    const rCoordinatesArray = document.querySelectorAll('input[name="R-checkbox"]:checked')
    if (rCoordinatesArray.length === 1) {
        setSuccessFor(rCoordinatesArray[0])
        return rCoordinatesArray[0].value
    } else {
        setErrorFor(document.querySelectorAll('input[name="R-checkbox"]')[0], "Выберите одно значение R")
        return false
    }
}

function validateForm() {
    const x = checkX(), y = checkY(), r = checkR(), click = false
    if (x === false || y === false || r === false) return false
    return {x, y, r, click}
}

$("#form").on("submit", function(event) {
    event.preventDefault();

    const data = validateForm()
    console.log(data)
    if(data === false) return
    const x =  data.x * (100 / data.r) + 150
    const y = -(data.y * (100/data.r) - 150)
    const color = isOnPlot(data.x, data.y, data.r) ? "green" : "red"
    createPointer(x,y,data.r,color)
    requestData(data)
})






