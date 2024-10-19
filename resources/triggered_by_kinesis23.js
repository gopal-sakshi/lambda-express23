/*
    triggered_by_kinesis23       processKinesis23
    01a) cd resources 
    01b) zip processKinesis23.zip triggered_by_kinesis23.js
    02a) add a new policy AWSLambdaKinesisExecutionRole to the below role from IAM
            triggered_by_sqs23-role-o7rmn4p9

    02b) aws lambda create-function --function-name processKinesis23 \
            --zip-file fileb://processKinesis23.zip \
            --handler triggered_by_kinesis23.handler \
            --role arn:aws:iam::713195410081:role/service-role/triggered_by_sqs23-role-o7rmn4p9 \
            --profile ped_aws --region ap-south-1 \
            --runtime nodejs18.x
        
        make runtime as the last flag... nodejs16.x === some problem

    03) 
    
        aws lambda invoke --function-name processKinesis23 \
            --cli-binary-format raw-in-base64-out \
            --profile ped_aws --region ap-south-1 \
            --payload file://resources/triggered_by_kinesis23_input.json outputfile.txt

        
*/

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.handler = async (event, context) => {
    var s3Thingy = new S3Client({ region: 'us-east-2' }); let eventIds = []; let recordDatas = [];
    var response22 = { };
    for (const record of event.Records) {
        try {
            let evendId = `${record.eventID}`;            
            const recordData = await getRecordDataAsync(record.kinesis);
            eventIds.push(evendId); recordDatas.push(recordData)
        } catch (err) {
            console.error(`An error occurred ${err}`);
            throw err;
        }
    }
    try {
        response22 = await new Promise((resolve, reject) => {
            var obj23 = {
                Bucket: 'storing-stuff-from-lambda24-16',            
                Body: JSON.stringify({...eventIds, ...recordDatas}),
                Key: `kinesis23_${Date.now()}`,
                ACL:'public-read'
            };
            s3Thingy.send(new PutObjectCommand(obj23), (err) => {
                if (err) { console.log("ERROR ===> ", err, err.stack); reject('false phattu') }
                else { resolve('cinema hittu') };
            });
        });
    } catch(err) {
        console.log("err in catch block ===> ", err);
    } finally {
        // save last read sequence number in dynamoDb
        return {
            statusCode: 200,
            body: response22,
            info23: `Successfully processed ${event.Records.length} records @ ${new Date().toISOString()}`
        };    
    }
};

async function getRecordDataAsync(payload) {
    var data = Buffer.from(payload.data, "base64").toString("utf-8");
    await Promise.resolve(1); //Placeholder for actual async work
    return data;
}