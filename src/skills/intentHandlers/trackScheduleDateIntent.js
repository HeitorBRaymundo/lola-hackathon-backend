import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';
import { insertScheduleToDB } from '../../infrastructure/schedulesDB.js';

export const TrackChooseDateIntentHandler = {
  async canHandle(handlerInput) {
    const { askedDate } = await handlerInput.attributesManager.getPersistentAttributes();
    
    const canHandle = askedDate
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChooseDateIntent';

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackChooseDateIntentHandler Triggered');

    const { specialist } = await handlerInput.attributesManager.getPersistentAttributes();

    const data = Alexa.getSlotValueV2(handlerInput.requestEnvelope, 'data');
    const dia = Alexa.getSlotValueV2(handlerInput.requestEnvelope, 'dia');
    const horario = Alexa.getSlotValueV2(handlerInput.requestEnvelope, 'horario');

    await insertScheduleToDB({
      specialist,
      data,
      dia,
      horario,
    })

    const speakOutput = await getTextFromDB('ScheduleConfirm');

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};