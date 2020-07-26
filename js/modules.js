// conds class_name = name_list[index]

// modules 
const tf = require('@tensorflow/tfjs');
const math = require('mathjs');
// vars
let canv2 = document.getElementById('canv2'); // canvas-resizer (64x64)
let ctx2 = canv2.getContext('2d');
let imgSize = 64; // размер canv2
let loadedModel = tfModelLoad(); // tf Model
// ф-ия для получения изображения с canvas
function getImage(canvas) {
    // Preparing image
    let img2Data;
    ctx2.drawImage(canvas, 0, 0, imgSize, imgSize); // рисует изображение с canvas в canv2
    img2Data = ctx2.getImageData(0, 0, imgSize, imgSize); // массив чисел 0 - 255 - изображение canv2
    img2Data = img2Data.data; // оставляем в img2Data просто массив чисел 
    img2Data = rgbaOnlyAImg(img2Data); // массив размером 16.384, т.к. каждый пиксель в rgba формате => на один пиксель - 4 элемента => 64*64*4 = 16.384
    img2Data = bwImgColor(img2Data); // img2Data - массив из 64*64 = 4096 элементов (черно-белая картинка)
    img2Data = math.reshape(img2Data, [imgSize, imgSize, 1]); // reshape img2Data -> [64, 64, 1]
    // TF work
    let img = tf.expandDims(img2Data, 0); // -> [1, 64, 64, 1]
    tfPredict(img);
}
// Model loading
async function tfModelLoad() {
    const model = await tf.loadLayersModel('../model/mod1/model.json');
    console.log('The Model was loaded!');
    return model;
}
// Predict
function tfPredict(img) {
    let prediction = loadedModel.then((model) => {
        let predictionResults = model.predict(img).arraySync(); // prediction Results
        console.log(predictionResults);
        let maxPredictValue = math.max(predictionResults);
        console.log(maxPredictValue);
    });
}
// additional functions
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