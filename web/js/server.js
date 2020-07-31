const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {
    response.sendFile("/home/arkady/Документы/GitHub_Repository/Doodle-Recognition-Web/web/index.html");
});

const listener = app.listen(8080, () => {
    console.log("Your app is listening on port " + listener.address().port);
    console.log('Server started: http://localhost:' + 8080 + '/');
});