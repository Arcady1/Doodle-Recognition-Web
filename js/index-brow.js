(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// принимаю изображение с canvas
// изменяю размер (64х64) // img = cv2.resize(img, (64, 64, 3))
// делаю черно-белой (https://stackoverflow.com/questions/42099769/opencv-color-bgr2gray-error) //[64, 64, 3] -> [64, 64, 1]
// img = numjs.expand_dims(img, axis = 0) // [64, 64, 1 ] -> [1, 64, 64, 1]
// Create model const model = await tf.loadLayersModel('<path to json file>');
// Predict const prediction = model.predict(img); [1, 340] // flatten
// const index = numpyjs.argmax(prediction)[1]
// conds class_name = name_list[index]
const Base64 = require('js-base64').Base64;

function getImage() {
    let canvas = document.getElementById('content__canvas'); // canvas
    let dData = canvas.toDataURL('image/png'); // получаем base64 формат
    let cData = dData.replace("data:image/png;base64,", " "); // чистый base64
    console.log(Base64.atob(cData));
}

module.exports = {
    "getImage": getImage
}

// ! browserify js/style.js js/index.js -o js/index-brow.js
},{"js-base64":3}],2:[function(require,module,exports){
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
},{"./index":1}],3:[function(require,module,exports){
(function (global){


//
// THIS FILE IS AUTOMATICALLY GENERATED! DO NOT EDIT BY HAND!
//
;(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory()
        : typeof define === 'function' && define.amd
        ? define(factory) : 
        // cf. https://github.com/dankogai/js-base64/issues/119
        (function() {
            // existing version for noConflict()
            const _Base64 = global.Base64;
            const gBase64 = factory();
            gBase64.noConflict = () => {
                global.Base64 = _Base64;
                return gBase64;
            };
            if (global.Meteor) { // Meteor.js
                Base64 = gBase64;
            }
            global.Base64 = gBase64;
        })();
}((typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
        : this
), function() {
    'use strict';

/**
 *  base64.mjs
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 * 
 * @author Dan Kogai (https://github.com/dankogai)
 */      
const version = '3.2.4';
const _b64chars
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const _b64tab = ((bin) => {
    let tab = {}, i = 0;
    for (const c of bin) tab[c] = i++;
    return tab;
})(_b64chars);
const _fromCharCode = String.fromCharCode;
const _mkUriSafe =  (src) => String(src)
      .replace(/[+\/]/g, (m0) => m0 == '+' ? '-' : '_')
      .replace(/=/g, '');
/**
 * converts a Uint8Array to a Base64 string
 * @param {Uint8Array} src
 * @param {Boolean} urisafe URL-and-filename-safe a la RFC4648
 * @returns {String} Base64 string
 */
const fromUint8Array = (src, urisafe) => {
    let b64 = '';
    for (let i = 0, l = src.length; i < l; i += 3) {
        const a0 = src[i], a1 = src[i+1], a2 = src[i+2];
        const ord = a0 << 16 | a1 << 8 | a2;
        b64 +=    _b64chars.charAt( ord >>> 18)
            +     _b64chars.charAt((ord >>> 12) & 63)
            + ( typeof a1 != 'undefined'
                ? _b64chars.charAt((ord >>>  6) & 63) : '=')
            + ( typeof a2 != 'undefined'
                ? _b64chars.charAt( ord         & 63) : '=');
    }
    return urisafe ? _mkUriSafe(b64) : b64;
};
/**
 * 100% compatible with `window.btoa` of web browsers
 * @param {String} src binary string
 * @returns {String} Base64-encoded string
 */
const _btoa = typeof btoa === 'function'
      ? (s) => btoa(s)
      : (s) => {
          if (s.match(/[^\x00-\xFF]/)) throw new RangeError(
              'The string contains invalid characters.'
          );
          return fromUint8Array(
              Uint8Array.from(s,c => c.charCodeAt(0))
          );
      };
/**
 * @deprecated since 3.0.0
 * @param {string} src UTF-8 string
 * @returns {string} UTF-16 string
 */
const utob = (src) => unescape(encodeURIComponent(src));
/**
 * converts a UTF-8-encoded string to a Base64 string
 * @param {String} src the string to convert
 * @param {Boolean} rfc4648 if `true` make the result URL-safe
 * @returns {String} Base64 string
 */
const encode = (src, rfc4648) => {
    const b64 = _btoa(utob(src));
    return rfc4648 ? _mkUriSafe(b64) : b64;
};
/**
 * converts a UTF-8-encoded string to URL-safe Base64 RFC4648
 * @param {String} src the string to convert
 * @returns {String} Base64 string
 */
const encodeURI = (src) => encode(src, true);
/**
 * @deprecated since 3.0.0
 * @param {string} src UTF-16 string
 * @returns {string} UTF-8 string
 */
const btou = (src) => decodeURIComponent(escape(src));
const _cb_decode = (cccc) => {
    let len = cccc.length,
        padlen = len % 4,
        n =   (len > 0 ? _b64tab[cccc.charAt(0)] << 18 : 0)
        | (len > 1 ? _b64tab[cccc.charAt(1)] << 12 : 0)
        | (len > 2 ? _b64tab[cccc.charAt(2)] <<  6 : 0)
        | (len > 3 ? _b64tab[cccc.charAt(3)]       : 0),
        chars = [
            _fromCharCode( n >>> 16),
            _fromCharCode((n >>>  8) & 0xff),
            _fromCharCode( n         & 0xff)
        ];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
};
/**
 * 100% compatible with `window.atob` of web browsers
 * @param {String} src Base64-encoded string
 * @returns {String} binary string
 */
const _atob = typeof atob === 'function'
      ?  (a) => atob(a)
      :  (a) => {
          return String(a)
              .replace(/[^A-Za-z0-9\+\/]/g, '')
              .replace(/\S{1,4}/g, _cb_decode);
      };
const _decode = (a) => btou(_atob(a));
const _fromURI = (a) => {
    return String(a)
        .replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/')
        .replace(/[^A-Za-z0-9\+\/]/g, '');
};
/**
 * converts a Base64 string to a UTF-8 string
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {String} UTF-8 string
 */
const decode = (src) =>  _decode(_fromURI(src));
/**
 * converts a Base64 string to a Uint8Array
 * @param {String} src Base64 string.  Both normal and URL-safe are supported
 * @returns {Uint8Array} UTF-8 string
 */
const toUint8Array = (a) =>  {
    return Uint8Array.from(_atob(_fromURI(a)), c => c.charCodeAt(0));
};
const _noEnum = (v) => {
    return {
        value:v, enumerable:false, writable:true, configurable:true
    };
};
const extendString = function() {
    const _add = (name, body) => Object.defineProperty(
        String.prototype, name, _noEnum(body)
    );
    _add('fromBase64', function() {
        return decode(this);
    });
    _add('toBase64', function(rfc4648) {
        return encode(this, rfc4648);
    });
    _add('toBase64URI', function() {
        return encode(this, true);
    });
    _add('toBase64URL', function() {
        return encode(this, true);
    });
    _add('toUint8Array', function() {
        return toUint8Array(this);
    });
};
const extendUint8Array = function() {
    const _add = (name, body) => Object.defineProperty(
        Uint8Array.prototype, name, _noEnum(body)
    );
    _add('toBase64', function(rfc4648) {
        return fromUint8Array(this, rfc4648);
    });
    _add('toBase64URI', function() {
        return fromUint8Array(this, true);
    });
    _add('toBase64URL', function() {
        return fromUint8Array(this, true);
    });
};
const extendBuiltins = () => {
    extendString();
    extendUint8Array();
}
const gBase64 = {
    VERSION: version,
    atob: _atob,
    btoa: _btoa,
    fromBase64: decode,
    toBase64: encode,
    encode: encode,
    encodeURI: encodeURI,
    encodeURL: encodeURI,
    utob: utob,
    btou: btou,
    decode: decode,
    fromUint8Array: fromUint8Array,
    toUint8Array: toUint8Array,
    extendString: extendString,
    extendUint8Array: extendUint8Array,
    extendBuiltins: extendBuiltins
}

    //
    // export Base64 to the namespace
    //
    gBase64.Base64 = Object.assign({}, gBase64);
    return gBase64;
}));



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2,1]);
