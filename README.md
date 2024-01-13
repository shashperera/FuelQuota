# FuelQuota
## Cloud Computing
<p>FuelQuota is a scalable QR solution to track fuel quotas and designed with 3 APIS following  
microservices architecture. Vehicle API will generate  a QR code with vehicle number and GUID 
generated for the vehicle. Then Register vehicle details and update the Quota. Also there is a 
third-party API to get the registration information. Quota API can update quotas, reduce the 
quota, and add initial quota.  Finally Authentication API to authenticate users. </p>
<p>A mocked Serverless Third Party API on AWS Lambda is used with the CSV file loaded onto 
DynamoDB.  AWS Fargate is used to configure the services and Cloudformation stack can 
deploy the entire infrastructure on the cloud. JMeter load test can take multiple GET endpoints 
and test the load. </p> </br>

## Demo
https://www.youtube.com/watch?v=2JcwEderoMo

### Ref
- https://www.bacancytechnology.com/blog/how-to-build-microservices-with-node-js 
- https://www.youtube.com/watch?v=iJ3cM2BdPl8
