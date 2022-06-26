import AWS from 'aws-sdk';
import * as uuid from 'uuid';

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

export const insertScheduleToDB = async ({
  specialist,
  data,
  dia,
  horario
}) => {
  const createdAt = new Date().toISOString();

  const content = data 
    ? `Agendado ${specialist.value} para o dia ${data.value} às ${horario.value}`
    : `Agendado ${specialist.value} para a próxima ${dia.value} às ${horario.value}` 

  const { Items: result } = await DynamodDB.put({
    TableName: process.env.DYNAMODB_SCHEDULES,
    Item: {
      PK: uuid.v4(),
      SK: createdAt,
      createdAt,
      type: 'appointments',
      status: 'scheduled',
      content: content,
    },
  }).promise();

  return result;
};

