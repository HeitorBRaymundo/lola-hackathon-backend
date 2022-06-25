import AWS from 'aws-sdk';

export const handler = async (event) => {
  const { pathParameters } = event;
  const { type } = pathParameters; 

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const searchParams = {
    TableName: process.env.DYNAMODB_QUIZES,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': type
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
