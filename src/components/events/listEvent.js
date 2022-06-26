import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const getEventsFromDB = async (type) => {
  const { Items: result } = await DynamodDB.scan({
    TableName: process.env.DYNAMODB_SCHEDULES,
    FilterExpression: '#type = :type AND #status = :status',
    ExpressionAttributeValues: {
      ':type': type,
      ':status': 'scheduled'
    },
    ExpressionAttributeNames: {
      '#type': 'type',
      '#status': 'status',
    }
  }).promise();

  return result;
};

export const handler = async (event) => {
  const { pathParameters } = event;
  const { type } = pathParameters; 

  const result = await getEventsFromDB(type);
 
  return {
    statusCode: 201,
    body: JSON.stringify({
      result,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers" : "*",
    },
  };
};


