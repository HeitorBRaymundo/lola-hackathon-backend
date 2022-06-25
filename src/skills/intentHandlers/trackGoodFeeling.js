import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { randomInteger } from '../../utils/utils.js';

export const TrackGoodFeelingHandler = {
  async canHandle(handlerInput) {
    const { firstIteraction } = await handlerInput.attributesManager.getPersistentAttributes();
    
    const canHandle = firstIteraction
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'GoodFeelingIntent'
      || Alexa.getIntentName(handlerInput.requestEnvelope) === 'YesIntent');

    return canHandle;
  },
  async handle(handlerInput) {
    const randomIndex = randomInteger(0, 1);
    const exerciseQuestion = await getTextFromDB('Exercicio');
    const helpMeQuestion = await getTextFromDB('Menu Ajuda');
    const randomSpeak = [
      exerciseQuestion,
      helpMeQuestion,
    ];

    const speakOutput = randomSpeak[randomIndex];

    const customAttributes = {
      exerciseAsked: speakOutput === exerciseQuestion,
      firstIteraction: false,
    };

    return new Promise((resolve, reject) => {
      handlerInput.attributesManager.getPersistentAttributes()
        .then((attributes) => {
          handlerInput.attributesManager.setPersistentAttributes({
            ...attributes,
            ...customAttributes,
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