let $canvas = $('#content__canvas'); // canvas
let $canvasWidth = $canvas.width(); // ширина canvas
let $canvasHeight = $canvas.height(); // высота canvas
let $clearButton = $("#clear-button"); // кнопка очистки
let canvas = document.getElementById('content__canvas'); // canvas
let ctx = canvas.getContext('2d'); // контекст canvas

$clearButton.click(() => {
    ctx.clearRect(0, 0, $canvasWidth, $canvasHeight);
});