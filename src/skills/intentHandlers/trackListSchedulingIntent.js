import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { getSchedulesFromDB } from '../../infrastructure/schedulesDB.js';

export const TrackListSchedulingIntent = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AgendaIntent';
  },
  async handle(handlerInput) {
    const speakOutputInit = await getTextFromDB('Agenda');

    const appointments = await getSchedulesFromDB('appointments');
    const appointmentsName = appointments.map((a) => a.name);

    const speakOutput = `${speakOutputInit}: ${appointmentsName.join(', e ')}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};