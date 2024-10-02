const AWS = require("aws-sdk");
var s3Client = new AWS.S3();

const readable23 = require('stream').Readable;
var stream44 = new readable23();
// var fs = require('fs');
// var filePath = './input23.txt'


const cb23 = (err, data) => {
    if(err) console.log(err);
    else console.log('jing chak, upload successey', data);
};

const handler = async (event) => {
    event['time'] = Date.now();
    stream44.push(JSON.stringify(event));
    stream44.push(null);
    var obj23 = {
        Bucket: 'storing-stuff-from-lambda24-16',
        // Body: fs.createReadStream(filePath),
        Body: stream44,
        Key: (Date.now()).toString(),
        ACL:'public-read'
    };
    var s3_promise = s3Client.upload(obj23,cb23).promise();
    return s3_promise.then((data) => {
        console.log('success22');
        return {
            statusCode: 200,
            body: JSON.stringify('endure Master Wayne'),
        };    
    }).catch(err => {
        console.log('athi pedda phattu ',err);
        return {
            statusCode: 400,
            body: JSON.stringify('enti ee gola'),
        };
    });
};

module.exports.handler = handler;