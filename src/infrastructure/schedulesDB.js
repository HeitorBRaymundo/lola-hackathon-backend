import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const getSchedulesFromDB = async (type) => {
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

