import AWS from 'aws-sdk';

export const handler = async (event) => {
  const { pathParameters } = event;
  const { userId } = pathParameters; 

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const searchParams = {
    TableName: process.env.DYNAMODB_REMINDERS,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': userId
    },
  };

  const { Items: result } = await dynamoDb.query(searchParams).promise();
 
  return {
    statusCode: 201,
    body: JSON.stringify({
      result,
    }),
  };
};
