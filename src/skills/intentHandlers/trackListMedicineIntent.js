import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

export const TrackListMedicineIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListMedicineIntent';
  },
  async handle(handlerInput) {
    const speakOutputInit = await getTextFromDB('remedios');

    const medicinesToday = [
      'Omeprazol',
      'Tylenol',
      'Luftal'
    ];

    const speakOutput = `${speakOutputInit}: ${medicinesToday.join(' e ')}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};