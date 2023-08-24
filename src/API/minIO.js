var Express = require("express");
var Multer = require("multer");
var Minio = require("minio");
var BodyParser = require("body-parser");
var app = Express();

var minioClient = new Minio.Client({
    endPoint: '10.8.0.31',
    port: 9000,
    useSSL: false,
    accessKey: 'WzM0t4CtfRYLW6x6',
    secretKey: 'RUSePhuOg9QIVicMxrn0zpzBRHST7xF2'
});

app.post("/upload", Multer({ storage: Multer.memoryStorage() }).single("file"), function (request, response) {
    minioClient.putObject("datafoundation-dev", "gujjus/"+request.file.originalname, request.file.buffer, function (error, etag) {
        if (error) {
            return console.log(error);
        }
        response.send(request.file);
    });
});

app.post("/uploadfile", Multer({ dest: "./uploads/" }).single("file"), function (request, response) {
    minioClient.fPutObject("datafoundation-dev", "gujjus/" + request.file.originalname, request.file.path, { "Content-Type": "application/octet-stream" }, function (error, etag) {
        if (error) {
            return console.log(error);
        }
        response.send(request.file);
    });
});

app.get("/download", function (request, response) {
    minioClient.getObject("datafoundation-dev", request.query.filename, function (error, stream) {
        if (error) {
            return response.status(500).send(error);
        }
        stream.pipe(response);
    });
});

minioClient.bucketExists("datafoundation-dev", function (error) {
    if (error) {
        return console.log(error);
    }
    var server = app.listen(3001, function () {
        console.log("Listening on port %s...", server.address().port);
    });
});
