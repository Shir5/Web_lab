var form = document.querySelector('.js-form'),
formInputs = document.querySelectorAll('.js-input'),
inputX = document.querySelector('.regular-placeholder'),
inputCheckbox = document.querySelector('.js-input-checkbox');


function validateX(x) {
let re = /1/;
return re.test(String(x).trim());
}



form.onsubmit = function() {
let xVal = inputX.value,
    emptyInputs = Array.from(formInputs).filter(input => input.value === '');
formInputs.forEach(function (input) {
    if (input.value === '') {
        input.classList.add('error');

    } else {
        input.classList.remove('error');
    }
});

if (emptyInputs.length !== 0) {
    console.log('inputs not filled');
    return false;
}

if(!validateX(xVal)) {
    console.log('X not valid');
    inputX.classList.add('error');
    return false;
} else {
    inputX.classList.remove('error');
}


if(!inputCheckbox.checked) {
    console.log('checkbox not checked');
    inputCheckbox.classList.add('error');
    return false;
} else {
    inputCheckbox.classList.remove('error')
}


}