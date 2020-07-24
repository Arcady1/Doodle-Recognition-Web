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
    img2Data = img2Data.data; // оставляем в img2Data просто массив чисел 
    // ! массив размером 16.384, т.к. каждый пиксель в rgba формате => на один пиксель - 4 элемента => 64*64*4 = 16.384
    img2Data = rgbaOnlyAImg(img2Data);
    img2Data = bwImgColor(img2Data); // img2Data - массив из 64*64 = 4096 элементов (черно-белая картинка)
    console.log(img2Data);
}
// очистка canv2
function cleanCanv2() {
    ctx2.clearRect(0, 0, imgSize, imgSize);
}
// ф-ия чистит массив RGBA, оставляя только A
function rgbaOnlyAImg(origArray) {
    let resArray = [];
    for (let i = 3; i < origArray.length; i += 4)
        resArray.push(origArray[i]);

    return resArray;
}
// ф-ия делает изображение черно-белым
function bwImgColor(imgData) {
    for (let i = 0; i < imgData.length; i++)
        if ((imgData[i] < 255) && (imgData[i] != 0))
            imgData[i] = 255;
    return imgData;
}

module.exports = {
    "getImage": getImage,
    "cleanCanv2": cleanCanv2
}