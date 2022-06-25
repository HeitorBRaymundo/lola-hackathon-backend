import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../infrastructure/intentTextDB.js';

export const TrackYesAnswerToExerciseHandler = {
  canHandle(handlerInput) {
    const anwseredYes = new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          resolve(attributes.exercisedAsked);
        })
        .catch((error) => {
          reject(error);
        })
    })

    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesAnswerToExercise'
      && anwseredYes;
  },
  async handle(handlerInput) {
    const speakOutput = await getTextFromDB('TrackYesAnswerToExercise');

    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          attributes.exercisedAnswered = true;
          attributes.exerciseDetailsAsked = true;
          handlerInput.attributesManager.setPersistentAttributes(attributes);

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