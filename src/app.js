function currentTime() {
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    hour = updateTime(hour);
    min = updateTime(min);

    document.getElementById('clock').innerText = `${hour}:${min}`;
}

let t = setTimeout(currentTime, 1000);

function updateTime(k) {
    if (k < 10) {
        return '0' + k;
    } else {
        return k;
    }
}

currentTime();

function formatScreen(output) {
    if (output.innerText.length <= 6) output.style = 'font-size: 64px';
    if (output.innerText.length > 6) output.style = 'font-size: 45px';
    if (output.innerText.length > 9) output.style = 'font-size: 35px';
    if (output.innerText.length > 12) output.style = 'font-size: 30px';
}

const output = document.querySelector('.output-value');
const btn = document.querySelectorAll('.btn');
let num = '';
let history = '';

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        let value = btn[i].textContent;
        value.innerHTML = btn[i].innerText;

        if (value == '=') {
            const res = eval(history);
            if (Number.isInteger(+res)) {
                output.innerText = res;
            } else {
                output.innerText = res.toFixed(2);
            }
            history = '';
            num = '';
        } else if (value == 'AC') {
            history = '';
            num = '';
            output.innerHTML = '0';
        } else if (value == '%') {
            output.innerHTML = +history / 100;
        } else if (!isNaN(value) || value == '.') {
            num += value;
            history += value;
            output.innerText = num;
        } else if (value == '+/-') {
            num = +num * -1;
            history = +history * -1;
            output.innerText = num;
        } else if (value == 'x') {
            num = '';
            history += '*';
        } else if (value == '÷') {
            num = '';
            history += '/';
        } else {
            num = '';
            history += value;
        }

        formatScreen(output);
    });
};