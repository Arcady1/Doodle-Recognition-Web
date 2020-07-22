let $penButton = $("#pen-button"); // ручка
let $eraserButton = $("#eraser-button"); // ластик
let $clearButton = $("#clear-button"); // кнопка очистки
let $navButtons = $(".nav__button"); // массив кнопок
let $content__drowing = $('#content__drowing'); // обертка холста
let $canvas = $('#content__canvas'); // canvas
let $canvasWrapper = $('#canvas__wrapper'); // обертка canvas для мыши
let ctx = $canvas[0].getContext("2d"); // контекст canvas
let eraser = false; // ластик выключен
let lineWeights = document.getElementsByClassName("line-weight_hover__item"); // ширина кистей
let $newMouse = $("#canvas-mouse"); // новый курсор
// !
const xx = require('./index');

// Canvas settings 
// Resizing
canvasResize();
$(window).resize(canvasResize);
// Default settings
defaultSet();
// Canvas writing
$canvas.mousedown(function () {
    if (eraser == true)
        ctx.strokeStyle = "#fff";
    else
        ctx.strokeStyle = "#000";

    $canvas.mousemove(() => writing());
    $canvas.mouseup(() => {
        xx.getImage();
        stopWriting();
    });
    $canvas.mouseleave(() => stopWriting());
});

// * PAINT MENU
// выбрано перо
$penButton.click(() => {
    eraser = false;
    activeButton(0);
});
// выбран ластик
$eraserButton.click(() => {
    eraser = true;
    activeButton(1);
});
// очистка холста
$clearButton.click(() => {
    eraser = false;
    activeButton(0);
    smoothCanvasClean();
});

// * PEN WEIGHT
lineWeights[0].onmousedown = () => {
    ctx.lineWidth = 6;
    cursorResize(ctx.lineWidth);
}
lineWeights[1].onmousedown = () => {
    ctx.lineWidth = 8;
    cursorResize(ctx.lineWidth);
}
lineWeights[2].onmousedown = () => {
    ctx.lineWidth = 10;
    cursorResize(ctx.lineWidth);
}
lineWeights[3].onmousedown = () => {
    ctx.lineWidth = 14;
    cursorResize(ctx.lineWidth);
}

// * MY FUNCTIONS
// исходные настройки canvas
function defaultSet() {
    activeButton(0);
    ctx.lineWidth = 6;
    cursorResize(ctx.lineWidth);
}
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
    $canvas.off("mousemove");
}
// ф-ия изменяет размер canvas при изменении размера окна браузера
function canvasResize() {
    let canvas = document.getElementById('content__canvas');
    canvas.width = $content__drowing.width();
    canvas.height = $content__drowing.height();
}
// ф-ия меняет вид курсора
$canvasWrapper.mousemove((event) => {
    let mouseWidtDiv2 = $newMouse.outerWidth() / 2;
    $newMouse.css('display', 'block');
    $newMouse.css({
        "top": event.clientY - mouseWidtDiv2,
        "left": event.clientX - mouseWidtDiv2
    });
});
// удаление курсора-круга из canvas
$canvasWrapper.mouseleave(() => {
    $newMouse.css('display', 'none');
});
// новый размер курсора
function cursorResize(num) {
    let mouseBorder = parseInt($newMouse.css('border-width'));
    let size = num + mouseBorder;

    $newMouse.css({
        "width": size,
        "height": size
    });
}
// ф-ия устанавливает активную кнопку
function activeButton(num) {
    $navButtons.each(function (index) {
        if (index == num)
            $(this).addClass("active-button");
        else
            $(this).removeClass("active-button");
    });
}
// плавная очистка canvas
function smoothCanvasClean() {
    let $canasVeil = $(".canas-veil"); // пелена для плавной очистки canvas
    let $canasVeilDuration = parseFloat($canasVeil.css("transition-duration")) * 1000;

    $canasVeil.css({
        "visibility": "visible",
        "opacity": 1
    });

    // очистка canvas и скрытие пелены через N мсек, для плавности
    setTimeout(() => {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
        $canasVeil.css({
            "visibility": "hidden",
            "opacity": 0
        });
    }, $canasVeilDuration)
}