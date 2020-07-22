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