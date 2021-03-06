import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { randomInteger } from '../../utils/utils.js';

export const TrackExerciseIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExerciseIntent';
  },
  async handle(handlerInput) {
    console.log('TrackExerciseIntentHandler Triggered');

    const randomIndex = randomInteger(0, 2);

    const exerciseQuestion1 = await getTextFromDB('exercicio 1');
    const exerciseQuestion2 = await getTextFromDB('Exercicio 2');
    const exerciseQuestion3 = await getTextFromDB('Exercicio 3');

    const randomSpeak = [
      exerciseQuestion1,
      exerciseQuestion2,
      exerciseQuestion3
    ];

    const speakOutput = randomSpeak[randomIndex];

    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          attributes.exerciseDetailsAnswered = true;
          handlerInput.attributesManager.setPersistentAttributes(attributes);

          return handlerInput.attributesManager.savePersistentAttributes();
        })
        .then(() => {
          resolve(
            handlerInput.responseBuilder
              .speak(speakOutput)
              .getResponse()
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};