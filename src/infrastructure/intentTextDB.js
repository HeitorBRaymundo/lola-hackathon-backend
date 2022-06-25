import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const getTextFromDB = async (key) => {
  const { Items: [ result ]} = await DynamodDB.query({
    TableName: process.env.DYNAMODB_ALEXA_TEXT,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': key
    },
  }).promise();

  return result.text;
};

