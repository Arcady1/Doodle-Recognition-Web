// Modules
const mod = require('./main'); // модуль для npm пакетов
const imgPreparing = require('./prj-modules/img-preparing');
// Vars
let $penButton = $("#pen-button"); // pen
let $eraserButton = $("#eraser-button"); // Eraser
let $clearButton = $("#clear-button"); // Clean
let $navButtons = $(".nav__button"); // Array of button (pen, eraser, clean)
let $contentDrowing = $('#content__drowing');
let $canvastWrapper = $("#canvas__wrapper");
let $canvas = $('#content__canvas'); // Canvas jQuery
let canvas = document.getElementById('content__canvas'); // Canvas JS 
let ctx = $canvas[0].getContext("2d");
let lineWeights = document.getElementsByClassName("line-weight_hover__item"); // Array of line Weights
// let $newMouse = $("#canvas-mouse"); // Curcle cursor

// Eraser set
let eraser = false;
// Weight of pen / eraser line 
let lineWeightFirst = 25;
let lineWeightSecond = 45;

// Resizing
canvasResize();
$(window).resize(canvasResize);
// Default settings 
buttonIsChacnged(false, 0, lineWeightFirst);

// Canvas writing
$canvas.mousedown(() => {
    if (eraser == true)
        ctx.strokeStyle = "#fff";
    else
        ctx.strokeStyle = "#000";

    $canvas.mousemove(() => writing());
    $canvas.mouseup(() => {
        stopWriting();
        mod.main(canvas);
    });
    $canvas.mouseleave(() => stopWriting());
});

// * PAINT MENU
// Pen
$penButton.click(() => buttonIsChacnged(false, 0, lineWeightFirst));
// Eraser
$eraserButton.click(() => buttonIsChacnged(true, 1, lineWeightSecond));
// Clean
$clearButton.click(() => {
    buttonIsChacnged(false, 0, lineWeightFirst);
    smoothCanvasClean();
});

// * PEN WEIGHT
lineWeights[0].onmousedown = () => {
    ctx.lineWidth = lineWeightFirst;
    cursorResize(ctx.lineWidth);
}
lineWeights[1].onmousedown = () => {
    ctx.lineWidth = lineWeightSecond;
    cursorResize(ctx.lineWidth);
}

// * MY FUNCTIONS
// Cursor and LineWeight settings
function buttonIsChacnged(isEraser = false, activeButtonNumberInMenu, newLineWeight) {
    eraser = isEraser;
    activeButton(activeButtonNumberInMenu);
    ctx.lineWidth = newLineWeight;
    cursorResize(newLineWeight);
}
// Line writing
function writing() {
    let lineWeight2 = ctx.lineWidth / 2;

    ctx.lineCap = "round";
    ctx.lineTo(event.offsetX + lineWeight2, event.offsetY + lineWeight2);
    ctx.stroke();
    ctx.moveTo(event.offsetX + lineWeight2, event.offsetY + lineWeight2);
}
// Stop writing
function stopWriting() {
    ctx.beginPath();
    $canvas.off("mousemove");
}

function canvasResize() {
    canvas.width = $contentDrowing.width();
    canvas.height = $contentDrowing.height();
}
// New cursor size
function cursorResize(weightOfLine) {
    if (weightOfLine == lineWeightFirst) {
        $canvastWrapper.removeClass("wrapper__pointer45");
        $canvastWrapper.addClass("wrapper__pointer25");
    }
    else if (weightOfLine == lineWeightSecond) {
        $canvastWrapper.removeClass("wrapper__pointer25");
        $canvastWrapper.addClass("wrapper__pointer45");
    }
}
// Set the active button
function activeButton(activeButtonMenuNum) {
    $navButtons.each(function (index) {
        if (index == activeButtonMenuNum)
            $(this).addClass("active-button");
        else
            $(this).removeClass("active-button");
    });
}

function smoothCanvasClean() {
    let $canasVeil = $(".canas-veil"); // пелена для плавной очистки canvas
    let $canasVeilDuration = parseFloat($canasVeil.css("transition-duration")) * 1000;

    imgPreparing.cleanCanv2();
    $canasVeil.css({
        "visibility": "visible",
        "opacity": 1
    });
    // Tiding the veil
    setTimeout(() => {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
        $canasVeil.css({
            "visibility": "hidden",
            "opacity": 0
        });
    }, $canasVeilDuration)
}