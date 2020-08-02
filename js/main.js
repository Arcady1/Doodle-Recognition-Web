// modules 
const imgPreparing = require('./prj-modules/img-preparing');
const tfModelWork = require('./prj-modules/tf-model-work');
const {
    func
} = require('@tensorflow/tfjs-data');
// CONST 
const imgSize = 64;
const numberOfTopResults = 3;
const loadedModel = tfModelWork.tfModelLoad(); // tf Model
// Vars
let $predictionTextWindow = $("#predict-main-window"); // Predict text 

function main(canvas) {
    let img = imgPreparing.getImage(canvas, imgSize); // Prepared img -> [1, 64, 64, 1]
    let arrayOfPredictions = tfModelWork.tfPredict(loadedModel, img); // Predict
    let categories_listGetter = new Promise((resolve, reject) => { // Getting categories_list from JSON -> typeof(categories_list) - array of categories
        $.getJSON('../model/categories_list.json', function (categories_list) {
            resolve(categories_list);
        });
    });
    Promise.all([arrayOfPredictions, categories_listGetter]).then((val) => {
        let topResults = bestResults(val[0]);
        console.log(val);
        console.log(topResults);
        predictionTextSettings(false, "It looks like ", topResults);
    });
}

function predictionTextSettings(setEllipsis = true, text = '', topResults = null) {
    if (topResults == null) {
        if (setEllipsis) {
            text = '';
            $predictionTextWindow.addClass("main-window_ellipsis");
        } else {
            $predictionTextWindow.removeClass("main-window_ellipsis");
        }
    }

    else {
        $predictionTextWindow.removeClass("main-window_ellipsis");

        for (let i = 1; i < numberOfTopResults + 1; i++) {
            if (i > 1) {
                text += " , ";
            }
            text += topResults[numberOfTopResults - i];
        }
    }

    $predictionTextWindow.html(text);
}
// Function returns top numberOfTopResults predictions; input: array of predictions
function bestResults(predictArr) {
    let resultOfSort = qSort(predictArr);
    resultOfSort.length = numberOfTopResults;

    return resultOfSort;
}

function qSort(arr, left = 0, right = arr.length - 1) {
    let index, len = arr.length;

    if (len > 1) {
        index = partition(arr, left, right);

        if (left < index - 1)
            qSort(arr, left, index - 1);
        if (index < right)
            qSort(arr, index, right);
    }

    function partition(arr, left, right) {
        let middle = Math.floor((right + left) / 2),
            pivot = arr[middle],
            i = left, // Start pointer at the first item in the array
            j = right; // Start pointer at the last item in the array

        while (i <= j) {
            // Move left pointer to the right until the value at the
            // left is greater than the pivot value
            while (arr[i] < pivot)
                i++;
            // Move right pointer to the left until the value at the
            // right is less than the pivot value
            while (arr[j] > pivot)
                j--;
            // If the left pointer is less than or equal to the 
            // right pointer, then swap values
            if (i <= j) {
                [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 destructuring swap
                i++;
                j--;
            }
        }
        return i;
    }

    return arr;
}

module.exports = {
    "main": main,
    "predictionTextSettings": predictionTextSettings
}