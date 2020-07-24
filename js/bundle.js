(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// изменяю размер (64х64) // img = cv2.resize(img, (64, 64, 3))
// делаю черно-белой (https://stackoverflow.com/questions/42099769/opencv-color-bgr2gray-error) //[64, 64, 3] -> [64, 64, 1]
// img = numjs.expand_dims(img, axis = 0) // [64, 64, 1 ] -> [1, 64, 64, 1]
// Create model const model = await tf.loadLayersModel('<path to json file>');
// Predict const prediction = model.predict(img); [1, 340] // flatten
// const index = numpyjs.argmax(prediction)[1]
// conds class_name = name_list[index]

let canv2 = document.getElementById('canv2'); // canvas-resizer (64x64)
let ctx2 = canv2.getContext('2d');
let imgSize = 64; // размер canv2
// ф-ия для получения изображения с canvas
function getImage(canvas) {
    let img2Data;

    ctx2.drawImage(canvas, 0, 0, imgSize, imgSize); // рисует изображение с canvas в canv2
    img2Data = ctx2.getImageData(0, 0, imgSize, imgSize); // массив чисел 0 - 255 - изображение canv2
    console.log(img2Data);
    // let imgBase64 = canv2.toDataURL().replace("data:image/png;base64,", ""); // base64 формат картинки canv2
    // console.log(imgBase64);
    check(img2Data);
}
// очистка canv2
function cleanCanv2 () {
    ctx2.clearRect(0, 0, imgSize, imgSize);
}

function check(array) {
    for (let i = 0; i < array.data.length; i++) {
        if ((array.data[i] < 255) && (array.data[i] != 0)) {
            array.data[i] = 255;
        }
    }
}
// ! второй способ: сделать resize изображение с помощью модуля
// вставить

module.exports = {
    "getImage": getImage,
    "cleanCanv2": cleanCanv2
}
},{}],2:[function(require,module,exports){
let $penButton = $("#pen-button"); // ручка
let $eraserButton = $("#eraser-button"); // ластик
let $clearButton = $("#clear-button"); // кнопка очистки
let $navButtons = $(".nav__button"); // массив кнопок
let $content__drowing = $('#content__drowing'); // обертка холста
let $canvas = $('#content__canvas'); // canvas
let canvas = document.getElementById('content__canvas'); // canvas
let $canvasWrapper = $('#canvas__wrapper'); // обертка canvas для мыши
let ctx = $canvas[0].getContext("2d"); // контекст canvas
let eraser = false; // ластик выключен
let lineWeights = document.getElementsByClassName("line-weight_hover__item"); // ширина кистей
let $newMouse = $("#canvas-mouse"); // новый курсор

const mod = require('./modules'); // модуль для npm пакетов

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
    $canvas.mouseup(() => stopWriting());
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
    mod.getImage(canvas);
    ctx.beginPath();
    $canvas.off("mousemove");
}
// ф-ия изменяет размер canvas при изменении размера окна браузера
function canvasResize() {
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

    mod.cleanCanv2();

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
},{"./modules":1}]},{},[2,1]);
