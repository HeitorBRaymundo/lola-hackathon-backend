import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

export const TrackYesAnswerToExerciseHandler = {
  async canHandle(handlerInput) {
    const { exerciseAsked, firstIteraction } = await handlerInput.attributesManager.getPersistentAttributes();

    return exerciseAsked && !firstIteraction
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent'
  },
  async handle(handlerInput) {
    console.log('TrackYesAnswerToExerciseHandler Triggered');

    const speakOutput = await getTextFromDB('ok');

    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          handlerInput.attributesManager.setPersistentAttributes({
            ...attributes,
            exerciseAsked: false,
          });

          return handlerInput.attributesManager.savePersistentAttributes();
        })
        .then(() => {
          resolve(
            handlerInput.responseBuilder
              .speak(speakOutput)
              .reprompt(speakOutput)
              .getResponse()
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};