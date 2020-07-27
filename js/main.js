// ! const class_name = name_list[index]
// ! html, css, bundle.js - minify, css - webkit

// modules 
const imgPreparing = require('./prj-modules/img-preparing');
const tfModelWork = require('./prj-modules/tf-model-work');
// CONST 
const imgSize = 64; // размер canv2
const loadedModel = tfModelWork.tfModelLoad(); // tf Model

function main(canvas) {
    let categories_list;
    let img = imgPreparing.getImage(canvas, imgSize); // prepared img -> [1, 64, 64, 1]
    let maxPredictValue = tfModelWork.tfPredict(loadedModel, img); // predict
    // getting categories_list from JSON -> typeof(categories_list) - array of categories [340]
    let categories_listGetter = new Promise((resolve, reject) => {
        $.getJSON('../model/categories_list.json', function (res) {
            categories_list = res;
            resolve();
        });
    });
    // ! results
    categories_listGetter.then(() => {
        console.log(categories_list);
    });
    maxPredictValue.then((res) => {
        console.log(res);
    })
}

module.exports = {
    "main": main
}