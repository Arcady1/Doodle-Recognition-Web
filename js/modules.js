// изменяю размер (64х64) // img = cv2.resize(img, (64, 64, 3))
// делаю черно-белой (https://stackoverflow.com/questions/42099769/opencv-color-bgr2gray-error) //[64, 64, 3] -> [64, 64, 1]
// img = numjs.expand_dims(img, axis = 0) // [64, 64, 1 ] -> [1, 64, 64, 1]
// Create model const model = await tf.loadLayersModel('<path to json file>');
// Predict const prediction = model.predict(img); [1, 340] // flatten
// const index = numpyjs.argmax(prediction)[1]
// conds class_name = name_list[index]

// ф-ия для получения изображения с canvas
function getImage(ctx, w, h) {
    let imgData = ctx.getImageData(0, 0, w, h);
    // console.log(imgData);
    // ctx.putImageData(imgData, 10, 10); // для проверки. Можно вывести на canvas нарисованное изображение (10, 10 - смещение по x и y)
}

module.exports = {
    "getImage": getImage
}