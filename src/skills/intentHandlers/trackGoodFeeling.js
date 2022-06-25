import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

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
    console.log('TrackGoodFeelingHandler Triggered');

    const speakOutput = await getTextFromDB('Menu Ajuda');

    const customAttributes = {
      firstIteraction: false,
    };

    const attributes = await handlerInput.attributesManager.getPersistentAttributes();

    handlerInput.attributesManager.setPersistentAttributes({
      ...attributes,
      ...customAttributes,
    });

    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};