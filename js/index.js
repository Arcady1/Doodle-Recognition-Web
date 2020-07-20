let $clearButton = $("#clear-button"); // кнопка очистки
let $content__drowing = $('#content__drowing');
let canvas = document.getElementById('content__canvas'); // canvas
let ctx = canvas.getContext('2d'); // контекст canvas

// Canvas resizing
canvasResize();
$(window).resize(canvasResize);

canvas.onmousedown = function () {
    canvas.onmousemove = writing;
    canvas.onmouseup = stopWriting;
    canvas.onpointerleave = stopWriting;
}

// очистка холста
$clearButton.click(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// * MY FUNCTIONS
// ф-ия рисования линий
function writing() {
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
    ctx.moveTo(event.clientX, event.clientY);
}
// остановка рисования
function stopWriting() {
    ctx.beginPath();
    canvas.onmousemove = false;
}
// ф-ия изменяет размер canvas при изменении размера окна браузера
function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = $content__drowing.height();
}