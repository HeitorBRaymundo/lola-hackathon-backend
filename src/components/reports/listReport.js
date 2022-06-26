import AWS from 'aws-sdk';

const DynamodDB = new AWS.DynamoDB.DocumentClient();

export const getReportsFromDB = async ({ userId }) => {

  const searchParams = {
    TableName: process.env.DYNAMODB_QUIZES_ANSWER,
    KeyConditionExpression: '#PK = :PK',
    ExpressionAttributeNames: {
      '#PK': 'PK',
    },
    ExpressionAttributeValues: {
      ':PK': `${userId}#depression`
    },
  };

  const { Items: result } = await DynamodDB.query(searchParams).promise();

  const parsedResult = result.reduce((agg, curr) => {
    const date = curr.SK.slice(0, 10);

    return ({
      ...agg,
      [date]: {
        date: date,
        answers: [
          ...(agg[date]?.answers || []),
          curr.answer
        ]
      }
    })
  }, {});

  return Object.values(parsedResult);
};

export const handler = async (event) => {
  const { pathParameters } = event;
  const { userId } = pathParameters; 

  const result = await getReportsFromDB({ userId });
 
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


