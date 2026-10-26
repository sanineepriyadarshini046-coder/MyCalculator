let expression = "";
let justCalculated = false;

function appendValue(value) {
    if (justCalculated) {
        if ("0123456789.".includes(value)) {
            expression = "";
        }
        justCalculated = false;
    }

    expression += value;
    document.getElementById("display").value = expression;
}

function clearDisplay() {
    expression = "";
    justCalculated = false;
    document.getElementById("display").value = "0";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    justCalculated = false;
    document.getElementById("display").value = expression || "0";
}

function calculate() {
    try {
        if (!expression ||
            !/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" ||
            !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        expression = String(result);
        document.getElementById("display").value = expression;
        justCalculated = true;

    } catch (error) {
        document.getElementById("display").value = "Error";
        expression = "";
        justCalculated = false;
    }
}