import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const getAnswerFromDB = async ({
  type,
  userId
}) => {
  const { Items: result } = await DynamodDB.query({
    TableName: process.env.DYNAMODB_QUIZES_ANSWER,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': `${userId}#${type}`,
    },
  }).promise();

  return result;
};

export const insertAnswerToDB = async ({
  userId,
  type,
  question,
  answer,
}) => {
  const createdAt = new Date().toISOString();

  const { Items: result } = await DynamodDB.put({
    TableName: process.env.DYNAMODB_QUIZES_ANSWER,
    Item: {
      PK: `${userId}#${type}`,
      SK: createdAt,
      question,
      createdAt,
      type,
      answer,
    },
  }).promise();

  return result;
};

