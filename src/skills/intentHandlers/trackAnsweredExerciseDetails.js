import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../infrastructure/intentTextDB.js';

export const TrackAnsweredExerciseDetailsHandler = {
  canHandle(handlerInput) {
    const askedDetailsAboutExercises = new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          resolve(attributes.exerciseDetailsAsked);
        })
        .catch((error) => {
          reject(error);
        })
    })

    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && askedDetailsAboutExercises;
  },
  async handle(handlerInput) {
    const speakOutput = await getTextFromDB('TrackAnsweredExerciseDetails');

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