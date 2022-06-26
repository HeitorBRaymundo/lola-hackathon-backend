import * as Alexa from 'ask-sdk-core';

import { getTextFromDB } from '../../infrastructure/intentTextDB.js';

export const TrackScheduleWithSpecialistHandler = {
  async canHandle(handlerInput) {
    const { askedSpecialist } = await handlerInput.attributesManager.getPersistentAttributes();
    
    const canHandle = askedSpecialist
      && Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleWithSpecialistIntent';

    return canHandle;
  },
  async handle(handlerInput) {
    console.log('TrackScheduleWithSpecialistHandler Triggered');

    const speakOutput = await getTextFromDB('EscolhaDeData');

    const specialist = Alexa.getSlotValueV2(handlerInput.requestEnvelope, 'specialist');
    const customAttributes = {
      askedSpecialistAnswered: true,
      askedDate: true,
      specialist,
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