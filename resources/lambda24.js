import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from 'stream';
var stream44 = new Readable();
import * as fs from 'fs';
var filePath = './input23.txt';

export const handler = async (event) => {
    event['time'] = Date.now();
    stream44.push(JSON.stringify(event));
    stream44.push(null);
    var s3Thingy = new S3Client();

    const response22 = await new Promise((resolve, reject) => {
        var obj23 = {
            Bucket: 'storing-stuff-from-lambda24-16',
            // Body: stream44,
            Body: fs.createReadStream(filePath),
            Key: (Date.now()).toString(),
            ACL:'public-read'
        };
        s3Thingy.send(new PutObjectCommand(obj23), (err) => {
            if (err) reject('false phattu');
            resolve('cinema hittu');
        });
    });
    return {
        statusCode: 200,
        body: response22
    };
};