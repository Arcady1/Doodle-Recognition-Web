// ! const class_name = name_list[index]
// ! html, css, bundle.js - minify, css - webkit

// modules 
const imgPreparing = require('./prj-modules/img-preparing');
const tfModelWork = require('./prj-modules/tf-model-work');
// CONST 
const imgSize = 64; // размер canv2
const loadedModel = tfModelWork.tfModelLoad(); // tf Model

function main(canvas) {
    let img = imgPreparing.getImage(canvas, imgSize); // prepared img -> [1, 64, 64, 1]
    tfModelWork.tfPredict(loadedModel, img);
}

module.exports = {
    "main": main
}