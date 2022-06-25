import AWS from 'aws-sdk';

export const handler = async (event) => {

  console.log(process.env.DYNAMODB_CUSTOMER_TABLE);

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      PK: 'test',
      SK: 'test',
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 201,
  };
};
