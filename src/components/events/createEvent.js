import AWS from 'aws-sdk';
import * as uuid from 'uuid';

export const createEvent = async ({
  type,
  name,
}) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_SCHEDULES,
    Item: {
      PK: uuid.v4(),
      type,
      name,
      status: 'scheduled'
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 201,
  };
};

export const handler = async (event) => {
  const { body } = event;
  const { type, name } = JSON.parse(body); 

  await createEvent({
    type,
    name,
  });
 
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Evento criado',
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers" : "*",
    },
  };
};


