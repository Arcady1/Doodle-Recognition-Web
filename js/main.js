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
    let maxPredictValue = tfModelWork.tfPredict(loadedModel, img); // predict
    let categories_listGetter = new Promise((resolve, reject) => { // getting categories_list from JSON -> typeof(categories_list) - array of categories [340]
        $.getJSON('../model/categories_list.json', function (categories_list) {
            resolve(categories_list);
        });
    });
    Promise.all([maxPredictValue, categories_listGetter]).then((val) => {
        // ! console.log(val[0].maxValIndex);
        console.log('It is ' + val[1][val[0].maxValIndex]);
    });
    // ! results
    // categories_listGetter.then(() => {
    //     console.log(categories_list);
    // });
    // maxPredictValue.then((res) => {
    //     console.log(res);
    // });
}

function predictCategoryName(maxValInd, indexOfCategoryName) {
    return indexOfCategoryName[maxValInd];
}

module.exports = {
    "main": main
}