import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../infrastructure/intentTextDB.js';

export const TrackGoodFeelingHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrackgGoodFeeling';
  },
  async handle(handlerInput) {
    const speakOutput = await getTextFromDB('TrackGoodFeeling');;

    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          attributes.exercisedAsked = true;
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