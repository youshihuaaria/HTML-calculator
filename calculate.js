const calculate = function(first, operator, second) {
    const n1 = parseFloat(first);
    const n2 = parseFloat(second);

    switch(operator) {
        case "plus" : return (n1 * 10 + n2 * 10) / 10;
        case "minus" : return (n1 * 10 - n2 * 10) / 10;
        case "times" : return n1 * n2;
        case "divide" : return n1 / n2;
    }
}

const doTheMath = function(key, display, dataset) {
    
}


const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keys");
const display = calculator.querySelector(".display")

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        let key = e.target;
        let displayedValue = display.textContent;
        let ans = doTheMath(key, displayedValue, calculator.dataset);


    }
});