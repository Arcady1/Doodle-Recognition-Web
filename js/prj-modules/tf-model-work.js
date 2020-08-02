// modules
const tf = require('@tensorflow/tfjs');

// Model loading; function returns Promise
async function tfModelLoad() {
    const model = await tf.loadLayersModel('../../model/v3-31.07/converted_weights/content/weights_js/model.json');
    console.log('The Model was loaded!');
    return model;
}
// Predict; function returns Promise
async function tfPredict(loadedModel, img) {
    return await loadedModel.then((model) => {
        let predictionResults = model.predict(img).arraySync()[0]; // prediction Results -> array
        return predictionResults;
    });
}

module.exports = {
    "tfModelLoad": tfModelLoad,
    "tfPredict": tfPredict
}