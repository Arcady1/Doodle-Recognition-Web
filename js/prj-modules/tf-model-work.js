// modules
const tf = require('@tensorflow/tfjs');

// Model loading; function returns Promise
async function tfModelLoad() {
    const model = await tf.loadLayersModel('../../model/converted_mobilenetv2/content/weights_js/model.json');
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
    let currentMaxVal = 0;
    let currentmaxValIndex = 0;

    for (let i = 0; i < predictionResults.length; i++) {
        if (predictionResults[i] > currentMaxVal) {
            currentMaxVal = predictionResults[i];
            currentmaxValIndex = i;
            maxPredictionResults.maxVal = currentMaxVal;
            maxPredictionResults.maxValIndex = currentmaxValIndex;
        }
    }
    return maxPredictionResults;
}

module.exports = {
    "tfModelLoad": tfModelLoad,
    "tfPredict": tfPredict
}