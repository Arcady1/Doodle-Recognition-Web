// modules
const tf = require('@tensorflow/tfjs');
const math = require('mathjs');

// Model loading
async function tfModelLoad() {
    const model = await tf.loadLayersModel('../model/mod1/model.json');
    console.log('The Model was loaded!');
    return model;
}
// Predict
function tfPredict(loadedModel, img) {
    let prediction = loadedModel.then((model) => {
        let predictionResults = model.predict(img).arraySync(); // prediction Results
        console.log(predictionResults);
        
        let maxPredictValue = math.max(predictionResults);
        console.log(maxPredictValue);
    });
}

module.exports = {
    "tfModelLoad": tfModelLoad,
    "tfPredict": tfPredict
}