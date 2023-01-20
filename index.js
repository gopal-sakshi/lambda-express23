const express = require('express');
const serverless = require('serverless-http');
const port = process.env.PORT || 3000;
const app = express();

/****************************** routes *************************************/
app.get('/', (req, res) => res.send("<h2> use /sayHello </h2>"));
app.get('/sayHello', (req, res) => res.send("Hello"));
/*****************************************************************************/
if (process.env.ENVIRONMENT === 'production') {
    exports.handler = serverless(app);
} else {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
}