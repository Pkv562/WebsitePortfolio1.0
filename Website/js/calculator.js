document.addEventListener("DOMContentLoaded", () => {
    console.log("Calculator script loaded!");

    const buttons = document.querySelectorAll(".calc_buttons");
    const display = document.getElementById("display");
    console.log(document.getElementById("display"));

    if (!buttons.length || !display) {
        console.error("Calculator buttons or display not found!");
        return;
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.value;

            if (value === "C") {
                display.value = "";
            }
            else if (value === "=") {
                try {
                    let calcExpression = display.value.replace("÷", "/").replace("x", "*");
                    display.value = eval(calcExpression);
                }
                catch {
                    display.value = "Error";
                }
            }
            else if (value === "+/-") {
                display.value = display.value ? (-parseFloat(display.value)).toString() : "";
            }
            else {
                display.value += value;
            }
        });
    });
});


