import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const putRegister = async ({
  id,
  type
}) => {

  const createdAt = new Date().toISOString();

  const { Items: result } = await DynamodDB.put({
    TableName: process.env.DYNAMODB_REGISTERS,
    Item: {
      PK: id,
      SK: `${type}-${createdAt}`,
      createdAt, 
    },
  }).promise();

  return result;
};

