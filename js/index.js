let $clearButton = $("#clear-button"); // кнопка очистки
let $eraserButton = $("#eraser-button"); // ластик
let $penButton = $("#pen-button"); // ручка
let $content__drowing = $('#content__drowing'); // обертка холста
let canvas = document.getElementById('content__canvas'); // canvas
let ctx = canvas.getContext('2d'); // контекст canvas
let eraser = false; // ластик выключен
let lineWeights = document.getElementsByClassName('line-weight_hover__item'); // ширина кистей

// Canvas settings 
// Resizing
canvasResize();
$(window).resize(canvasResize);
// Default settings
ctx.lineWidth = 6;
// Canvas writing
canvas.onmousedown = function () {
    if (eraser == true)
        ctx.strokeStyle = "#fff";
    else
        ctx.strokeStyle = "#000";

    canvas.onmousemove = writing;
    canvas.onmouseup = stopWriting;
    canvas.onpointerleave = stopWriting;
}

// * PAINT MENU
// очистка холста
$clearButton.click(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
// выбран ластик
$eraserButton.click(() => {
    eraser = true;
});
// выбрано перо
$penButton.click(() => {
    eraser = false;
});

// * PEN WEIGHT
lineWeights[0].onmousedown = () => {
    ctx.lineWidth = 6;
}
lineWeights[1].onmousedown = () => {
    ctx.lineWidth = 8;
}
lineWeights[2].onmousedown = () => {
    ctx.lineWidth = 10;
}
lineWeights[3].onmousedown = () => {
    ctx.lineWidth = 14;
}

// * MY FUNCTIONS
// ф-ия рисования линий
function writing() {
    ctx.lineCap = "round";
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.moveTo(event.offsetX, event.offsetY);
}
// остановка рисования
function stopWriting() {
    ctx.beginPath();
    canvas.onmousemove = false;
}
// ф-ия изменяет размер canvas при изменении размера окна браузера
function canvasResize() {
    canvas.width = $content__drowing.width();
    canvas.height = $content__drowing.height();
}