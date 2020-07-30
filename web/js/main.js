// ! html, css, bundle.js - minify, css - webkit

// modules 
const imgPreparing = require('./prj-modules/img-preparing');
const tfModelWork = require('./prj-modules/tf-model-work');
// CONST 
const imgSize = 64;
const loadedModel = tfModelWork.tfModelLoad(); // tf Model

function main(canvas) {
    let img = imgPreparing.getImage(canvas, imgSize); // Prepared img -> [1, 64, 64, 1]
    let maxPredictValue = tfModelWork.tfPredict(loadedModel, img); // Predict
    let categories_listGetter = new Promise((resolve, reject) => { // Getting categories_list from JSON -> typeof(categories_list) - array of categories
        $.getJSON('../../model/categories_list.json', function (categories_list) {
            resolve(categories_list);
        });
    });
    Promise.all([maxPredictValue, categories_listGetter]).then((val) => {
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

module.exports = {
    "main": main
}