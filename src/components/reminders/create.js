import AWS from 'aws-sdk';

import { REMINDER_STATUS_ENUM } from './constants.js';

export const handler = async (event) => {
  const { body, pathParameters } = event;
  const { userId } = pathParameters; 

  const { reminderOn, content, frequency } = JSON.parse(body);

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_REMINDERS,
    Item: {
      PK: userId,
      SK: new Date().toISOString(),
      reminderOn, 
      content, 
      frequency,
      status: REMINDER_STATUS_ENUM.active
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 200,
  };
};
