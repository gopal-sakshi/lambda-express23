const express = require('express');
const serverless = require('serverless-http');
const port = process.env.PORT || 3000;
const app = express();

/** these 3 use layers in AWS lambda */
const clubFromLayers = require('/opt/nodejs/realMadrid23.json');
const fibo = require('/opt/nodejs/ganitham11');
const g612_mod_lib = require('gopal612-module-lib');
/** these 3 use layers in AWS lambda */

/****************************** routes *************************************/
app.get('/', (req, res) => res.send("<h2> use /sayHello </h2>"));
app.get('/sayHello2323', (req, res) => res.send("RM vs Bar matches are called El Clasico"));
app.get('/getManager', (req, res) => { res.send(JSON.stringify(clubFromLayers.manager)); });
app.get('/getFibonacci', (req, res) => { res.send(fibo(5)); });
app.get('/add22', (req, res) => {
    var result23 = g612_mod_lib.add(33,42);
    console.log('result23 yokka result entha ante ===> ', result23);
    res.send(result23.toString());
});
/*****************************************************************************/
if (process.env.ENVIRONMENT === 'production') {
    exports.handler = serverless(app);    
} else {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}.`);
    });
}