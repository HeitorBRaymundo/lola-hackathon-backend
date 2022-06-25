import AWS from 'aws-sdk';

export const handler = async (event) => {
  const { body, pathParameters } = event;
  const { userId } = pathParameters; 

  const { contact, contactName } = JSON.parse(body);

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_EMERGENCY_CONTACT,
    Item: {
      PK: userId,
      SK: new Date().toISOString(),
      contact,
      contactName,
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 200,
  };
};
