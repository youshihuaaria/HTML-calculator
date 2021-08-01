let prevType = ""; // number, operator, decimal, clear, equal
let prevNum = 0;
let prevOP = ""; // plus, minus, times, divide
let modValue = 0;

// cannot use getElementsByClassName
const display = document.querySelector('.display');
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');

const calculate = (first, operator, second) => {
    const n1 = parseFloat(first);
    const n2 = parseFloat(second);

    switch (operator) {
        case "plus": return ((n1 * 10 + n2 * 10) / 10).toPrecision(4);
        case "minus": return ((n1 * 10 - n2 * 10) / 10).toPrecision(4);
        case "times": return (n1 * n2).toPrecision(4);
        case "divide": return (n1 / n2).toPrecision(4);
    }
}

keys.addEventListener('click', e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const keyContent = key.innerHTML;
        const action = key.dataset.action;
        const displayed = display.innerHTML;

        // Case 1: press a number
        if (!action) {
            console.log("number");
            if (displayed === '0' || prevType === "operator" || prevType === "calculate") {
                display.innerHTML = keyContent;
            } else {
                display.innerHTML = display.innerHTML + key.innerHTML;
            }
            prevType = "number";
        }

        // Case 2: press a decimal point
        if (action === 'decimal') {
            console.log("decimal");

            if (prevType === "equal") {
                prevNum = 0;
                prevType = "";
                prevOP = "";
                display.innerHTML = "0.";
            }

            if (prevType === "operator") {
                display.innerHTML = "0.";
            }
            if (!display.innerHTML.includes('.')) {
                display.innerHTML = display.innerHTML + key.innerHTML;
            }
            prevType = "decimal";
        }

        // Case 3: press an operator keys
        if (action === 'plus' || action === 'minus' || action === 'times' || action === 'divide') {
            console.log("prevOP: " + prevOP + " prevNum:" + prevNum + " prevType:" + prevType);

            if (prevType === "decimal" && displayed.charAt(displayed.length - 1) === ".") {
                display.innerHTML = displayed.slice(0, -1);
            }

            if (prevOP && prevNum && prevType !== "operator" && prevType !== "equal") {
                let first = prevNum;
                let second = displayed;
                let op = prevOP;
                display.innerHTML = calculate(first, op, second);;
            }

            prevNum = parseFloat(display.innerHTML);
            prevType = "operator";
            prevOP = action;
        }

        // Case 4: press enter
        if (action === "calculate") {
            console.log("calculate the answer");

            if (prevType === "decimal" && displayed.charAt(displayed.length - 1) === ".") {
                display.innerHTML = displayed.slice(0, -1);
            }

            if (prevOP) {
                let first = prevNum; //0
                let second = display.innerHTML; //0
                let op = prevOP;//minus

                if (prevType === "equal") {
                    second = modValue;
                    let ans = calculate(first, op, second);
                    display.innerHTML = ans;
                    prevNum = parseFloat(ans);
                } else {
                    modValue = second;
                    let ans = calculate(first, op, second);
                    display.innerHTML = ans;
                    prevNum = parseFloat(ans);
                }

                prevType = "equal";
            }
            console.log("prevOP: " + prevOP + " prevNum:" + prevNum + " prevType:" + prevType + " mod: " + modValue);

        }

        // Case 5: clear
        if (action === "clearAll") {
            console.log("clear");
            prevType = "";
            prevNum = 0;
            prevOP = "";
            display.innerHTML = "0";
        }

        if (action === "neg") {
            console.log("negative");
            if (displayed === "0") {

            } else if (displayed.includes("-")) {
                prevNum = -parseFloat(displayed);
                display.innerHTML = displayed.substring(1);
            } else {
                prevNum = -parseFloat(displayed);
                display.innerHTML = "-".concat(displayed);
            }

        }
    }
});