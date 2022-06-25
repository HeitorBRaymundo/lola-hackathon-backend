import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

export const TrackBadFeelingHandler = {
  async canHandle(handlerInput) {
    const { firstIteraction } = await handlerInput.attributesManager.getPersistentAttributes();

    return firstIteraction
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrackBadFeeling'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoIntent'
      );
  },
  async handle(handlerInput) {
      const speakOutput = await getTextFromDB('TrackBadFeeling');

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};