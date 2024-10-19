`Architecture`
Lambda<ingestion> ----> Kinesis -----> Lambda<processing>
- The front Lambda == make sure that the 
    data that is going into Kinesis is validated, 
    formatted correctly 
    partition key is set appropriately.

`Example`
- avoid two people buyinig the last of a specific item because of race conditions
-  so we decided to use Kinesis. 
- We created one shard per product and 
    on our ingestion Lambda the partition key was the product key. 
    We also set the batch size at 1. 
- We needed to avoid two people buying the last of the same product 
- so we cared about per product race conditions which is why we set our <partition key around product ID>
- Now if we had a product with stock of 1 and two people clicked "Add to basket" at the same time
- Both requests went into the <ingestion Lambda>, but because they were the same product they both went into the same shard 
- but since its a queue, one of the two will always be 2nd in line. 
- Because of the batch size of 1
    Kinesis only pushed 1 of the 2 to the <processing lambda> first. 
    This lambda marked this [last_item] as "In Checkout" (unavailable to others). 
    The 2nd is passed to the processing lambda which can now tell that stock left is 0 
    and can send an error to the application instead of trying to allocate the same item.

<!--------------------------------------------------------------------------->

batch_size = 5
- lambda will never be called with more than 5 records
- so, upload to S3 from lambda will also contain only 5 (or) 4 records
    ie lambda will not wait until 5 objets showup in datastream

lambda may spinup additional containers 
to handle large volumes of events from your kinesis stream

Lambdas hooked to a Kinesis Datastream <do not scale up> with traffic. 
Each shard can have no more than one lambda instance (OR)
each Lambda invocation only holds records from one shard

<!--------------------------------------------------------------------------->