// Modules
const main = require('./main');
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
let body = document.getElementById("body");
let ISTOUCHSCREEN = false;
// Eraser set
let eraser = false;
// Weight of pen / eraser line 
let lineWeightFirst = 25;
let lineWeightSecond = 45;

// * Is Touchscreen?
body.addEventListener("touchstart", () => {
    ISTOUCHSCREEN = true;
});
// Resizing
canvasResize();
$(window).resize(canvasResize);
// Default settings 
buttonIsChacnged(false, 0, lineWeightFirst);

// * CANVAS WRITING TOUCHSCREEN
canvas.addEventListener("touchstart", () => eraserAndStrokeStyleSet());
canvas.addEventListener("touchmove", () => writing());
// Stop scrolling while "touchmove"
canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
}, false);
// Processing the canvas image after "touchend"
canvas.addEventListener("touchend", () => stopWriting());

// * CANVAS WRITING MOUSE
$canvas.mousedown(() => {
    eraserAndStrokeStyleSet();
    $canvas.mousemove(() => writing());
});
$canvas.mouseup(() => stopWriting());
$canvas.mouseleave(() => stopWriting());

// * PAINT MENU
// Pen
$penButton.click(() => buttonIsChacnged(false, 0, lineWeightFirst));
// Eraser
$eraserButton.click(() => buttonIsChacnged(true, 1, lineWeightSecond));
// Clean
$clearButton.click(() => {
    if (ISTOUCHSCREEN) {
        let timeout = parseFloat($navButtons.css("transition-duration")) * 1000;

        $clearButton.css("background-color", "orange");
        console.log(timeout);
        setTimeout(() => {
            $clearButton.css("background-color", "#fff");
        }, timeout);
    }
    main.predictionTextSettings();
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
// Eraser and StrokeStyle settings
function eraserAndStrokeStyleSet() {
    eraser ? (ctx.strokeStyle = "#fff") : (ctx.strokeStyle = "#000");
}
// Cursor and LineWeight settings; activeButtonNumberInMenu: 0 - pen; 1 - eraser; 2 - clear
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

    if (ISTOUCHSCREEN) {
        let canasOffsetY = canvas.getBoundingClientRect().y;
        let canasOffsetX = canvas.getBoundingClientRect().x;
        let k = 1; // Inaccuracy
        ctx.lineTo(event.targetTouches[0].clientX - lineWeight2 - canasOffsetX + k * 3, event.targetTouches[0].pageY - canasOffsetY + k);
        ctx.stroke();
        ctx.moveTo(event.targetTouches[0].clientX - lineWeight2 - canasOffsetX + k * 3, event.targetTouches[0].pageY - canasOffsetY + k);
    } else {
        ctx.lineTo(event.offsetX + lineWeight2, event.offsetY + lineWeight2);
        ctx.stroke();
        ctx.moveTo(event.offsetX + lineWeight2, event.offsetY + lineWeight2);
    }
}
// Stop writing
function stopWriting() {
    ctx.beginPath();
    $canvas.off("mousemove");
    main.main(canvas);
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
    } else if (weightOfLine == lineWeightSecond) {
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
    // Hiding the veil
    setTimeout(() => {
        ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
        $canasVeil.css({
            "visibility": "hidden",
            "opacity": 0
        });
    }, $canasVeilDuration)
}