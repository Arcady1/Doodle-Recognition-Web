const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
// Port
app.set('port', PORT);
// static files (CSS)
app.use(express.static(__dirname));
// Index.html page
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});