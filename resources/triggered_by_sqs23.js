import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
var s3Thingy = new S3Client({ region: 'us-east-2' });

export const handler = async (event, context) => {
    let respArray = [];
    for (const message of event.Records) {
        respArray.push(await processMessageAsync(message));
    }
    let key23 = event.Records[0].body.slice(0,15);
    await new Promise((resolve, reject) => {
        var obj23 = {
            Bucket: 'storing-stuff-from-lambda24-16',
            Body: JSON.stringify(respArray),
            Key: `SQS_trigger23_${key23}`,
            ACL: 'public-read'
        };
        s3Thingy.send(new PutObjectCommand(obj23), (err) => {
            if (err) console.log("ERR23 ===> ", err); reject('false phattu');
            resolve('cinema hittu');
        });

    });

    console.info("processing done23 ===>  ", new Date().toISOString());
};

async function processMessageAsync(message) {
    try {
        console.log(`Processed message23 ===> ${message.body}`);
        return await Promise.resolve(message.body); //Placeholder for actual async work
    } catch (err) {
        console.error("An error occurred");
        throw err;
    }
}


/*
    this lambda function will be triggered by SQS msg event

    aws lambda invoke --function-name triggered_by_sqs23 \
    --payload file://resources/triggered_by_sqs23.json \
    out \
    --profile ped_aws --region ap-south-1 \
    --log-type Tail \
    --query 'LogResult' \
    --output text \
    --cli-binary-format raw-in-base64-out | base64 --decode


    aws lambda invoke --function-name triggered_by_sqs23 --payload file://resources/triggered_by_sqs23.json out --profile ped_aws --region ap-south-1 --log-type Tail --query 'LogResult' --output text --cli-binary-format raw-in-base64-out | base64 --decode


    EVENT SOURCE MAPPING
    aws lambda create-event-source-mapping --function-name triggered_by_sqs23  \
    --batch-size 10 \
    --event-source-arn arn:aws:sqs:ap-south-1:713195410081:prod_queue_44 \
    --profile ped_aws --region ap-south-1

    add this policy ====> 
    - AWSLambdaSQSQueueExecutionRole (to read stuff from SQS)
    - AmazonS3FullAccess (to put objects in S3 bucket)
    
*/