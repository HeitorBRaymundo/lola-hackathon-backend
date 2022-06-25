import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { getSchedulesFromDB } from '../../infrastructure/schedulesDB.js';

export const TrackListMedicineIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListMedicineIntent';
  },
  async handle(handlerInput) {
    console.log('TrackListMedicineIntent Triggered');

    const speakOutputInit = await getTextFromDB('remedios');

    const medicines = await getSchedulesFromDB('medicines');
    const medicinesName = medicines.map((m) => m.name);
    
    const speakOutput = `${speakOutputInit}: ${medicinesName.join(', e ')}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};