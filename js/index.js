let $clearButton = $("#clear-button"); // кнопка очистки
let $eraserButton = $("#eraser-button"); // ластик
let $penButton = $("#pen-button"); // ручка
let $content__drowing = $('#content__drowing'); // обертка холста
let canvas = document.getElementById('content__canvas'); // canvas
let ctx = canvas.getContext('2d'); // контекст canvas
let eraser = false; // ластик выключен

// Canvas resizing
canvasResize();
$(window).resize(canvasResize);

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

// * MY FUNCTIONS
// ф-ия рисования линий
function writing() {
    ctx.lineWidth = 6;
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
    canvas.height = window.innerHeight;
}