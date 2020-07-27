// modules
const tf = require('@tensorflow/tfjs');
const math = require('mathjs');

// Model loading; function returns Promise
async function tfModelLoad() {
    const model = await tf.loadLayersModel('../model/mod1/model.json');
    console.log('The Model was loaded!');
    return model;
}
// Predict; function returns Promise
async function tfPredict(loadedModel, img) {
    let maxPredictValue = await loadedModel.then((model) => {
        let predictionResults = model.predict(img).arraySync()[0]; // prediction Results -> array
        return maxPredict(predictionResults); // prediction maxValue and maxIndex
    });

    return maxPredictValue;
}
// maxValue in predictionResultsArray and maxIndex; returns maxPredictionResults - object
function maxPredict(predictionResults) {
    let maxPredictionResults = {
        "maxVal": 0,
        "maxValIndex": 0
    };

    for (let i = 0; i < predictionResults.length - 1; i++) {
        if (predictionResults[i] > predictionResults[i + 1]) {
            maxPredictionResults.maxVal = predictionResults[i];
            maxPredictionResults.maxValIndex = i;
        } else {
            maxPredictionResults.maxVal = predictionResults[i + 1];
            maxPredictionResults.maxValIndex = i + 1;
        }
    }

    return maxPredictionResults;
}

module.exports = {
    "tfModelLoad": tfModelLoad,
    "tfPredict": tfPredict
}