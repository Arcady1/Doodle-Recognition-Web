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