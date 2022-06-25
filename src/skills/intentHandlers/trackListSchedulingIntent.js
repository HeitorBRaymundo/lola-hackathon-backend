import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

export const TrackListSchedulingIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AgendaIntent';
  },
  async handle(handlerInput) {
    const speakOutputInit = await getTextFromDB('Agenda');

    const schedulesToday = [
      'Médico cardiologista',
      'Tomar remédio',
    ];

    const speakOutput = `${speakOutputInit}: ${schedulesToday.join(' e ')}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};