import AWS from 'aws-sdk';

export const handler = async (event) => {
  const { pathParameters } = event;
  const { userId } = pathParameters; 

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const searchParams = {
    TableName: process.env.DYNAMODB_EMERGENCY_CONTACT,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': userId
    },
  };

  console.log(searchParams);
  const { Items: result } = await dynamoDb.query(searchParams).promise();
  console.log(result);
 
  return {
    statusCode: 201,
    body: JSON.stringify({
      result,
    }),
  };
};
