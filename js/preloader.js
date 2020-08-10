let preloader = $("#preloader");

function preloaderClose() {
    let timeout = parseFloat(preloader.css("transition-duration")) * 1000;
    preloader.css("opacity", 0);

    setTimeout(() => {
        preloader.css("display", "none");
    }, timeout);
}

module.exports = {
    "preloaderClose": preloaderClose
}