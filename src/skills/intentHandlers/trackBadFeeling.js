import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../infrastructure/intentTextDB.js';

export const TrackBadFeelingHandler = {
  canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrackBadFeeling';
  },
  async handle(handlerInput) {
      const speakOutput = await getTextFromDB('TrackBadFeeling');

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
  }
};